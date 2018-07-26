(function() {
  var ItemsList = Backbone.Collection.extend({
    initialize: function() {
      this.bind('add', function(model) {
        view.render(model);
      });
    },
  });

  var ItemsView = Backbone.View.extend({
    tagName: 'tr',
    events: {
      'click #add-exp-button': 'addItemToList',
    },
    initialize: function() {
      this.itemsList = new ItemsList();
      _.bindAll(this, 'render');
    },
    addItemToList: function() {
      var itemName = $5('#exp-input-cat').val();
      var itemAmount = $5('#exp-input-amount').val();
      $5('#exp-input-cat').val('');
      $5('#exp-input-amount').val('');
      this.itemsList.add({ itemName: itemName, itemAmount: itemAmount });
    },
    render: function(model) {
      $5('#exp-list').append('<tr><td>' + model.get('itemName') + '</td>' + '<td>' + model.get('itemAmount') + '</td></tr>');
      console.log('expense added');
      var total = 0;
      this.itemsList.each(function(model) {
        total += +model.get('itemAmount');
      });
      $5('#exp-total').setHTML(total); // не лучше ли сделать отдельную модель/вьюху?
    },
  });

  var view = new ItemsView({ el: 'body' });
})();
