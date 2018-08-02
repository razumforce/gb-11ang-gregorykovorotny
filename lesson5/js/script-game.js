
  var Product = Backbone.Model.extend({
    defaults: {
      title: 'none',
      level: 0,
      productivity: 0.1,
      complete: 0,
      consumes: null,
    }
  });

  var StoreItem = Backbone.Model.extend({
    defaults: {
      title: 'none',
      count: 0,
      price: 0,
    }
  });

  var Farm = Backbone.Collection.extend({
    model: Product,
  });

  var Store = Backbone.Collection.extend({
    model: StoreItem,
  });

  var StoreViews = {};

  StoreViews.StoreItem = Backbone.View.extend({
    tagName: 'tr',
    template: _.template('<td><%= title %></td>' + '<td><%= count %></td>' +
      '<td><%= price %></td>' + '<td><%= amount %></td>'),
    render: function() {
      this.$el.empty();
      var templateData = this.model.attributes;
      templateData.amount = (templateData.count * templateData.price).toFixed(2);
      this.$el.html(this.template(templateData));

      return this;
    },
  });

  StoreViews.Store = Backbone.View.extend({
    initialize: function() {
      this.collection.on('all', this.render, this);
    },
    render: function() {
      var element = this.$el;
      element.empty();
      this.collection.each(function(item) {
        var itemView = new StoreViews.StoreItem({ model: item });
        element.append(itemView.render().$el);
      });

      return this;
    },
  });

  var ProductView = Backbone.View.extend({
    tagName: 'div',
    template: _.template('<div><%= level %></div>' + '<div><%= complete %></div>'),
    initialize: function() {
      this.$el = $('#' + this.model.get('title'));
      this.listenTo(this.model, 'completeProduction', this.completeProduction, this);
      this.listenTo(this.model, 'upgrade', this.upgrade, this);
      this.model.on('all', this.render, this);
    },

    upgrade: function() {
      console.log('upgrade');
    },

    completeProduction: function() {
      console.log('completeProduction');
    },

    render: function() {
      this.$el.find('.data').html(this.template(this.model.attributes));
      return this;
    },
  });
