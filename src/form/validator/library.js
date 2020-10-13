/* !
 * ${copyright}
 */

sap.ui.define([], function() {
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
    name: '.form.validator',
    dependencies: [
      'sap.ui.core'
    ],
    controls: ['form.validator.Validator'],
    noLibraryCSS: true,
    version: '${version}'
  });
});
