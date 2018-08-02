(function() {

  var Expense = Backbone.Model.extend({
    defaults: {
      category: '',
      amount: 0.00,
    }
  });

  var ExpenseView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template('<td><%= category %></td><td><%= amount %></td>'),
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
  });


  var Expenses = Backbone.Collection.extend({
    model: Expense,
  });


  var ExpensesView = Backbone.View.extend({
    initialize: function() {
      this.model.on('all', this.render, this);
    },

    tagName: 'table',
    events: {
      'click #add-exp-button': 'onClickAdd',
    },

    onClickAdd: function() {
      var itemName = $('#exp-input-cat').val();
      var itemAmount = $('#exp-input-amount').val();

      var hasError = false;
      if (typeof itemName !== 'undefined' && itemName.length > 2) {
        $('#exp-cat-error').removeClass('has-error');
      } else {
        $('#exp-cat-error').addClass('has-error');
        hasError = true;
      }

      if (typeof itemAmount !== 'undefined' && !isNaN(itemAmount) && itemAmount != 0) {
        $('#exp-amount-error').removeClass('has-error');
      } else {
        $('#exp-amount-error').addClass('has-error');
        hasError = true;
      }

      if (!hasError) {
        $('#exp-input-cat').val('');
        $('#exp-input-amount').val('');
        this.model.add(new Expense({ category: itemName, amount: itemAmount }));
      }
    },

    render: function() {
      $('#exp-list').empty();
      var total = 0;
      this.model.each(function(expense) {
        total += +expense.get('amount');
        var expenseView = new ExpenseView({ model: expense });
        $('#exp-list').append(expenseView.render().$el);
      });

      $('#exp-total').html(total.toFixed(2));

      return this;
    },
  });

  var expenses = new Expenses([
    new Expense({ category: 'Home costs', amount: 1.07 }),
    new Expense({ category: 'Category 25', amount: 125.00 }),
    new Expense({ category: 'Home costs', amount: 21.07 }),
  ]);

  var expensesView = new ExpensesView({ el: '#expenses', model: expenses });

  expensesView.render();

})();
