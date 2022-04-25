'use strict';

/* !
 * ${copyright}
 */

sap.ui.define([
  'sap/ui/core/Core',
  'sap/ui/core/library'
],
/**
 * Module Dependencies
 *
 * @param {sap.ui.core.Core} Core - sap.ui.core.Core
 * @returns {object} openui5.validator library
 */
function(Core) {
  /**
   * OpenUI5 library: openui5.validator.
   *
   * @namespace
   * @name openui5.validator
   * @author Mauricio Lauffer
   * @version ${version}
   * @public
   */
  Core.initLibrary({
    name: 'openui5.validator',
    dependencies: [
      'sap.ui.core'
    ],
    controls: ['openui5.validator.Validator'],
    noLibraryCSS: true,
    version: '${version}'
  });

  return openui5.validator; // eslint-disable-line
});
