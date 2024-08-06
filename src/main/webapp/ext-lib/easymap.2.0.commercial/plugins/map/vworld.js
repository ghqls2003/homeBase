function setVworldMap(mapDivId, mapOptions) {

    var code = 'EPSG:900913';
    var def = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs';
    var options = {
        resolutions: [156543.0339, 78271.51695, 39135.758475, 19567.8792375, 9783.93961875, 4891.969809375, 2445.9849046875, 1222.99245234375, 611.496226171875, 305.7481130859375, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.554628533935547, 4.777314266967774, 2.388657133483887, 1.1943285667419434, 0.5971642833709717, 0.29858214168548586, 0.14929107084274293],
        origin: [-20037508.34, 20037508.34],
        bounds: L.bounds([13232210.28055642, 3584827.864295762], [15238748.249933105, 5575460.5658249445])
    };
    var crs = new L.Proj.CRS(code, def, options);

    var vworldBaseTileURL = 'http://api.vworld.kr/req/wmts/1.0.0/ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0/Base/{z}/{y}/{x}.png';
    var vworldBaseTileOptions = {
        maxZoom: 19,
        minZoom: 6,
    };
    var vworldBaseTileLayer = new L.TileLayer(vworldBaseTileURL, vworldBaseTileOptions);

    mapOptions = {
        crs: crs,
        continuousWorld: true,
        worldCopyJump: false,
        ollehTileLayer: false,
        statisticTileLayer: false,
        scale: true,
        zoomControl: false,
        position: 'topleft',
        layers: [
            vworldBaseTileLayer,
        ],

    };
    map = L.map(mapDivId, mapOptions);

}