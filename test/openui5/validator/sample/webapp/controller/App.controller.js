sap.ui.define([
  'sap/ui/core/message/ControlMessageProcessor',
  'sap/ui/core/mvc/Controller',
  'sap/m/MessageItem',
  'sap/m/MessagePopover',
  'sap/m/MessageToast',
  'openui5/validator/Validator'
], function(ControlMessageProcessor, Controller, MessageItem, MessagePopover, MessageToast, Validator) {
  'use strict';

  return Controller.extend('mlauffer.demo.openui5.validator.controller.App', {
    onInit: function() {
      this._initValidator();
      this._initMessageManager();
    },

    onSave: function() {
      this._messageManager.removeAllMessages();
      //Validates UI5 Controls against the validation schema set before
      if (this._validator.validate()) {
        this._onValidationSuccess();
      } else {
        this._onValidationError(this._validator.getErrors());
      }
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
      this._validator = new Validator(this.getView(), validationSchema);
    },

    _initMessageManager: function() {
      //Initialize the message processor and message manager
      this._messageManager = sap.ui.getCore().getMessageManager();
      this._messageManager.registerMessageProcessor(new ControlMessageProcessor());

      //Initialize the Message Popover used to display the errors
      this._messagePopover = new MessagePopover({
        items: {
          path: 'message>/',
          template: new MessageItem({
            description: '{message>description}',
            type: '{message>type}',
            title: '{message>message}'
          })
        }
      });
      this._messagePopover.setModel(this._messageManager.getMessageModel(), 'message');
    },

    _onValidationSuccess: function() {
      this._messagePopover.close();
      this.getView().byId('btMessagePopover').setVisible(false);
      MessageToast.show('Form is valid! No errors!');
    },

    _onValidationError: function(errors) {
      this._messageManager.addMessages(errors);
      this.getView().byId('btMessagePopover').setText(errors.length);
      this.getView().byId('btMessagePopover').setVisible(true);
      MessageToast.show('Form is invalid! It contains errors!');
    }
  });
});
