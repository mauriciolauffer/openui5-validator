sap.ui.define([
  'sap/ui/core/UIComponent'
], function(UIComponent){
  'use strict';

  return UIComponent.extend('mlauffer.demo.openui5.validator.Component', {
    metadata: {
      manifest: 'json'
    },

    init: function () {
      UIComponent.prototype.init.apply(this, arguments);
    }
  });
});
