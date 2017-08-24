sap.ui.define([
  'sap/ui/core/message/ControlMessageProcessor',
  'sap/ui/core/mvc/Controller',
  'sap/m/MessageBox',
  'sap/m/MessageItem',
  'sap/m/MessagePopover',
  'sap/m/MessageToast',
  'openui5/validator/Validator'
], function(ControlMessageProcessor, Controller, MessageBox, MessageItem, MessagePopover, MessageToast, UI5Validator) {
  'use strict';

  return Controller.extend('mlauffer.demo.openui5.validator.controller.App', {
    onInit: function() {
      this._initValidator();
      this._initMessageManager();
    },

    onSave: function() {
      this._messageManager.removeAllMessages();
      //Validates UI5 Controls against the validation schema set before
      const validationResult = this._validator.validate();
      if (validationResult) {
        this._onValidationError(validationResult);
      } else {
        this._onValidationSuccess();
      }
      //See what OpenUI5 Validator returns
      console.dir(validationResult);
    },

    onMessagePopoverPress: function (evt) {
      this._messagePopover.toggle(evt.getSource());
    },

    _initValidator: function() {
      //This is the schema with all rules used to validate the UI5 Controls
      const validationSchema = {
        properties: {
          country: { //UI5 control ID
            minLength: 1 //required
          },
          name: { //UI5 control ID
            type: 'string',
            minLength: 5 //required
          },
          email: { //UI5 control ID
            type: 'string',
            format: 'email',
            minLength: 0 //required
          },
          website: { //UI5 control ID
            format: 'uri'
          },
          salary: { //UI5 control ID
            type: 'number',
            minimum: 0,
            maximum: 999999
          },
          birthdate: { //UI5 control ID
            format: 'date'
          }
        }
      };

      //Initialize the OpenUI5 Validator object
      this._validator = new UI5Validator(this.getView(), validationSchema);
    },

    _initMessageManager: function() {
      //Initialize the message processor and message manager
      this._messageManager = sap.ui.getCore().getMessageManager();
      this._messageManager.registerMessageProcessor(new ControlMessageProcessor());

      //Initialize the Message Popover used to display the errors
      this._messagePopover = new MessagePopover({
        items: {
          path: 'message>',
          template: new MessageItem({
            description: '{message>description}',
            type: '{message>type}',
            title: '{message>message}',
            subtitle: 'ID adssa'
          })
        }
      });
    },

    _onValidationSuccess: function() {
      this._messagePopover.close();
      this.getView().byId('btMessagePopover').setVisible(false);
      MessageToast.show('Form is valid! No errors!');
    },

    _onValidationError: function(validationResult) {
      this._messageManager.addMessages(validationResult.ui5ErrorMessageObjects);
      this.getView().byId('btMessagePopover').setText(validationResult.ui5ErrorMessageObjects.length);
      this.getView().byId('btMessagePopover').setVisible(true);
      MessageBox.error('Form is invalid! It contains errors!', {
        details: validationResult.originalErrorMessages
      });
    }
  });
});
