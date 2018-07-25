window.onload = function() {

  var ItemsList = Backbone.Collection.extend({
    initialize: function() {
      this.bind('add', function(model) {
        view.render(model);
      });
    },
  });

  var ItemsView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click #add-exp-button': 'addItemToList',
    },
    initialize: function() {
      this.itemsList = new ItemsList();
      _.bindAll(this, 'render');
    },
    addItemToList: function() {
      var itemValue = $5('#exp-input').val();
      $5('#exp-input').val('');
      this.itemsList.add({ myValue: itemValue });
    },
    render: function(model) {
      $5('#exp-list').append('<li>' + model.get('myValue') + '</li>');
      console.log('item added');
    },
  });

  var view = new ItemsView({ el: 'body' });
}
