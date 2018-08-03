

  var myFarm = new Farm([
    new Product({ title: 'hen', productivity: 5, level: 1, consumes: 'grain', bonusCount: 10, penaltyCount: 3 }),
    new Product({ title: 'fox', productivity: 3, level: 1, consumes: 'hen', bonusCount: 4, penaltyCount: 2 }),
    new Product({ title: 'grain', productivity: 15, level: 1, consumes: null, bonusCount: 0, penaltyCount: 0 }),
  ]);

  var myStore = new Store([
    new StoreItem({ title: 'hen', count: 0, price: 100 }),
    new StoreItem({ title: 'fox', count: 0, price: 777 }),
    new StoreItem({ title: 'grain', count: 100, price: 15 }),
  ]);

  var farmViews = [];

  myFarm.each(function(product) {
    farmViews.push(new ProductView({ model: product }));
  });

  var storeView = new StoreViews.Store({ collection: myStore, el: $('#store') });
  storeView.render();

  var gameTimer = setInterval(function() {
    myFarm.each(function(product) {
      var level = product.get('level');
      var productivity = product.get('productivity') * (level > 0 ? Math.log(level + 1) : 0);

      if (product.get('penaltyCount') != 0) {
        if (myStore.findWhere({ title: product.get('title') }).get('count') <= product.get('penaltyCount')) {
          productivity *= 0.7;
        }
      }

      if (product.get('bonusCount') != 0) {
        if (myStore.findWhere({ title: product.get('title') }).get('count') >= product.get('bonusCount')) {
          productivity *= 1.3;
        }
      }

      var complete = product.get('complete');
      if (complete >= 100) {
        product.trigger('completeProduction');
      } else {
        complete = Number((complete + productivity).toFixed(2));
        product.set('complete', complete);
        if (Math.random() < 0.07) {
          product.trigger('disaster');
        }
      }
    });
  }, 1000);
