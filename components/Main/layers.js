cm.define('layersHash', ['gmxMap'], function(cm) {
    return cm.get('gmxMap').getLayersHash();
});

cm.define('calendar', ['gmxApplication'], function(cm) {
    return cm.get('gmxApplication').get('calendar');
});

cm.define('layersTree', ['gmxApplication'], function(cm) {
    return cm.get('gmxApplication').get('layersTree');
});

cm.define('sectionsManager', ['config', 'resetter', 'layersTree'], function(cm) {
    var config = cm.get('config');
    var resetter = cm.get('resetter');
    var layersTree = cm.get('layersTree');

    var sectionsManager = new nsGmx.SectionsManager({
        sectionsTree: layersTree.find(config.user.sectionsTree)
    });

    sectionsManager.on('sectionchange', function() {
        resetter.reset();
    });

    return sectionsManager;
});

cm.define('layersMarkersCollections', ['layersTree', 'layersHash', 'calendar', 'config'], function(cm, cb) {
    var layersTree = cm.get('layersTree');
    var layersHash = cm.get('layersHash');
    var calendar = cm.get('calendar');
    var config = cm.get('config');

    var MarkerModel = Backbone.Model.extend({
        constructor: function(properties) {
            Backbone.Model.call(this, {
                id: properties['id'],
                title: properties['Title'],
                description: properties['Description'],
                date: new Date(properties['pub_date'] * 1000),
                url: properties['URL'],
                class: properties['class'],
                styles: properties['styles'],
                latLng: L.Projection.Mercator.unproject({
                    x: properties['mercX'],
                    y: properties['mercY']
                })
            });
        }
    });

    var nodes = layersTree.select(function(node) {
        return !!(
            node.get('properties').MetaProperties &&
            node.get('properties').MetaProperties.data_provider &&
            node.get('properties').MetaProperties.data_provider.Value
        )
    });

    var collections = {};
    nodes.map(function(node) {
        var id = node.get('id');
        if (!id || !layersHash[id]) {
            return;
        }

        var col = new nsGmx.LayerMarkersCollection(layersHash[id], {
            model: MarkerModel
        });

        collections[id] = col;
    });

    return collections;
});

cm.define('markersClickHandler', ['layersMarkersCollections', 'sectionsManager', 'layersHash', 'layersTree', 'config'], function(cm) {
    var layersMarkersCollections = cm.get('layersMarkersCollections');
    var sectionsManager = cm.get('sectionsManager');
    var layersHash = cm.get('layersHash');
    var layersTree = cm.get('layersTree');
    var config = cm.get('config');

    var MarkersClickHandler = L.Class.extend({
        includes: [L.Mixin.Events],
        initialize: function() {
            sectionsManager.getSectionsIds().map(function(sectionId) {
                sectionsManager.getSectionProperties(sectionId).dataLayersIds.map(function(layerId) {
                    var layer = layersHash[layerId];
                    var collection = layersMarkersCollections[layerId];
                    layer.on('click', function(e) {
                        if (!e.eventFrom || e.originalEventType === 'click') {
                            var identityField = layersTree.find(layerId).get('properties').identityField;
                            // кликнули не по кластерам
                            var id = layer.getItemProperties(e.gmx.target.properties)[identityField];
                            var model = collection.findWhere({
                                id: id
                            });
                            this.fire('click', {
                                model: model,
                                layer: layer,
                                name: sectionId,
                                markerLatLng: e.eventFrom ? e.latlng : model.get('latLng')
                            });
                        }
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }
    });

    return new MarkersClickHandler();
});

cm.define('newsLayersCollections', ['layersMarkersCollections', 'sectionsManager'], function(cm) {
    var layersMarkersCollections = cm.get('layersMarkersCollections');
    var sectionsManager = cm.get('sectionsManager');

    // для каждого раздела с данными создаём коллекуию, состоящую из коллекций его data_provider'ов
    return sectionsManager.getSectionsIds().reduce(function(collections, sectionId) {
        var dataLayersIds = sectionsManager.getSectionProperties(sectionId).dataLayersIds;
        var dataLayersCollections = dataLayersIds.map(function(dataLayerId) {
            return layersMarkersCollections[dataLayerId];
        });
        collections[sectionId] = new nsGmx.MergedCollection(dataLayersCollections, {
            comparator: function(a, b) {
                a = a.get('date').getTime();
                b = b.get('date').getTime();
                if (a > b) {
                    return -1
                } else if (a < b) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
        return collections;
    }.bind(this), {});
});

cm.define('layersStyleFixes', ['layersHash', 'sectionsManager'], function(cm) {
    var layersHash = cm.get('layersHash');
    var sectionsManager = cm.get('sectionsManager');

    var dataLayersIds = [].concat.apply([], sectionsManager.getSectionsIds().map(function(sectionId) {
        return sectionsManager.getSectionProperties(sectionId).dataLayersIds;
    }));

    dataLayersIds.map(function(dataLayerId) {
        var layer = layersHash[dataLayerId];
        for (var i = 0; i < layer.getStyles().length; i++) {
            var originalStyle = layer.getStyle(i);
            layer.setStyle($.extend(true, originalStyle, {
                'RenderStyle': {
                    'iconAnchor': [13, 13],
                    'iconCenter': false
                },
                'HoverStyle': {
                    'iconAnchor': [13, 13],
                    'iconCenter': false
                }
            }), i);
        }
    });

    return null;
});

cm.define('layersClusters', ['gmxApplication'], function(cm) {
    return cm.get('gmxApplication').get('layersClusters');
});

cm.define('markerCircle', ['markersClickHandler', 'sectionsManager', 'layersClusters', 'resetter', 'map'], function(cm) {
    var markersClickHandler = cm.get('markersClickHandler');
    var sectionsManager = cm.get('sectionsManager');
    var layersClusters = cm.get('layersClusters');
    var resetter = cm.get('resetter');
    var map = cm.get('map');

    var MarkerCircle = L.Class.extend({
        initialize: function(opts) {
            L.setOptions(this, opts);
            this.marker = L.marker(e.latlng, {
                icon: L.divIcon({
                    iconSize: [23, 23],
                    iconAnchor: [14, 14],
                    className: 'marker-circled'
                }),
                zIndexOffset: 9999999
            });
            this.options.map.on('click', this.hide.bind(this));
            this.options.map.on('zoomstart', this.hide.bind(this));
        },
        show: function() {
            this.options.map.removeLayer(this.marker);
            this.marker.setLatLng.apply(this.marker, arguments);
            this.marker.addTo(this.options.map);
        },
        hide: function() {
            this.options.map.removeLayer(this.marker);
        }
    });

    var markerCircle = new MarkerCircle({
        map: map
    });

    var currentMarkerId = null;
    markersClickHandler.on('click', function(e) {
        currentMarkerId = e.model.get('id');
        markerCircle.show(e.markerLatLng);
    });

    resetter.on('reset', function(e) {
        markerCircle.hide();
        currentMarkerId = null;
    });

    layersClusters.on('unspiderfied', function(ev) {
        ev.markers.map(function(marker) {
            var id = marker.options.properties[0];
            if (id === currentMarkerId) {
                markerCircle.hide();
            }
        });
    });

    return markerCircle;
});