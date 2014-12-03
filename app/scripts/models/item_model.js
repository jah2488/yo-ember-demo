/*global Ember*/
YoEmberDemo.Item = DS.Model.extend({
    name: DS.attr('string'),
    size: DS.attr('string'),
    weight: DS.attr('number'),
    lastLocation: DS.attr('string')
});

// probably should be mixed-in...
YoEmberDemo.Item.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});

// delete below here if you do not want fixtures
YoEmberDemo.Item.FIXTURES = [

  {
    id: 0,

    name: 'Wallet',

    size: 'foo',

    weight: 'foo',

    lastLocation: 'Desk'

  },

  {
    id: 1,

    name: 'Keys',

    size: 'foo',

    weight: 'foo',

    lastLocation: 'Desk'

  }

];
