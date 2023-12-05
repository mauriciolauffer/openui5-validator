//@ui5-bundle openui5/validator/library-preload.js
sap.ui.require.preload({
	"openui5/validator/Validator.js":function(){
"use strict";
/*
 * openui5-validator
 * (c) Copyright 2018-2023 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */sap.ui.define(["sap/ui/base/Object","sap/ui/core/library","sap/ui/core/Control","sap/ui/core/message/Message","openui5/validator/thirdparty/ajv/ajv.min"],function(t,e,r,o){const s=["dateValue","selectedKey","selected","value"];const i={$data:true,allErrors:true,coerceTypes:true,errorDataPath:"property"};const a=t.extend("openui5.validator.Validator",{constructor:function(e,r,o){if(!e||!r){throw new Error("Missing parameters!")}t.apply(this,arguments);const a=new Ajv(o||i);this._validate=a.compile(r);this._view=e;this._errors=null;this._payload=null;this._validProperties=[];this.addValidProperties(s)}});a.prototype.destroy=function(){this._validate=null;this._view=null;this._errors=null;this._payload=null;this._validProperties=null};a.prototype.validate=function(){const t=this._getControls();this._payload=this._getPayloadToValidate(t);this._clearControlStatus(t);const e=this._validate(this._payload);if(e){this._errors=null}else{this._errors=this._processValidationErrors(this._validate.errors)}return e};a.prototype.getErrors=function(){return this._errors};a.prototype.getPayloadUsedInValidation=function(){return this._payload};a.prototype.getValidProperties=function(){return this._validProperties.map(function t(e){return e})};a.prototype.addValidProperties=function(t){const e=this;t.forEach(function t(r){e._validProperties.push(r)})};a.prototype._getControls=function(){const t=this;if(this._validate.schema&&this._validate.schema.properties){return Object.keys(this._validate.schema.properties).map(function e(o){const s=t._view.byId(o);return s instanceof r?s:null}).filter(function t(e){return e})}else{return[]}};a.prototype._getPayloadToValidate=function(t){const e=this;const r={};t.forEach(function t(o){const s=o.getId().lastIndexOf("-")+1;const i=o.getId().substring(s);r[i]=e._getControlValue(o)});return r};a.prototype._getControlValue=function(t){let e="";const r=Object.keys(t.mProperties);this._validProperties.forEach(function o(s){if(!e){const o=r.find(function t(e){return e===s});if(o){const r=["get",s.substring(0,1).toUpperCase(),s.substring(1)].join("");if(t[r]){e=t[r]()}}}});return e};a.prototype._clearControlStatus=function(t){t.forEach(function t(r){if(r&&r.setValueState){r.setValueState(e.ValueState.None)}if(r&&r.setValueStateText){r.setValueStateText()}})};a.prototype._setControlErrorStatus=function(t,r){if(t&&t.setValueState){t.setValueState(e.ValueState.Error)}if(t&&t.setValueStateText){t.setValueStateText(r)}};a.prototype._processValidationErrors=function(t){const e=this;const r=[];t.forEach(function t(o){const s=o.dataPath.substring(1);const i=e._view.byId(s);if(i){e._setControlErrorStatus(i,o.message);r.push(e._createErrorMessageObject(i,o.message,""))}});return r};a.prototype._createErrorMessageObject=function(t,r,s){return new o({message:r,description:s,type:e.MessageType.Error,target:[t.getId(),"/"].join("")})};return a});
},
	"openui5/validator/library.js":function(){
"use strict";
/* !
 * openui5-validator
 * (c) Copyright 2018-2023 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */sap.ui.define(["sap/ui/core/Core","sap/ui/core/library"],function(i){i.initLibrary({name:"openui5.validator",dependencies:["sap.ui.core"],controls:["openui5.validator.Validator"],noLibraryCSS:true,version:"0.1.19"});return openui5.validator});
},
	"openui5/validator/manifest.json":'{"sap.app":{"id":"openui5.validator","type":"library","applicationVersion":{"version":"0.1.19"},"title":"An OpenUI5 library to validate fields."},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"dependencies":{"minUI5Version":"1.30.0","libs":{"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true}}}'
});
//# sourceMappingURL=library-preload.js.map
