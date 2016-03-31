if (!nsGmx.CrisisMap.isMobile()) {
    cm.define('topBarContainerControl', ['map', 'rootContainer'], function(cm) {
        var rootContainer = cm.get('rootContainer');
        var map = cm.get('map');

        $(rootContainer).addClass('crisisMap_withTopBar');

        var topBarContainerControl = new(L.Control.extend({
            options: {
                className: 'topBarContainerControl'
            },

            includes: [nsGmx.FullscreenControlMixin],
        }))();

        topBarContainerControl.addTo(map);

        return topBarContainerControl;
    });

    cm.define('headerNavBar', ['topBarContainerControl'], function(cm) {
        var topBarContainerControl = cm.get('topBarContainerControl');

        var HeaderNavBar = Backbone.View.extend({
            el: topBarContainerControl.getContainer(),

            className: 'headerNavBar',

            initialize: function() {
                $('<div>').addClass('headerNavBar-leftContainer').appendTo(this.$el);
                $('<div>').addClass('headerNavBar-centerContainer').appendTo(this.$el);
                $('<div>').addClass('headerNavBar-rightContainer').appendTo(this.$el);
            },

            getLeftContainer: function() {
                return this.$el.find('.headerNavBar-leftContainer')[0];
            },

            getCenterContainer: function() {
                return this.$el.find('.headerNavBar-centerContainer')[0];
            },

            getRightContainer: function() {
                return this.$el.find('.headerNavBar-rightContainer')[0];
            }
        });

        var headerNavBar = new HeaderNavBar();
        // topBarContainerControl.getContainer().appendChild(headerNavBar.el);

        return headerNavBar;
    });

    cm.define('sectionsMenu', ['map', 'config', 'resetter', 'layersHash', 'headerNavBar', 'sectionsManager'], function() {
        var sectionsManager = cm.get('sectionsManager');
        var headerNavBar = cm.get('headerNavBar');
        var layersHash = cm.get('layersHash');
        var resetter = cm.get('resetter');
        var config = cm.get('config');
        var map = cm.get('map');

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
        });

        sectionsManager.on('sectionchange', function(sectionId) {
            radioGroupWidget.setActiveItem(sectionId);
        });

        radioGroupWidget.appendTo(headerNavBar.getCenterContainer());

        return radioGroupWidget;
    });

    cm.define('alertsWidgetContainer', ['activeAlertsNumber', 'sidebarWidget'], function() {
        var activeAlertsNumber = cm.get('activeAlertsNumber');
        var sidebarWidget = cm.get('sidebarWidget');

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

        sidebarWidget.on('closed', function(e) {
            iconWidget.showLabel();
        });

        return {
            addView: function(alertsWidget) {
                var alertsWidgetContainer = sidebarWidget.addTab('alertsWidget', iconWidget);
                alertsWidget.appendTo(alertsWidgetContainer);

                sidebarWidget && sidebarWidget.on('opened', function(le) {
                    if (le.id === 'alertsWidget') {
                        iconWidget.hideLabel();
                        alertsWidget.reset();
                    }
                });
            }
        };
    });
}
