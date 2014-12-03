var YoEmberDemo = window.YoEmberDemo = Ember.Application.create({
    LOG_TRANSITIONS: true
});

var App = window.App = YoEmberDemo;

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');
require('scripts/authentication');
