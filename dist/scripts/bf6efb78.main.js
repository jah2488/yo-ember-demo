!function(){{var a=window.YoEmberDemo=Ember.Application.create({LOG_TRANSITIONS:!0});window.App=a}}(),function(){YoEmberDemo.ItemController=Ember.ObjectController.extend({})}(),function(){YoEmberDemo.ItemEditController=Ember.ObjectController.extend({needs:"item",actions:{save:function(){self=this,this.get("buffer").forEach(function(a){self.get("controllers.item.model").set(a.key,a.value)}),this.transitionToRoute("item",this.get("model"))}}})}(),function(){YoEmberDemo.ItemsController=Ember.ArrayController.extend({sortProperties:["name"]})}(),function(){YoEmberDemo.Firebase=new Firebase("https://ember-auth-demo.firebaseio.com/"),YoEmberDemo.ApplicationAdapter=DS.FirebaseAdapter.extend({firebase:YoEmberDemo.Firebase})}(),function(){YoEmberDemo.Item=DS.Model.extend({name:DS.attr("string"),size:DS.attr("string"),weight:DS.attr("number"),lastLocation:DS.attr("string")}),YoEmberDemo.Item.reopen({attributes:function(){var a=this;return Ember.keys(this.get("data")).map(function(b){return Em.Object.create({model:a,key:b,valueBinding:"model."+b})})}.property()}),YoEmberDemo.Item.FIXTURES=[{id:0,name:"Wallet",size:"foo",weight:"foo",lastLocation:"Desk"},{id:1,name:"Keys",size:"foo",weight:"foo",lastLocation:"Desk"}]}(),function(){YoEmberDemo.ApplicationRoute=Ember.Route.extend({model:function(){return["red","yellow","blue"]}})}(),function(){YoEmberDemo.ItemEditRoute=Ember.Route.extend({model:function(){return this.get("store").find("item",this.modelFor("item").id)},setupController:function(a,b){a.set("model",b),buffer=b.get("attributes").map(function(a){return{key:a.get("key"),value:a.get("value")}}),a.set("buffer",buffer)}})}(),function(){YoEmberDemo.ItemRoute=Ember.Route.extend({model:function(a){return this.get("store").find("item",a.item_id)}})}(),function(){YoEmberDemo.ItemsRoute=Ember.Route.extend({model:function(){return this.get("store").find("item")}})}(),function(){YoEmberDemo.ItemEditView=Ember.View.extend({})}(),function(){YoEmberDemo.ItemView=Ember.View.extend({})}(),function(){YoEmberDemo.ItemsView=Ember.View.extend({})}(),function(){YoEmberDemo.Router.map(function(){this.route("about"),this.route("contact"),this.resource("items",function(){this.resource("item",{path:"/:item_id"},function(){this.route("edit")}),this.route("create")}),this.route("signup",{path:"/signup"}),this.route("login",{path:"/login"})})}(),function(){App.ApplicationController=Ember.ArrayController.extend({isLoggedIn:!1,savedTransition:null,login:function(){this.setProperties({savedTransition:null,isLoggedIn:!0})},logout:function(){this.set("isLoggedIn",!1)}}),App.ApplicationRoute=Ember.Route.extend({applicationController:function(){return this.controllerFor("application")}.property(),beforeModel:function(){localStorage.authToken?this.get("applicationController").login():this.get("applicationController").logout()},actions:{logout:function(){this.get("applicationController").logout(),delete localStorage.authToken,this.transitionTo("login"),App.Firebase.unauth()}}}),App.AuthenticatedRoute=Ember.Route.extend({beforeModel:function(a){var b=this.controllerFor("application");localStorage.authToken!==App.Firebase.getAuth().token?(b.set("savedTransition",a),this.transitionTo("login")):this.controllerFor("application").login()}}),App.LoginRoute=Ember.Route.extend({actions:{login:function(){var a=this.controllerFor("login"),b=a.get("username"),c=a.get("password"),d=this;App.Firebase.authWithPassword({email:b,password:c},function(b,c){c?(localStorage.authToken=c.token,d.transitionTo("index")):(console.warn(b),a.set("error",b.message))})}}}),App.SignupRoute=Ember.Route.extend({actions:{signup:function(){var a=this.controllerFor("signup"),b=a.get("email"),c=a.get("password"),d=this;App.Firebase.createUser({email:b,password:c},function(c){null===c?(console.log("User <"+b+"> Created Successfully"),d.transitionTo("index")):(console.warn("Error Creating User:",c),a.set("error",c.message))})}}}),App.CreateFirebaseUser=function(a,b,c,d){App.Firebase.createUser({email:a,password:b},function(b){null===b?(console.log("User <"+a+"> Created Successfully"),c(a)):(console.warn("Error Creating User:",b),d(b))})}}();