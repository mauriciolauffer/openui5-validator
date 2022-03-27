'use strict';

QUnit.config.autostart = false;
QUnit.config.reorder = false;

sap.ui.getCore().attachInit(function() {
  sap.ui.require([
    'test/unit/allTests'
  ], function() {
    if (window.blanket) {
      window.blanket.options('sap-ui-cover-only', 'openui5.validator');
      window.blanket.options('sap-ui-cover-never', 'openui5.validator/thirdparty');
    }

    QUnit.start();
  });
});
