YoEmberDemo.ItemRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('item', params.item_id);
  }
});

