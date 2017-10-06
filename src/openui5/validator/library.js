sap.ui.define([
], function() {
  'use strict';

  /**
   * OpenUI5 library: openui5.validator.
   *
   * @namespace
   * @name openui5.validator
   * @author Mauricio Lauffer
   * @version ${version}
   * @public
   */
  // delegate further initialization of this library to the Core
  var validator = sap.ui.getCore().initLibrary({
    name: 'openui5.validator',
    dependencies: [
      'sap.ui.core'
    ],
    controls: ['openui5.validator.Validator'],
    noLibraryCSS: true,
    version: '${version}'
  });

  return validator;
}, /* bExport= */ false);
