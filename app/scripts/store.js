YoEmberDemo.Firebase = new Firebase('https://ember-auth-demo.firebaseio.com/');

YoEmberDemo.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebase: YoEmberDemo.Firebase
});
