

L.MarkerClusterGroup.include({
	refreshClusters: function (layers) {
		if (!layers) {
			layers = this._topClusterLevel.getAllChildMarkers();
		} else if (layers instanceof L.MarkerClusterGroup) {
			layers = layers._topClusterLevel.getAllChildMarkers();
		} else if (layers instanceof L.LayerGroup) {
			layers = layers._layers;
		} else if (layers instanceof L.MarkerCluster) {
			layers = layers.getAllChildMarkers();
		} else if (layers instanceof L.Marker) {
			layers = [layers];
		}
		this._flagParentsIconsNeedUpdate(layers);
		this._refreshClustersIcons();

		if (this.options.singleMarkerMode) {
			this._refreshSingleMarkerModeMarkers(layers);
		}

		return this;
	},

	_flagParentsIconsNeedUpdate: function (layers) {
		var id, parent;

		for (id in layers) {
			parent = layers[id].__parent;
			while (parent) {
				parent._iconNeedsUpdate = true;
				parent = parent.__parent;
			}
		}
	},

	_refreshSingleMarkerModeMarkers: function (layers) {
		var id, layer;

		for (id in layers) {
			layer = layers[id];

			if (this.hasLayer(layer)) {
				layer.setIcon(this._overrideMarkerIcon(layer));
			}
		}
	}
});

L.Marker.include({
	refreshIconOptions: function (options, directlyRefreshClusters) {
		var icon = this.options.icon;

		L.setOptions(icon, options);

		this.setIcon(icon);

		if (directlyRefreshClusters && this.__parent) {
			this.__parent._group.refreshClusters(this);
		}

		return this;
	}
});
