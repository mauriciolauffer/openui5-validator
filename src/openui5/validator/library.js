/* !
 * ${copyright}
 */

sap.ui.define([
  'sap/ui/core/library'
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
  return sap.ui.getCore().initLibrary({
    name: 'openui5.validator',
    dependencies: [
      'sap.ui.core'
    ],
    controls: ['openui5.validator.Validator'],
    noLibraryCSS: true,
    version: '${version}'
  });
});
