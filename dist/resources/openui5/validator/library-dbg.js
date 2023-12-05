'use strict';

/* !
 * openui5-validator
 * (c) Copyright 2018-2023 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

sap.ui.define([
  'sap/ui/core/Core',
  'sap/ui/core/library'
],
/**
 * Module Dependencies
 * @param {sap.ui.core.Core} Core - sap.ui.core.Core
 * @returns {object} openui5.validator library
 */
function(Core) {
  /**
   * OpenUI5 library: openui5.validator.
   * @namespace
   * @name openui5.validator
   * @author Mauricio Lauffer
   * @version 0.1.19
   * @public
   */
  Core.initLibrary({
    name: 'openui5.validator',
    dependencies: [
      'sap.ui.core'
    ],
    controls: ['openui5.validator.Validator'],
    noLibraryCSS: true,
    version: '0.1.19'
  });

  return openui5.validator; // eslint-disable-line
});
