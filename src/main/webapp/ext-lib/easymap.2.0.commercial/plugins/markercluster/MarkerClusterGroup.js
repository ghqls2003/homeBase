
L.MarkerClusterGroup = L.FeatureGroup.extend({

	options: {
		maxClusterRadius: 80,
		iconCreateFunction: null,

		spiderfyOnMaxZoom: true,
		showCoverageOnHover: true,
		zoomToBoundsOnClick: true,
		singleMarkerMode: false,

		disableClusteringAtZoom: null,

		removeOutsideVisibleBounds: true,

		animate: true,

		animateAddingMarkers: false,

		spiderfyDistanceMultiplier: 1,

		spiderLegPolylineOptions: { weight: 1.5, color: '#222', opacity: 0.5 },

		chunkedLoading: false,
		chunkInterval: 200,
		chunkDelay: 50,
		chunkProgress: null,

		polygonOptions: {}
	},

	initialize: function (options) {
		L.Util.setOptions(this, options);
		if (!this.options.iconCreateFunction) {
			this.options.iconCreateFunction = this._defaultIconCreateFunction;
		}

		this._featureGroup = L.featureGroup();
		this._featureGroup.addEventParent(this);

		this._nonPointGroup = L.featureGroup();
		this._nonPointGroup.addEventParent(this);

		this._inZoomAnimation = 0;
		this._needsClustering = [];
		this._needsRemoving = [];
		this._currentShownBounds = null;

		this._queue = [];

		this._childMarkerEventHandlers = {
			'dragstart': this._childMarkerDragStart,
			'move': this._childMarkerMoved,
			'dragend': this._childMarkerDragEnd,
		};

		var animate = L.DomUtil.TRANSITION && this.options.animate;
		L.extend(this, animate ? this._withAnimation : this._noAnimation);
		this._markerCluster = animate ? L.MarkerCluster : L.MarkerClusterNonAnimated;
	},

	addLayer: function (layer) {

		if (layer instanceof L.LayerGroup) {
			return this.addLayers([layer]);
		}

		if (!layer.getLatLng) {
			this._nonPointGroup.addLayer(layer);
			this.fire('layeradd', { layer: layer });
			return this;
		}

		if (!this._map) {
			this._needsClustering.push(layer);
			this.fire('layeradd', { layer: layer });
			return this;
		}

		if (this.hasLayer(layer)) {
			return this;
		}



		if (this._unspiderfy) {
			this._unspiderfy();
		}

		this._addLayer(layer, this._maxZoom);
		this.fire('layeradd', { layer: layer });

		this._topClusterLevel._recalculateBounds();

		this._refreshClustersIcons();

		var visibleLayer = layer,
		    currentZoom = this._zoom;
		if (layer.__parent) {
			while (visibleLayer.__parent._zoom >= currentZoom) {
				visibleLayer = visibleLayer.__parent;
			}
		}

		if (this._currentShownBounds.contains(visibleLayer.getLatLng())) {
			if (this.options.animateAddingMarkers) {
				this._animationAddLayer(layer, visibleLayer);
			} else {
				this._animationAddLayerNonAnimated(layer, visibleLayer);
			}
		}
		return this;
	},

	removeLayer: function (layer) {

		if (layer instanceof L.LayerGroup) {
			return this.removeLayers([layer]);
		}

		if (!layer.getLatLng) {
			this._nonPointGroup.removeLayer(layer);
			this.fire('layerremove', { layer: layer });
			return this;
		}

		if (!this._map) {
			if (!this._arraySplice(this._needsClustering, layer) && this.hasLayer(layer)) {
				this._needsRemoving.push({ layer: layer, latlng: layer._latlng });
			}
			this.fire('layerremove', { layer: layer });
			return this;
		}

		if (!layer.__parent) {
			return this;
		}

		if (this._unspiderfy) {
			this._unspiderfy();
			this._unspiderfyLayer(layer);
		}

		this._removeLayer(layer, true);
		this.fire('layerremove', { layer: layer });

		this._topClusterLevel._recalculateBounds();

		this._refreshClustersIcons();

		layer.off(this._childMarkerEventHandlers, this);

		if (this._featureGroup.hasLayer(layer)) {
			this._featureGroup.removeLayer(layer);
			if (layer.clusterShow) {
				layer.clusterShow();
			}
		}

		return this;
	},

	addLayers: function (layersArray, skipLayerAddEvent) {
		if (!L.Util.isArray(layersArray)) {
			return this.addLayer(layersArray);
		}

		var fg = this._featureGroup,
		    npg = this._nonPointGroup,
		    chunked = this.options.chunkedLoading,
		    chunkInterval = this.options.chunkInterval,
		    chunkProgress = this.options.chunkProgress,
		    l = layersArray.length,
		    offset = 0,
		    originalArray = true,
		    m;

		if (this._map) {
			var started = (new Date()).getTime();
			var process = L.bind(function () {
				var start = (new Date()).getTime();
				for (; offset < l; offset++) {
					if (chunked && offset % 200 === 0) {
						var elapsed = (new Date()).getTime() - start;
						if (elapsed > chunkInterval) {
							break;
						}
					}

					m = layersArray[offset];

					if (m instanceof L.LayerGroup) {
						if (originalArray) {
							layersArray = layersArray.slice();
							originalArray = false;
						}
						this._extractNonGroupLayers(m, layersArray);
						l = layersArray.length;
						continue;
					}

					if (!m.getLatLng) {
						npg.addLayer(m);
						if (!skipLayerAddEvent) {
							this.fire('layeradd', { layer: m });
						}
						continue;
					}

					if (this.hasLayer(m)) {
						continue;
					}

					this._addLayer(m, this._maxZoom);
					if (!skipLayerAddEvent) {
						this.fire('layeradd', { layer: m });
					}

					if (m.__parent) {
						if (m.__parent.getChildCount() === 2) {
							var markers = m.__parent.getAllChildMarkers(),
							    otherMarker = markers[0] === m ? markers[1] : markers[0];
							fg.removeLayer(otherMarker);
						}
					}
				}

				if (chunkProgress) {
					chunkProgress(offset, l, (new Date()).getTime() - started);
				}

				if (offset === l) {

					this._topClusterLevel._recalculateBounds();

					this._refreshClustersIcons();

					this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);
				} else {
					setTimeout(process, this.options.chunkDelay);
				}
			}, this);

			process();
		} else {
			var needsClustering = this._needsClustering;

			for (; offset < l; offset++) {
				m = layersArray[offset];

				if (m instanceof L.LayerGroup) {
					if (originalArray) {
						layersArray = layersArray.slice();
						originalArray = false;
					}
					this._extractNonGroupLayers(m, layersArray);
					l = layersArray.length;
					continue;
				}

				if (!m.getLatLng) {
					npg.addLayer(m);
					continue;
				}

				if (this.hasLayer(m)) {
					continue;
				}

				needsClustering.push(m);
			}
		}
		return this;
	},

	removeLayers: function (layersArray) {
		var i, m,
		    l = layersArray.length,
		    fg = this._featureGroup,
		    npg = this._nonPointGroup,
		    originalArray = true;

		if (!this._map) {
			for (i = 0; i < l; i++) {
				m = layersArray[i];

				if (m instanceof L.LayerGroup) {
					if (originalArray) {
						layersArray = layersArray.slice();
						originalArray = false;
					}
					this._extractNonGroupLayers(m, layersArray);
					l = layersArray.length;
					continue;
				}

				this._arraySplice(this._needsClustering, m);
				npg.removeLayer(m);
				if (this.hasLayer(m)) {
					this._needsRemoving.push({ layer: m, latlng: m._latlng });
				}
				this.fire('layerremove', { layer: m });
			}
			return this;
		}

		if (this._unspiderfy) {
			this._unspiderfy();

			var layersArray2 = layersArray.slice(),
			    l2 = l;
			for (i = 0; i < l2; i++) {
				m = layersArray2[i];

				if (m instanceof L.LayerGroup) {
					this._extractNonGroupLayers(m, layersArray2);
					l2 = layersArray2.length;
					continue;
				}

				this._unspiderfyLayer(m);
			}
		}

		for (i = 0; i < l; i++) {
			m = layersArray[i];

			if (m instanceof L.LayerGroup) {
				if (originalArray) {
					layersArray = layersArray.slice();
					originalArray = false;
				}
				this._extractNonGroupLayers(m, layersArray);
				l = layersArray.length;
				continue;
			}

			if (!m.__parent) {
				npg.removeLayer(m);
				this.fire('layerremove', { layer: m });
				continue;
			}

			this._removeLayer(m, true, true);
			this.fire('layerremove', { layer: m });

			if (fg.hasLayer(m)) {
				fg.removeLayer(m);
				if (m.clusterShow) {
					m.clusterShow();
				}
			}
		}

		this._topClusterLevel._recalculateBounds();

		this._refreshClustersIcons();

		this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);

		return this;
	},

	clearLayers: function () {
		if (!this._map) {
			this._needsClustering = [];
			delete this._gridClusters;
			delete this._gridUnclustered;
		}

		if (this._noanimationUnspiderfy) {
			this._noanimationUnspiderfy();
		}

		this._featureGroup.clearLayers();
		this._nonPointGroup.clearLayers();

		this.eachLayer(function (marker) {
			marker.off(this._childMarkerEventHandlers, this);
			delete marker.__parent;
		}, this);

		if (this._map) {
			this._generateInitialClusters();
		}

		return this;
	},

	getBounds: function () {
		var bounds = new L.LatLngBounds();

		if (this._topClusterLevel) {
			bounds.extend(this._topClusterLevel._bounds);
		}

		for (var i = this._needsClustering.length - 1; i >= 0; i--) {
			bounds.extend(this._needsClustering[i].getLatLng());
		}

		bounds.extend(this._nonPointGroup.getBounds());

		return bounds;
	},

	eachLayer: function (method, context) {
		var markers = this._needsClustering.slice(),
			needsRemoving = this._needsRemoving,
			thisNeedsRemoving, i, j;

		if (this._topClusterLevel) {
			this._topClusterLevel.getAllChildMarkers(markers);
		}

		for (i = markers.length - 1; i >= 0; i--) {
			thisNeedsRemoving = true;

			for (j = needsRemoving.length - 1; j >= 0; j--) {
				if (needsRemoving[j].layer === markers[i]) {
					thisNeedsRemoving = false;
					break;
				}
			}

			if (thisNeedsRemoving) {
				method.call(context, markers[i]);
			}
		}

		this._nonPointGroup.eachLayer(method, context);
	},

	getLayers: function () {
		var layers = [];
		this.eachLayer(function (l) {
			layers.push(l);
		});
		return layers;
	},

	getLayer: function (id) {
		var result = null;
		
		id = parseInt(id, 10);

		this.eachLayer(function (l) {
			if (L.stamp(l) === id) {
				result = l;
			}
		});

		return result;
	},

	hasLayer: function (layer) {
		if (!layer) {
			return false;
		}

		var i, anArray = this._needsClustering;

		for (i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === layer) {
				return true;
			}
		}

		anArray = this._needsRemoving;
		for (i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i].layer === layer) {
				return false;
			}
		}

		return !!(layer.__parent && layer.__parent._group === this) || this._nonPointGroup.hasLayer(layer);
	},

	zoomToShowLayer: function (layer, callback) {

		if (typeof callback !== 'function') {
			callback = function () {};
		}

		var showMarker = function () {
			if ((layer._icon || layer.__parent._icon) && !this._inZoomAnimation) {
				this._map.off('moveend', showMarker, this);
				this.off('animationend', showMarker, this);

				if (layer._icon) {
					callback();
				} else if (layer.__parent._icon) {
					this.once('spiderfied', callback, this);
					layer.__parent.spiderfy();
				}
			}
		};

		if (layer._icon && this._map.getBounds().contains(layer.getLatLng())) {
			callback();
		} else if (layer.__parent._zoom < Math.round(this._map._zoom)) {
			this._map.on('moveend', showMarker, this);
			this._map.panTo(layer.getLatLng());
		} else {
			this._map.on('moveend', showMarker, this);
			this.on('animationend', showMarker, this);
			layer.__parent.zoomToBounds();
		}
	},

	onAdd: function (map) {
		this._map = map;
		var i, l, layer;

		if (!isFinite(this._map.getMaxZoom())) {
			throw "Map has no maxZoom specified";
		}

		this._featureGroup.addTo(map);
		this._nonPointGroup.addTo(map);

		if (!this._gridClusters) {
			this._generateInitialClusters();
		}

		this._maxLat = map.options.crs.projection.MAX_LATITUDE;

		for (i = 0, l = this._needsRemoving.length; i < l; i++) {
			layer = this._needsRemoving[i];
			layer.newlatlng = layer.layer._latlng;
			layer.layer._latlng = layer.latlng;
		}
		for (i = 0, l = this._needsRemoving.length; i < l; i++) {
			layer = this._needsRemoving[i];
			this._removeLayer(layer.layer, true);
			layer.layer._latlng = layer.newlatlng;
		}
		this._needsRemoving = [];

		this._zoom = Math.round(this._map._zoom);
		this._currentShownBounds = this._getExpandedVisibleBounds();

		this._map.on('zoomend', this._zoomEnd, this);
		this._map.on('moveend', this._moveEnd, this);

		if (this._spiderfierOnAdd) {
			this._spiderfierOnAdd();
		}

		this._bindEvents();

		l = this._needsClustering;
		this._needsClustering = [];
		this.addLayers(l, true);
	},

	onRemove: function (map) {
		map.off('zoomend', this._zoomEnd, this);
		map.off('moveend', this._moveEnd, this);

		this._unbindEvents();

		this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '');

		if (this._spiderfierOnRemove) {
			this._spiderfierOnRemove();
		}

		delete this._maxLat;

		this._hideCoverage();
		this._featureGroup.remove();
		this._nonPointGroup.remove();

		this._featureGroup.clearLayers();

		this._map = null;
	},

	getVisibleParent: function (marker) {
		var vMarker = marker;
		while (vMarker && !vMarker._icon) {
			vMarker = vMarker.__parent;
		}
		return vMarker || null;
	},

	_arraySplice: function (anArray, obj) {
		for (var i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === obj) {
				anArray.splice(i, 1);
				return true;
			}
		}
	},

	/**
	 * Removes a marker from all _gridUnclustered zoom levels, starting at the supplied zoom.
	 * @param marker to be removed from _gridUnclustered.
	 * @param z integer bottom start zoom level (included)
	 * @private
	 */
	_removeFromGridUnclustered: function (marker, z) {
		var map = this._map,
		    gridUnclustered = this._gridUnclustered,
			minZoom = this._map.getMinZoom();

		for (; z >= minZoom; z--) {
			if (!gridUnclustered[z].removeObject(marker, map.project(marker.getLatLng(), z))) {
				break;
			}
		}
	},

	_childMarkerDragStart: function (e) {
		e.target.__dragStart = e.target._latlng;
	},

	_childMarkerMoved: function (e) {
		if (!this._ignoreMove && !e.target.__dragStart) {
			var isPopupOpen = e.target._popup && e.target._popup.isOpen();

			this._moveChild(e.target, e.oldLatLng, e.latlng);

			if (isPopupOpen) {
				e.target.openPopup();
			}
		}
	},

	_moveChild: function (layer, from, to) {
		layer._latlng = from;
		this.removeLayer(layer);

		layer._latlng = to;
		this.addLayer(layer);
	},

	_childMarkerDragEnd: function (e) {
		if (e.target.__dragStart) {
			this._moveChild(e.target, e.target.__dragStart, e.target._latlng);
		}
		delete e.target.__dragStart;
	},
	

	_removeLayer: function (marker, removeFromDistanceGrid, dontUpdateMap) {
		var gridClusters = this._gridClusters,
			gridUnclustered = this._gridUnclustered,
			fg = this._featureGroup,
			map = this._map,
			minZoom = this._map.getMinZoom();

		if (removeFromDistanceGrid) {
			this._removeFromGridUnclustered(marker, this._maxZoom);
		}

		var cluster = marker.__parent,
			markers = cluster._markers,
			otherMarker;

		this._arraySplice(markers, marker);

		while (cluster) {
			cluster._childCount--;
			cluster._boundsNeedUpdate = true;

			if (cluster._zoom < minZoom) {
				break;
			} else if (removeFromDistanceGrid && cluster._childCount <= 1) {
				otherMarker = cluster._markers[0] === marker ? cluster._markers[1] : cluster._markers[0];

				gridClusters[cluster._zoom].removeObject(cluster, map.project(cluster._cLatLng, cluster._zoom));
				gridUnclustered[cluster._zoom].addObject(otherMarker, map.project(otherMarker.getLatLng(), cluster._zoom));

				this._arraySplice(cluster.__parent._childClusters, cluster);
				cluster.__parent._markers.push(otherMarker);
				otherMarker.__parent = cluster.__parent;

				if (cluster._icon) {
					fg.removeLayer(cluster);
					if (!dontUpdateMap) {
						fg.addLayer(otherMarker);
					}
				}
			} else {
				cluster._iconNeedsUpdate = true;
			}

			cluster = cluster.__parent;
		}

		delete marker.__parent;
	},

	_isOrIsParent: function (el, oel) {
		while (oel) {
			if (el === oel) {
				return true;
			}
			oel = oel.parentNode;
		}
		return false;
	},

	fire: function (type, data, propagate) {
		if (data && data.layer instanceof L.MarkerCluster) {
			if (data.originalEvent && this._isOrIsParent(data.layer._icon, data.originalEvent.relatedTarget)) {
				return;
			}
			type = 'cluster' + type;
		}

		L.FeatureGroup.prototype.fire.call(this, type, data, propagate);
	},

	listens: function (type, propagate) {
		return L.FeatureGroup.prototype.listens.call(this, type, propagate) || L.FeatureGroup.prototype.listens.call(this, 'cluster' + type, propagate);
	},

	_defaultIconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();

		var c = ' marker-cluster-';
		if (childCount < 10) {
			c += 'small';
		} else if (childCount < 100) {
			c += 'medium';
		} else {
			c += 'large';
		}

		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
	},

	_bindEvents: function () {
		var map = this._map,
		    spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
		    showCoverageOnHover = this.options.showCoverageOnHover,
		    zoomToBoundsOnClick = this.options.zoomToBoundsOnClick;

		if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
			this.on('clusterclick', this._zoomOrSpiderfy, this);
		}

		if (showCoverageOnHover) {
			this.on('clustermouseover', this._showCoverage, this);
			this.on('clustermouseout', this._hideCoverage, this);
			map.on('zoomend', this._hideCoverage, this);
		}
	},

	_zoomOrSpiderfy: function (e) {
		var cluster = e.layer,
		    bottomCluster = cluster;

		while (bottomCluster._childClusters.length === 1) {
			bottomCluster = bottomCluster._childClusters[0];
		}

		if (bottomCluster._zoom === this._maxZoom &&
			bottomCluster._childCount === cluster._childCount &&
			this.options.spiderfyOnMaxZoom) {

			cluster.spiderfy();
		} else if (this.options.zoomToBoundsOnClick) {
			cluster.zoomToBounds();
		}

		if (e.originalEvent && e.originalEvent.keyCode === 13) {
			this._map._container.focus();
		}
	},

	_showCoverage: function (e) {
		var map = this._map;
		if (this._inZoomAnimation) {
			return;
		}
		if (this._shownPolygon) {
			map.removeLayer(this._shownPolygon);
		}
		if (e.layer.getChildCount() > 2 && e.layer !== this._spiderfied) {
			this._shownPolygon = new L.Polygon(e.layer.getConvexHull(), this.options.polygonOptions);
			map.addLayer(this._shownPolygon);
		}
	},

	_hideCoverage: function () {
		if (this._shownPolygon) {
			this._map.removeLayer(this._shownPolygon);
			this._shownPolygon = null;
		}
	},

	_unbindEvents: function () {
		var spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
			showCoverageOnHover = this.options.showCoverageOnHover,
			zoomToBoundsOnClick = this.options.zoomToBoundsOnClick,
			map = this._map;

		if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
			this.off('clusterclick', this._zoomOrSpiderfy, this);
		}
		if (showCoverageOnHover) {
			this.off('clustermouseover', this._showCoverage, this);
			this.off('clustermouseout', this._hideCoverage, this);
			map.off('zoomend', this._hideCoverage, this);
		}
	},

	_zoomEnd: function () {
		if (!this._map) {
			return;
		}
		this._mergeSplitClusters();

		this._zoom = Math.round(this._map._zoom);
		this._currentShownBounds = this._getExpandedVisibleBounds();
	},

	_moveEnd: function () {
		if (this._inZoomAnimation) {
			return;
		}

		var newBounds = this._getExpandedVisibleBounds();

		this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._map.getMinZoom(), this._zoom, newBounds);
		this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), newBounds);

		this._currentShownBounds = newBounds;
		return;
	},

	_generateInitialClusters: function () {
		var maxZoom = this._map.getMaxZoom(),
			minZoom = this._map.getMinZoom(),
			radius = this.options.maxClusterRadius,
			radiusFn = radius;
	
		if (typeof radius !== "function") {
			radiusFn = function () { return radius; };
		}

		if (this.options.disableClusteringAtZoom) {
			maxZoom = this.options.disableClusteringAtZoom - 1;
		}
		this._maxZoom = maxZoom;
		this._gridClusters = {};
		this._gridUnclustered = {};
	
		for (var zoom = maxZoom; zoom >= minZoom; zoom--) {
			this._gridClusters[zoom] = new L.DistanceGrid(radiusFn(zoom));
			this._gridUnclustered[zoom] = new L.DistanceGrid(radiusFn(zoom));
		}

		this._topClusterLevel = new this._markerCluster(this, minZoom - 1);
	},

	_addLayer: function (layer, zoom) {
		var gridClusters = this._gridClusters,
		    gridUnclustered = this._gridUnclustered,
			minZoom = this._map.getMinZoom(),
		    markerPoint, z;

		if (this.options.singleMarkerMode) {
			this._overrideMarkerIcon(layer);
		}

		layer.on(this._childMarkerEventHandlers, this);

		for (; zoom >= minZoom; zoom--) {
			markerPoint = this._map.project(layer.getLatLng(), zoom);

			var closest = gridClusters[zoom].getNearObject(markerPoint);
			if (closest) {
				closest._addChild(layer);
				layer.__parent = closest;
				return;
			}

			closest = gridUnclustered[zoom].getNearObject(markerPoint);
			if (closest) {
				var parent = closest.__parent;
				if (parent) {
					this._removeLayer(closest, false);
				}


				var newCluster = new this._markerCluster(this, zoom, closest, layer);
				gridClusters[zoom].addObject(newCluster, this._map.project(newCluster._cLatLng, zoom));
				closest.__parent = newCluster;
				layer.__parent = newCluster;

				var lastParent = newCluster;
				for (z = zoom - 1; z > parent._zoom; z--) {
					lastParent = new this._markerCluster(this, z, lastParent);
					gridClusters[z].addObject(lastParent, this._map.project(closest.getLatLng(), z));
				}
				parent._addChild(lastParent);

				this._removeFromGridUnclustered(closest, zoom);

				return;
			}

			gridUnclustered[zoom].addObject(layer, markerPoint);
		}

		this._topClusterLevel._addChild(layer);
		layer.__parent = this._topClusterLevel;
		return;
	},

	/**
	 * Refreshes the icon of all "dirty" visible clusters.
	 * Non-visible "dirty" clusters will be updated when they are added to the map.
	 * @private
	 */
	_refreshClustersIcons: function () {
		this._featureGroup.eachLayer(function (c) {
			if (c instanceof L.MarkerCluster && c._iconNeedsUpdate) {
				c._updateIcon();
			}
		});
	},

	_enqueue: function (fn) {
		this._queue.push(fn);
		if (!this._queueTimeout) {
			this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300);
		}
	},
	_processQueue: function () {
		for (var i = 0; i < this._queue.length; i++) {
			this._queue[i].call(this);
		}
		this._queue.length = 0;
		clearTimeout(this._queueTimeout);
		this._queueTimeout = null;
	},

	_mergeSplitClusters: function () {
		var mapZoom = Math.round(this._map._zoom);

		this._processQueue();

		if (this._zoom < mapZoom && this._currentShownBounds.intersects(this._getExpandedVisibleBounds())) {
			this._animationStart();
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._map.getMinZoom(), this._zoom, this._getExpandedVisibleBounds());

			this._animationZoomIn(this._zoom, mapZoom);

		} else if (this._zoom > mapZoom) {
			this._animationStart();

			this._animationZoomOut(this._zoom, mapZoom);
		} else {
			this._moveEnd();
		}
	},

	_getExpandedVisibleBounds: function () {
		if (!this.options.removeOutsideVisibleBounds) {
			return this._mapBoundsInfinite;
		} else if (L.Browser.mobile) {
			return this._checkBoundsMaxLat(this._map.getBounds());
		}

		return this._checkBoundsMaxLat(this._map.getBounds().pad(1));
	},

	_checkBoundsMaxLat: function (bounds) {
		var maxLat = this._maxLat;

		if (maxLat !== undefined) {
			if (bounds.getNorth() >= maxLat) {
				bounds._northEast.lat = Infinity;
			}
			if (bounds.getSouth() <= -maxLat) {
				bounds._southWest.lat = -Infinity;
			}
		}

		return bounds;
	},

	_animationAddLayerNonAnimated: function (layer, newCluster) {
		if (newCluster === layer) {
			this._featureGroup.addLayer(layer);
		} else if (newCluster._childCount === 2) {
			newCluster._addToMap();

			var markers = newCluster.getAllChildMarkers();
			this._featureGroup.removeLayer(markers[0]);
			this._featureGroup.removeLayer(markers[1]);
		} else {
			newCluster._updateIcon();
		}
	},

	/**
	 * Extracts individual (i.e. non-group) layers from a Layer Group.
	 * @param group to extract layers from.
	 * @param output {Array} in which to store the extracted layers.
	 * @returns {*|Array}
	 * @private
	 */
	_extractNonGroupLayers: function (group, output) {
		var layers = group.getLayers(),
		    i = 0,
		    layer;

		output = output || [];

		for (; i < layers.length; i++) {
			layer = layers[i];

			if (layer instanceof L.LayerGroup) {
				this._extractNonGroupLayers(layer, output);
				continue;
			}

			output.push(layer);
		}

		return output;
	},

	_overrideMarkerIcon: function (layer) {
		var icon = layer.options.icon = this.options.iconCreateFunction({
			getChildCount: function () {
				return 1;
			},
			getAllChildMarkers: function () {
				return [layer];
			}
		});

		return icon;
	}
});

L.MarkerClusterGroup.include({
	_mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-Infinity, -Infinity), new L.LatLng(Infinity, Infinity))
});

L.MarkerClusterGroup.include({
	_noAnimation: {
		_animationStart: function () {
		},
		_animationZoomIn: function (previousZoomLevel, newZoomLevel) {
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._map.getMinZoom(), previousZoomLevel);
			this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());

			this.fire('animationend');
		},
		_animationZoomOut: function (previousZoomLevel, newZoomLevel) {
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._map.getMinZoom(), previousZoomLevel);
			this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());

			this.fire('animationend');
		},
		_animationAddLayer: function (layer, newCluster) {
			this._animationAddLayerNonAnimated(layer, newCluster);
		}
	},

	_withAnimation: {
		_animationStart: function () {
			this._map._mapPane.className += ' leaflet-cluster-anim';
			this._inZoomAnimation++;
		},

		_animationZoomIn: function (previousZoomLevel, newZoomLevel) {
			var bounds = this._getExpandedVisibleBounds(),
			    fg = this._featureGroup,
				minZoom = this._map.getMinZoom(),
			    i;

			this._ignoreMove = true;

			this._topClusterLevel._recursively(bounds, previousZoomLevel, minZoom, function (c) {
				var startPos = c._latlng,
				    markers  = c._markers,
				    m;

				if (!bounds.contains(startPos)) {
					startPos = null;
				}

				if (c._isSingleParent() && previousZoomLevel + 1 === newZoomLevel) {
					fg.removeLayer(c);
					c._recursivelyAddChildrenToMap(null, newZoomLevel, bounds);
				} else {
					c.clusterHide();
					c._recursivelyAddChildrenToMap(startPos, newZoomLevel, bounds);
				}

				for (i = markers.length - 1; i >= 0; i--) {
					m = markers[i];
					if (!bounds.contains(m._latlng)) {
						fg.removeLayer(m);
					}
				}

			});

			this._forceLayout();

			this._topClusterLevel._recursivelyBecomeVisible(bounds, newZoomLevel);
			fg.eachLayer(function (n) {
				if (!(n instanceof L.MarkerCluster) && n._icon) {
					n.clusterShow();
				}
			});

			this._topClusterLevel._recursively(bounds, previousZoomLevel, newZoomLevel, function (c) {
				c._recursivelyRestoreChildPositions(newZoomLevel);
			});

			this._ignoreMove = false;

			this._enqueue(function () {
				this._topClusterLevel._recursively(bounds, previousZoomLevel, minZoom, function (c) {
					fg.removeLayer(c);
					c.clusterShow();
				});

				this._animationEnd();
			});
		},

		_animationZoomOut: function (previousZoomLevel, newZoomLevel) {
			this._animationZoomOutSingle(this._topClusterLevel, previousZoomLevel - 1, newZoomLevel);

			this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._map.getMinZoom(), previousZoomLevel, this._getExpandedVisibleBounds());
		},

		_animationAddLayer: function (layer, newCluster) {
			var me = this,
			    fg = this._featureGroup;

			fg.addLayer(layer);
			if (newCluster !== layer) {
				if (newCluster._childCount > 2) {

					newCluster._updateIcon();
					this._forceLayout();
					this._animationStart();

					layer._setPos(this._map.latLngToLayerPoint(newCluster.getLatLng()));
					layer.clusterHide();

					this._enqueue(function () {
						fg.removeLayer(layer);
						layer.clusterShow();

						me._animationEnd();
					});

				} else {
					this._forceLayout();

					me._animationStart();
					me._animationZoomOutSingle(newCluster, this._map.getMaxZoom(), this._zoom);
				}
			}
		}
	},

	_animationZoomOutSingle: function (cluster, previousZoomLevel, newZoomLevel) {
		var bounds = this._getExpandedVisibleBounds(),
			minZoom = this._map.getMinZoom();

		cluster._recursivelyAnimateChildrenInAndAddSelfToMap(bounds, minZoom, previousZoomLevel + 1, newZoomLevel);

		var me = this;

		this._forceLayout();
		cluster._recursivelyBecomeVisible(bounds, newZoomLevel);

		this._enqueue(function () {

			if (cluster._childCount === 1) {
				var m = cluster._markers[0];
				this._ignoreMove = true;
				m.setLatLng(m.getLatLng());
				this._ignoreMove = false;
				if (m.clusterShow) {
					m.clusterShow();
				}
			} else {
				cluster._recursively(bounds, newZoomLevel, minZoom, function (c) {
					c._recursivelyRemoveChildrenFromMap(bounds, minZoom, previousZoomLevel + 1);
				});
			}
			me._animationEnd();
		});
	},

	_animationEnd: function () {
		if (this._map) {
			this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '');
		}
		this._inZoomAnimation--;
		this.fire('animationend');
	},

	_forceLayout: function () {

		L.Util.falseFn(document.body.offsetWidth);
	}
});

L.markerClusterGroup = function (options) {
	return new L.MarkerClusterGroup(options);
};
