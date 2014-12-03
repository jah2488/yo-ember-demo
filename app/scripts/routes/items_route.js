YoEmberDemo.ItemsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('item');
  }
});

