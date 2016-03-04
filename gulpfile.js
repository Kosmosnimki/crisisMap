var gulp = require('gulp');
var path = require('path');

require('./external/GMXBuilder')(gulp, {
    tempDir: './temp',
    distDir: './dist',
    htmlDistDir: './',
    watchExtensions: ['.js', '.css', '.html', '.less', '.svg']
}, {
    id: 'index',
    htmlfile: './html/index.html',
    components: [{
        bowerComponent: 'jquery',
        distFiles: ['dist/jquery.js']
    }, {
        bowerComponent: 'jquery-ui',
        distFiles: ['jquery-ui.js']
    }, {
        bowerComponent: 'leaflet',
        distFiles: [
            'dist/leaflet-src.js',
            'dist/leaflet.css',
            'dist/images/layers.png',
            'dist/images/layers-2x.png',
            'dist/images/marker-icon.png',
            'dist/images/marker-icon-2x.png',
            'dist/images/marker-shadow.png'
        ]
    }, {
        id: 'leaflet.markercluster',
        srcDir: './external/leaflet.markercluster',
        distFiles: ['dist/MarkerCluster.css', 'dist/MarkerCluster.Default.css', 'dist/leaflet.markercluster.js'],
        build: true,
        watch: true
    }, {
        id: 'LeafletMethodsKeeper',
        srcDir: './components/LeafletMethodsKeeper',
        build: false
    }, {
        id: 'Leaflet-GeoMixer',
        srcDir: './external/Leaflet-GeoMixer',
        distFiles: ['./dist/leaflet-geomixer-src.js'],
        build: true,
        watch: true
    }, {
        id: 'Leaflet.TileLayer.Mercator',
        srcDir: './external/Leaflet.TileLayer.Mercator',
        distFiles: ['./src/TileLayer.Mercator.js'],
        build: false,
        watch: false
    }, {
        id: 'Leaflet.gmxBaseLayersManager',
        srcDir: './external/Leaflet.gmxBaseLayersManager',
        distFiles: [
            './src/gmxBaseLayersManager.js',
            './src/initBaseLayerManager.js'
        ],
        build: false,
        watch: false
    }, {
        id: 'gmxControls',
        srcDir: './external/gmxControls',
        distFiles: [
            './dist/gmxControls-src.js',
            './dist/css/gmxControls.css',
            './dist/css/img/band.png',
            './dist/css/img/coords.png',
            './dist/css/img/gmxSprite.png',
            './dist/css/img/logo_footer.png',
            './dist/css/img/logo_footer_color.png'
        ],
        build: true,
        watch: false
    }, {
        id: 'Leaflet-active-area',
        bowerComponent: 'Mappy/Leaflet-active-area',
        distFiles: ['./src/leaflet.activearea.js']
    }, {
        bowerComponent: 'underscore',
        distFiles: ['underscore.js']
    }, {
        bowerComponent: 'backbone',
        distFiles: ['backbone.js']
    }, {
        bowerComponent: 'handlebars',
        distFiles: ['handlebars.js']
    }, {
        id: 'translations',
        url: 'http://maps.kosmosnimki.ru/api/translations.js'
    }, {
        id: 'Utils',
        srcDir: './external/GMXCommonComponents/Utils',
        build: false
    }, {
        id: 'GmxWidget',
        srcDir: './external/GMXCommonComponents/GmxWidget',
        build: false
    }, {
        id: 'SwitchingCollectionWidget',
        srcDir: './external/GMXCommonComponents/SwitchingCollectionWidget',
        build: false
    }, {
        id: 'CollectionFilterWidget',
        srcDir: './components/CollectionFilterWidget',
        build: false
    }, {
        id: 'CompositeScrollView',
        srcDir: './components/CompositeScrollView',
        build: false
    }, {
        srcDir: './external/GMXCommonComponents/CommonStyles',
        id: 'CommonStyles',
        distDir: './build',
        build: true
    }, {
        id: 'ScrollView',
        srcDir: './external/GMXCommonComponents/ScrollView',
        distDir: './build',
        build: true
    }, {
        id: 'LayersDebugger',
        srcDir: './external/GMXCommonComponents/LayersDebugger',
        build: false
    }, {
        id: 'LayersTree',
        srcDir: './external/GMXCommonComponents/LayersTree',
        distDir: './build',
        build: true
    }, {
        id: 'ComponentsManager',
        srcDir: './external/GMXCommonComponents/ComponentsManager',
        distDir: './build',
        build: true
    }, {
        id: 'AnimationHelpers',
        srcDir: './external/GMXCommonComponents/AnimationHelpers',
        build: false
    }, {
        id: 'IconSidebarControl',
        srcDir: './external/GMXCommonComponents/IconSidebarControl',
        build: false
    }, {
        id: 'LayersTreeWidget',
        srcDir: './external/GMXCommonComponents/LayersTreeWidget',
        distDir: './build',
        build: true
    }, {
        id: 'winnie.core',
        srcDir: './external/winnie',
        distDir: './core',
        build: false
    }, {
        id: 'LayerMarkersCollection',
        srcDir: './external/GMXCommonComponents/LayerMarkersCollection',
        build: false
    }, {
        id: 'MergedCollection',
        srcDir: './components/MergedCollection',
        build: false
    }, {
        id: 'DropdownMenuWidget',
        srcDir: './external/GMXCommonComponents/DropdownMenuWidget',
        distDir: './build',
        build: true
    }, {
        id: 'RadioGroupWidget',
        srcDir: './components/RadioGroupWidget',
        build: false
    }, {
        id: 'EventDetailsView',
        srcDir: './components/EventDetailsView',
        distDir: './build',
        build: true
    }, {
        id: 'PageView',
        srcDir: './components/PageView',
        build: false
    }, {
        id: 'PagedWidgets',
        srcDir: './components/PagedWidgets',
        distDir: './build',
        build: true
    }, {
        id: 'MarkerItemView',
        srcDir: './external/GMXCommonComponents/MarkerItemView',
        distDir: './build',
        build: true
    }, {
        id: 'LabelIconWidget',
        srcDir: './external/GMXCommonComponents/LabelIconWidget',
        build: false
    }, {
        id: 'CalendarPage',
        srcDir: './components/CalendarPage',
        distDir: './build',
        build: true
    }, {
        id: 'gmxUtils',
        url: 'http://maps.kosmosnimki.ru/api/utilities.js'
    }, {
        id: 'SectionsManager',
        srcDir: './components/SectionsManager',
        build: false
    }, {
        id: 'DateInterval',
        srcDir: './external/GMXCommonComponents/DateInterval',
        build: false
    }, {
        id: 'CalendarWidget',
        srcDir: './external/GMXCommonComponents/CalendarWidget',
        distDir: './build',
        build: true
    }, {
        id: 'ModalDialog',
        srcDir: './components/ModalDialog',
        build: false
    }, {
        id: 'Main',
        srcDir: './components/Main',
        distDir: './build',
        build: true
    }, {
        id: 'Entry',
        srcDir: './components/Entry',
        build: false
    }]
});
