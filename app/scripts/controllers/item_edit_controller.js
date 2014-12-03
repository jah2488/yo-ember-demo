YoEmberDemo.ItemEditController = Ember.ObjectController.extend({
  needs: 'item',
  actions: {
    save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        self.get('controllers.item.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('item',this.get('model'));
    }
  }
});

