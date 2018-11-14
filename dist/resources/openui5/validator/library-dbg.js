sap.ui.define([
], function() {
  'use strict';

  /**
   * OpenUI5 library: openui5.validator.
   *
   * @namespace
   * @name openui5.validator
   * @author Mauricio Lauffer
   * @version 0.1.10
   * @public
   */
  // delegate further initialization of this library to the Core
  const validator = sap.ui.getCore().initLibrary({
    name: 'openui5.validator',
    dependencies: [
      'sap.ui.core'
    ],
    controls: ['openui5.validator.Validator'],
    noLibraryCSS: true,
    version: '0.1.10'
  });

  return validator;
}, /* bExport= */ false);
