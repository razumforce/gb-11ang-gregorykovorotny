(function() {
  var CategoriesList = Backbone.Collection.extend({
    initialize: function() {
      this.bind('add', function(model) {
        category.render(model);
      });
    },
  });

  var CategoriesView = Backbone.View.extend({
    tagName: 'tr',
    events: {
      'click #add-cat-button': 'addCategoryToList',
    },
    initialize: function() {
      this.categoriesList = new CategoriesList();
      _.bindAll(this, 'render');
    },
    addCategoryToList: function() {
      var categoryName = $5('#cat-input-name').val();
      $5('#cat-input-name').val('');
      this.categoriesList.add({ categoryName: categoryName });
    },
    render: function(model) {
      $5('#cat-list').append('<tr><td>' + model.get('categoryName') + '</td></tr>');
      console.log('category added');

      // не лучше ли сделать отдельную модель/вьюху?
      $5('#exp-input-cat').append('<option value="' + model.get('categoryName') + '">' + model.get('categoryName') + '</option>');
      console.log('category added to select');
    },
  });

  var category = new CategoriesView({ el: 'body' });
})();