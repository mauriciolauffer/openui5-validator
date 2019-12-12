sap.ui.define([], function() {
  'use strict';

  /**
   * OpenUI5 library: openui5.validator.
   *
   * @namespace
   * @name openui5.validator
   * @author Mauricio Lauffer
   * @version 0.1.13
   * @public
   */
  return sap.ui.getCore().initLibrary({
    name: 'openui5.validator',
    dependencies: [
      'sap.ui.core',
    ],
    controls: ['openui5.validator.Validator'],
    noLibraryCSS: true,
    version: '0.1.13',
  });
});
