if (!nsGmx.CrisisMap.isMobile()) {
    cm.define('mapContainer', ['layoutManager'], function(cm) {
        var layoutManager = cm.get('layoutManager');
        return $(layoutManager.getContentContainer());
    });

    cm.define('alertsWidgetScrollView', ['sidebarWidget', 'activeAlertsNumber'], function() {
        var sidebarWidget = cm.get('sidebarWidget');
        var activeAlertsNumber = cm.get('activeAlertsNumber');

        var iconWidget = new nsGmx.LabelIconWidget({
            iconClass: 'icon-bell'
        });

        function setn(num) {
            iconWidget.setLabel(num || null);
        }
        setn(activeAlertsNumber.getAlertsNumber());
        activeAlertsNumber.on('change', function(num) {
            setn(num);
        });

        var alertsWidgetContainer = sidebarWidget.addTab('alertsWidget', iconWidget);
        var scrollView = new nsGmx.ScrollView();
        scrollView.appendTo(alertsWidgetContainer);
        sidebarWidget.on('opened', function(e) {
            if (e.id === 'alertsWidget') {
                scrollView.repaint();
                iconWidget.hideLabel();
            } else {
                iconWidget.showLabel();
            }
        });
        sidebarWidget.on('closed', function(e) {
            iconWidget.showLabel();
        });
        return scrollView;
    });

    cm.define('headerLayersMenu', ['map', 'config', 'sectionsManager', 'layersHash', 'headerNavBar', 'resetter'], function() {
        var map = cm.get('map');
        var config = cm.get('config');
        var layersHash = cm.get('layersHash');
        var headerNavBar = cm.get('headerNavBar');
        var sectionsManager = cm.get('sectionsManager');
        var resetter = cm.get('resetter');

        var items = sectionsManager.getSectionsIds().map(function(sectionId) {
            return {
                id: sectionId,
                title: sectionsManager.getSectionProperties(sectionId).title
            }
        });

        var radioGroupWidget = new nsGmx.RadioGroupWidget({
            items: items,
            activeItem: sectionsManager.getActiveSectionId()
        });

        radioGroupWidget.on('select', function(id) {
            sectionsManager.setActiveSectionId(id);
            var layer = layersHash[sectionsManager.getSectionProperties(id).dataLayerId];
            layer && nsGmx.L.Map.fitBounds.call(
                map,
                layer.getBounds()
            );
        });

        sectionsManager.on('sectionchange', function(sectionId) {
            radioGroupWidget.setActiveItem(sectionId);
        });

        radioGroupWidget.appendTo(headerNavBar.getCenterContainer());

        return radioGroupWidget;
    });

    cm.define('popups', ['layersHash', 'markersClickHandler', 'map', 'config', 'alertsWidget', 'markerCircle'], function(cm) {
        var map = cm.get('map');
        var config = cm.get('config');
        var layersHash = cm.get('layersHash');
        var alertsWidget = cm.get('alertsWidget');
        var markerCircle = cm.get('markerCircle');
        var markersClickHandler = cm.get('markersClickHandler');

        function openPopup(model, latLng) {
            var p = L.popup();
            var detailsView = new nsGmx.EventDetailsView({
                model: model,
                topIconClass: null
            });
            p.setContent(detailsView.getContainer());
            p.setLatLng(latLng);
            map.openPopup(p);
        }

        markersClickHandler.on('click', function(e) {
            openPopup(e.model, e.markerLatLng);
        });

        alertsWidget.on('marker', function(model) {
            map.setView(model.get('latLng'), config.user.markerZoom);
            openPopup(model, model.get('latLng'));
        })

        return null;
    });
}