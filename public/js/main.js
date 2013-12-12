require.config({
  paths: {
    jQuery: 'libs/jquery',
    Underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
    'Backbone.Validation': 'libs/backbone.validation',
    text: 'libs/text',
    templates: '../templates',
    //transition: 'libs/bootstrap/js/bootstrap-transition',
    //collapse: 'libs/bootstrap/js/bootstrap-collapse',
    utilities: 'libs/utilities'
  },

  shim: {
    'Backbone': ['Underscore', 'jQuery'],
    'Backbone.Validation': ['Backbone'],
    //'transition': ['jQuery'],
    //'collapse' : ['jQuery'],
    //'carousel': ['transition'],
    'utilities': ['jQuery', 'Backbone', 'Backbone.Validation'],
    //'app': ['Backbone', 'carousel', 'Backbone.Validation', 'utilities', 'collapse']
    'app': ['Backbone', 'Backbone.Validation', 'utilities']
  }
});

require(['app'], function(app) {
  app.initialize();
});
