'use strict';

/* !
 * openui5-validator
 * (c) Copyright 2018-2023 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

sap.ui.define([
  'sap/ui/core/Lib',
  'sap/ui/core/library'
],
/**
 * Module Dependencies
 * @param {sap.ui.core.Lib} Lib - sap.ui.core.Lib
 * @returns {object} openui5.validator library
 */
function(Lib) {
  /**
   * OpenUI5 library: openui5.validator.
   * @namespace
   * @name openui5.validator
   * @author Mauricio Lauffer
   * @version 0.1.19
   * @public
   */
  return Lib.init({
    name: 'openui5.validator',
    dependencies: [
      'sap.ui.core'
    ],
    controls: ['openui5.validator.Validator'],
    noLibraryCSS: true,
    version: '0.1.19'
  });
});
