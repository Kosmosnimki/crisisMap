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
        id: 'es6-promise',
        bowerComponent: 'git://github.com/jakearchibald/es6-promise.git',
        distFiles: ['dist/es6-promise.js']
    }, {
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
        srcDir: './external/GMXCommonComponents/Translations',
        build: false
    }, {
        id: 'Utils',
        srcDir: './external/GMXCommonComponents/Utils',
        build: false
    }, {
        id: 'GmxVirtualTileLayer',
        srcDir: './external/GMXCommonComponents/GmxVirtualTileLayer',
        build: false
    }, {
        id: 'FireVirtualLayer',
        srcDir: './external/GMXCommonComponents/FireVirtualLayer',
        distDir: './build',
        build: true
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
        srcDir: './external/GMXCommonComponents/CollectionFilterWidget',
        build: false
    }, {
        id: 'CompositeScrollView',
        srcDir: './external/GMXCommonComponents/CompositeScrollView',
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
        id: 'StateManager',
        srcDir: './external/GMXCommonComponents/StateManager',
        build: false
    }, {
        id: 'winnie.core',
        srcDir: './external/winnie-core',
        distDir: './dist',
        build: true
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
        id: 'CheckboxWidget',
        srcDir: './external/GMXCommonComponents/CheckboxWidget',
        build: false
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
        id: 'gmxUtils',
        url: 'http://maps.kosmosnimki.ru/api/utilities.js'
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
        id: 'AlertsWidget',
        srcDir: './components/AlertsWidget',
        build: false
    }, {
        id: 'MainMenuWidget',
        srcDir: './components/MainMenuWidget',
        distDir: 'build',
        build: true
    }, {
        id: 'Main',
        srcDir: './components/Main',
        distDir: './build',
        build: true
    }, {
        id: 'MobileSectionsMenuWidget',
        srcDir: './components/MobileSectionsMenuWidget',
        build: false
    }]
});
