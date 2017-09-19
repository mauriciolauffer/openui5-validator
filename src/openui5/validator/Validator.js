sap.ui.define([
  'jquery.sap.global',
  'sap/ui/base/Object',
  'sap/ui/core/Control',
  'sap/ui/core/ValueState',
  'sap/ui/core/MessageType',
  'sap/ui/core/message/Message',
  './thirdparty/ajv.min',
  './library'
], function($, UI5Object, UI5Control, ValueState, MessageType, Message) {
  'use strict';

  /**
   * OpenUI5 Validator.
   *
   * @author Mauricio Lauffer
   * @version ${version}
   *
   * @namespace
   * @name openui5.validator
   * @public
   */

  /**
   * A list of properties of UI5 Controls which will be used to dynamically get the field value.
   * Validation is dynamic, it neither knows the control's type nor the property which is being validated.
   *
   * @private
   */
  var VALID_UI5_CONTROL_PROPERTIES = ['dateValue', 'value', 'selectedKey'];

  /**
   * Default parameters to initialize Ajv.
   * https://github.com/epoberezkin/ajv#options
   *
   * @private
   */
  var DEFAULT_AJV_OPTIONS = {
    $data: true,
    allErrors: true,
    coerceTypes: true,
    errorDataPath: 'property'
  };

  /**
   * Constructor for a new Validator.
   * @class
   * @extends sap.ui.base.Object
   *
   * @constructor
   * @param {sap.ui.core.mvc.View} view UI5 view which contains the fields to be validated.
   * @param {object} schema Schema used for validation.
   * @param {object} opt Parameters to initialize Ajv.
   * @public
   */

  var Validator = UI5Object.extend('openui5.validator.Validator', {
    constructor: function(view, schema, opt) {
      if (!view || !schema) {
        throw new Error('Missing parameters!');
      }
      UI5Object.apply(this, arguments);

      //OpenUI5 controls always return their values as STRING, so we force the correct type for validation
      var ajv = new Ajv(opt || DEFAULT_AJV_OPTIONS);
      this._validate = ajv.compile(schema);
      this._view = view;
      this._validProperties = VALID_UI5_CONTROL_PROPERTIES.map(function _clone(property) { return property; });
      this._errors = null;
    }
  });

  /**
   * Validates the payload against the schema.
   *
   * @returns {boolean} Returns "true" if validation is successful and "false" in case of any validation error.
   * @public
   */
  Validator.prototype.validate = function() {
    var controls = this._getControls();
    var payload = this._getPayload(controls);
    this._clearControlStatus(controls);
    var isValid = this._validate(payload);
    if (isValid) {
      this._errors = null;
    } else {
      this._errors = {
        payloadUsed: payload,
        originalErrorMessages: this._validate.errors,
        ui5ErrorMessageObjects: this._processValidationErrors(this._validate.errors)
      };
    }
    return isValid;
  };

  /**
   * Returns all validation errors.
   * If there is no error, returns null.
   *
   * @returns {object|null} [parameters] Returns "null" if validation is successful and an object in case of error.
   * @returns {object} [parameters.payloadUsed] Payload used in the validation.
   * @returns {object} [parameters.originalErrorMessages] Error messages returned.
   * @returns {object} [parameters.ui5ErrorMessageObjects] Array of sap.ui.core.message.Message objects.
   * @public
   */
  Validator.prototype.getErrors = function() {
      return this._errors;
  };

  /**
   * Returns all valid properties which will be used to dynamically get the field value.
   *
   * @returns {Array} Array with all valid properties.
   * @public
   */
  Validator.prototype.getValidProperties = function() {
    return this._validProperties;
  };

  /**
   * Adds new valid properties to be used to dynamically get the field value.
   *
   * @param {Array} validProperties An array containing valid properties to be added to the class.
   * @public
   */
  Validator.prototype.addValidProperties = function(validProperties) {
    var that = this;
    validProperties.forEach(function _addValidProperty(property) {
      that._validProperties.push(property);
    });
  };

  /**
   * Returns all UI5 Controls which will be validated.
   *
   * @returns {Array} List of UI5 Controls to be validated.
   * @private
   */
  Validator.prototype._getControls = function() {
    var that = this;
    var controls = [];
    if (this._validate.schema && this._validate.schema.properties) {
      controls = Object.keys(this._validate.schema.properties)
        .map(function _mapSchemaProperties(key) {
          var control = that._view.byId(key);
          if (control instanceof UI5Control) {
            return control;
          } else {
            return null;
          }
        })
        .filter(function _filterSchemaProperties(control) {
          return (control);
        });
    }
    return controls;
  };

  /**
   * Returns the payload to be validated.
   *
   * @param {Array} controls List of UI5 Controls to be validated.
   * @returns {object} Payload to be validated.
   * @private
   */
  Validator.prototype._getPayload = function(controls) {
    var that = this;
    var payload = {};
    controls.forEach(function _setPayloadProperty(control) {
      var viewIdIndex = control.getId().lastIndexOf('-') + 1;
      var controlId = control.getId().substring(viewIdIndex);
      payload[controlId] = that._getControlValue(control);
    });
    return payload;
  };

  /**
   * Returns the property value of the control.
   *
   * @param {sap.ui.core.Control} control The control which will have its value extracted.
   * @returns {string} The property value of the control.
   * @private
   */
  Validator.prototype._getControlValue = function(control) {
    var value = null;
    var controlProperties = Object.keys(control.mProperties);
    this._validProperties.forEach(function _filterControlProperties(validProperty) {
      if (!value) {
        var isValidProperty = controlProperties.find(function _findValidProperty(controlProperty) {
          return (controlProperty === validProperty);
        });
        if (isValidProperty) {
          /** Could use control.getProperty(property), but UI5 documentation says:
           * Note: This method is a low-level API as described in the class documentation.
           * Applications or frameworks must not use this method to generically retrieve the value of a property.
           * Use the concrete method getXYZ for property 'XYZ' instead.
           * https://openui5.hana.ondemand.com/#/api/sap.ui.base.ManagedObject/methods/getProperty
           */
          var getPropertyMethod = ['get', validProperty.substring(0, 1).toUpperCase(), validProperty.substring(1)].join('');
          if (control[getPropertyMethod]) {
            value = control[getPropertyMethod]();
          }
        }
      }
    });
    return value;
  };

  /**
   * Clears the status set to a list of controls
   *
   * @param {Array} controls The controls which will have the status cleared.
   * @private
   */
  Validator.prototype._clearControlStatus = function(controls) {
    controls.forEach(function _setValueState(control) {
      if (control && control.setValueState) {
        control.setValueState(ValueState.None);
      }
      if (control && control.setValueStateText) {
        control.setValueStateText();
      }
    });
  };

  /**
   * Sets error status and error message to a control
   *
   * @param {sap.ui.core.Control} control The control which will have the status updated.
   * @param {string} message The error message to be assigned to the control.
   * @private
   */
  Validator.prototype._setControlErrorStatus = function(control, message) {
    if (control && control.setValueState) {
      control.setValueState(ValueState.Error);
    }
    if (control && control.setValueStateText) {
      control.setValueStateText(message);
    }
  };

  /**
   * Process all validation errors.
   *
   * @param {Array} errors A list with all errors returned by the validation.
   * @returns {Array} A list of sap.ui.core.message.Message objects.
   * @private
   */
  Validator.prototype._processValidationErrors = function(errors) {
    var that = this;
    var errorMessageObjects = [];
    errors.forEach(function _mapErrors(err) {
      var controlId = err.dataPath.substring(1);
      var control = that._view.byId(controlId);
      if (control) {
        that._setControlErrorStatus(control, err.message);
        errorMessageObjects.push(that._createErrorMessageObject(control, err.message, ''));
      }
    });
    return errorMessageObjects;
  };

  /**
   * Creates an UI5 error message object.
   *
   * @param {sap.ui.core.Control} control The control with invalid value.
   * @param {string} shortMessage The short error message to be displayed.
   * @param {string} longMessage The long error message to be displayed.
   * @returns {sap.ui.core.message.Message} The UI5 error message object.
   * @private
   */
  Validator.prototype._createErrorMessageObject = function(control, shortMessage, longMessage) {
    return new Message({
      message: shortMessage,
      description: longMessage,
      type: MessageType.Error,
      date: new Date().getTime(),
      target: control.getId()
    });
  };

  return Validator;
}, /* bExport= */ true);
