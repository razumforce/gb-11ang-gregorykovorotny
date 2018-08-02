
  var Category = Backbone.Model.extend({
    defaults: {
      name: '',
    }
  });

  var CategoryView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template('<td><%= name %></td>'),
    render: function() {
      this.$el.html(this.template(this.model.attributes));

      return this;
    },
  });

  var CategorySelectView = Backbone.View.extend({
    tagName: 'option',
    template: _.template('<%= name %>'),
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      this.$el.val(this.model.get('name'));

      return this;
    },
  });


  var Categories = Backbone.Collection.extend({
    model: Category,
  });



  var CategoriesSelectView = Backbone.View.extend({
    initialize: function() {
      this.model.on('all', this.render, this);
    },

    tagName: 'select',
    render: function() {
      $('#exp-input-cat').empty();
      $('#exp-input-cat').append('<option value="">--Choose option--</option>');
      this.model.each(function(category) {
        var categorySelectView = new CategorySelectView({ model: category });
        $('#exp-input-cat').append(categorySelectView.render().$el);
      });

      return this;
    },
  });


  var CategoriesView = Backbone.View.extend({
    initialize: function() {
      this.model.on('all', this.render, this);
    },

    tagName: 'tbody',
    events: {
      'click #add-cat-button': 'onClickAdd',
    },

    onClickAdd: function() {
      var categoryName = $('#cat-input-name').val();

      var hasError = false;
      if (typeof categoryName !== 'undefined' && typeof categoryName === 'string' && categoryName.length > 2 && isNaN(categoryName)) {
        $('#cat-name-error').removeClass('has-error');
      } else {
        $('#cat-name-error').addClass('has-error');
        hasError = true;
      }

      if (!hasError) {
        $('#cat-input-name').val('');
        this.model.add(new Category({ name: categoryName }));
      }
    },

    render: function() {
      $('#cat-list').empty();
      this.model.each(function(category) {
        var categoryView = new CategoryView({ model: category });
        $('#cat-list').append(categoryView.render().$el);
      });

      return this;
    },
  });
