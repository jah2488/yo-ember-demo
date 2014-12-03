YoEmberDemo.Router.map(function () {
  this.route('about');
  this.route('contact');

  this.resource('items', function () {
    this.resource('item', { path: '/:item_id' }, function () {
      this.route('edit');
    });
    this.route('create');
  });

  this.route('signup', { path: '/signup' });
  this.route('login',  { path: '/login'  });
});
