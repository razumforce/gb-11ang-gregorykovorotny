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

      var hasError = false;
      if (typeof itemName !== 'undefined' && itemName.length > 2) {
        $5('#exp-cat-error').removeClass('has-error');
      } else {
        $5('#exp-cat-error').addClass('has-error');
        hasError = true;
      }

      if (typeof itemAmount !== 'undefined' && !isNaN(itemAmount) && itemAmount != 0) {
        $5('#exp-amount-error').removeClass('has-error');
      } else {
        $5('#exp-amount-error').addClass('has-error');
        hasError = true;
      }

      if (!hasError) {
        $5('#exp-input-cat').val('');
        $5('#exp-input-amount').val('');
        this.itemsList.add({ itemName: itemName, itemAmount: (+itemAmount).toFixed(2) });
      }
    },
    render: function(model) {
      $5('#exp-list').append('<tr><td>' + model.get('itemName') + '</td>' + '<td>' + model.get('itemAmount') + '</td></tr>');
      console.log('expense added');
      var total = 0;
      this.itemsList.each(function(model) {
        total += +model.get('itemAmount');
      });
      $5('#exp-total').setHTML(total.toFixed(2)); // не лучше ли сделать отдельную модель/вьюху?
    },
  });

  var view = new ItemsView({ el: 'body' });
})();
