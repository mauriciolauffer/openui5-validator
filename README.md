# openui5-validator
An OpenUI5 library to validate fields.

This library uses Ajv, a JSON schema validator. All validation keywords available in Ajv can be used.

### JSON Schema and Ajv

For any references, please follow

- [JSON schema specification](http://json-schema.org/)
- [Ajv documentation](https://github.com/epoberezkin/ajv)

Ajv Options: https://github.com/epoberezkin/ajv#options

Ajv Keywords: https://github.com/epoberezkin/ajv#validation-keywords


## Demo
You can checkout a live demo here: https://embed.plnkr.co/220VmE

[<img src="openui5-validator.png">](https://raw.githubusercontent.com/mauriciolauffer/openui5-password/master/openui5-validator.png)


## Getting started

### Installation
Install openui5-validator as an npm module
```sh
$ npm install openui5-validator
```

### Configure manifest.json
Add the library to *sap.ui5/dependencies/libs* and set its path in *sap.ui5/resourceRoots* in your manifest.json file, as follows:

```json
"sap.ui5": {
  "dependencies": {
    "libs": {
      "openui5.validator": {}
    }
  },
  "resourceRoots": {
    "openui5.validator": "./FOLDER_WHERE_YOU_PLACED_THE_LIBRARY/openui5/validator/"
  }
}
```

### How to use
Import openui5-validator to your UI5 controller using *sap.ui.require*:

```javascript
sap.ui.require([
  'openui5/validator/Validator'
], function (Validator) {
  var validationSchema = {
    properties: {
      email: { //UI5 control ID
        type: 'string',
        format: 'email',
        minLength: 3 //required
      },
      salary: { //UI5 control ID
        type: 'number',
        minimum: 0,
        maximum: 9999999
      },
      birthdate: { //UI5 control ID
        format: 'date'
      }
    }
  };
  
  var validator = new Validator(this.getView(), validationSchema);
  var validationResult = validator.validate();
  if (validationResult) {
    console.log('Invalid! Errors...');
    console.dir(validationResult);
  } else {
    console.log('Valid!');
  }
});
```

## Config Parameters
| Name | Type | Default| Description
| :---- | :------------------- | :---- | :---------  |
| view | sap.ui.core.mvc.View | null | UI5 view which contains the fields to be validated.
| schema | object | null | JSON schema used for validation

## Author
Mauricio Lauffer

 - LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## License
[MIT](LICENSE)
