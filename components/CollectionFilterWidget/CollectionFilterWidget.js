window.nsGmx = window.nsGmx || {};

window.nsGmx.CollectionFilterWidget = nsGmx.GmxWidget.extend({
    className: 'filterWidget',

    events: {
        'click': '_onClick'
    },

    // options.collection
    // options.field
    initialize: function(options) {
        this.options = _.extend({}, options);

        this._models = {};
        this.options.collection && this.setCollection(this.options.collection)
        this.render();
    },

    render: function() {
        this.$el.empty();

        Object.keys(this._models).map(function (value) {
            var w = new nsGmx.CheckboxWidget({
                model: this._models[value],
                label: value
            });
            w.appendTo(this.$el);
        }.bind(this));
    },

    setCollection: function (collection) {
        if (this.collection) {
            this.collection.off('update', this._onCollectionUpdate, this);
        }
        this.collection = collection;
        this.collection.on('update', this._onCollectionUpdate, this);
        this._onCollectionUpdate();
    },

    _onCollectionUpdate: function () {
        this._models = [];
        this.collection.map(function (model) {
            if (this._models.indexOf(model.get(this.options.field)) === -1) {
                this._models[model.get(this.options.field)] = new Backbone.Model({
                    state: true
                });
            }
        }.bind(this));
        this.render();
    },

    _onClick: function (je) {
        console.log(je.target);
    }
});
