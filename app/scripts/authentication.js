App.ApplicationController = Ember.ArrayController.extend({
    isLoggedIn: false,
    savedTransition: null,

    login: function() {
      this.setProperties({ savedTransition: null, isLoggedIn: true });
    },

    logout: function() {
      this.set('isLoggedIn', false);
    }
});


App.ApplicationRoute = Ember.Route.extend({

  applicationController: function () {
      return this.controllerFor('application');
  }.property(),

  beforeModel: function(transition) {
    if (localStorage.authToken) {
      this.get('applicationController').login();
    } else {
      this.get('applicationController').logout();
    }
  },

  actions: {
    logout: function() {
      this.get('applicationController').logout();
      delete localStorage.authToken;
      this.transitionTo('login');
      App.Firebase.unauth();
    }
  }
});

App.AuthenticatedRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    var applicationController = this.controllerFor('application');
    if (localStorage.authToken !== App.Firebase.getAuth().token) {//Yay! actual verification
      applicationController.set('savedTransition', transition);
      this.transitionTo('login');
    } else {
      this.controllerFor('application').login();
    }
  }
});

App.LoginRoute = Ember.Route.extend({
    actions: {
        login: function () {
            var loginController = this.controllerFor('login');
            var username = loginController.get('username');
            var password = loginController.get('password');
            var that = this;

            App.Firebase.authWithPassword({
                email: username,
                password: password
            }, function (error, authData) {
                if (authData) {
                    localStorage.authToken = authData.token;
                    that.transitionTo('index');
                } else {
                    console.warn(error);
                    loginController.set('error', error.message);
                }
            });
        }
    }
});

App.SignupRoute = Ember.Route.extend({
    actions: {
        signup: function () {
            var signupController = this.controllerFor('signup');
            var email    = signupController.get('email');
            var password = signupController.get('password');
            var that = this;

            App.Firebase.createUser({
                email    : email,
                password : password
            }, function (error) {
                if (error === null) {
                    console.log('User <' + email + '> Created Successfully');
                    that.transitionTo('index');
                } else {
                    console.warn('Error Creating User:', error);
                    signupController.set('error', error.message);
                }
            });
        }
    }
});

/* Use this function to create a firebase account (for authentication) when you create a user account for your app
*
* ex:
*
* //...above truncated for brevity (its a user controller)
* actions: {
*   createUser: {
*     App.CreateFirebaseUser(this.get('email'), this.get('password'),
*       function (email) {
*         //on success do something
*       },
*       function (error) {
*         //on error do something
*     });
*   }
* }
* //...below truncated for brevity (its a user controller)
*
* */
App.CreateFirebaseUser = function (email, password, successCallback, failureCallback) {
    App.Firebase.createUser({
        email    : email,
        password : password
    }, function (error) {
        if (error === null) {
            console.log('User <' + email + '> Created Successfully');
            successCallback(email);
        } else {
            console.warn('Error Creating User:', error);
            failureCallback(error);
        }
    });
};
