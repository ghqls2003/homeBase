

L.Marker.include({
	
	clusterHide: function () {
		this.options.opacityWhenUnclustered = this.options.opacity || 1;
		return this.setOpacity(0);
	},
	
	clusterShow: function () {
		var ret = this.setOpacity(this.options.opacity || this.options.opacityWhenUnclustered);
		delete this.options.opacityWhenUnclustered;
		return ret;
	}
	
});


