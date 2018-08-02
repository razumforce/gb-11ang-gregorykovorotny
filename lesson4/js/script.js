window.onload = function() {

  var categories = new Categories([
    new Category({ name: 'Home costs' }),
    new Category({ name: 'Category 25' }),
  ]);

  var expenses = new Expenses([
    new Expense({ category: 'Home costs', amount: 1.07 }),
    new Expense({ category: 'Category 25', amount: 125.00 }),
    new Expense({ category: 'Home costs', amount: 21.07 }),
  ]);

  var categoriesSelectView = new CategoriesSelectView({ el: '#expenses', model: categories });
  var caregoriesView = new CategoriesView({ el: '#categories', model: categories });
  var expensesView = new ExpensesView({ el: '#expenses', model: expenses });


  categoriesSelectView.render();
  caregoriesView.render();
  expensesView.render();

}
