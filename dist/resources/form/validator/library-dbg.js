/* !
 * form-validator
 * (c) Copyright 2017-2020 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

sap.ui.define([], function() {
  'use strict';

  /**
   * OpenUI5 library: openui5.validator.
   *
   * @namespace
   * @name openui5.validator
   * @author Mauricio Lauffer
   * @version 0.0.9
   * @public
   */
  return sap.ui.getCore().initLibrary({
    name: '.form.validator',
    dependencies: [
      'sap.ui.core'
    ],
    controls: ['form.validator.Validator'],
    noLibraryCSS: true,
    version: '0.0.9'
  });
});
