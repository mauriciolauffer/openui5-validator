/*
 * openui5-validator
 * (c) Copyright 2017-2021 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Control","sap/ui/core/ValueState","sap/ui/core/MessageType","sap/ui/core/message/Message","openui5/validator/thirdparty/ajv.min"],function(t,e,r,o,s){"use strict";const i=["dateValue","selectedKey","selected","value"];const a={$data:true,allErrors:true,coerceTypes:true,errorDataPath:"property"};const n=t.extend("openui5.validator.Validator",{constructor:function(e,r,o){if(!e||!r){throw new Error("Missing parameters!")}t.apply(this,arguments);const s=new Ajv(o||a);this._validate=s.compile(r);this._view=e;this._errors=null;this._payload=null;this._validProperties=[];this.addValidProperties(i)}});n.prototype.destroy=function(){this._validate=null;this._view=null;this._errors=null;this._payload=null;this._validProperties=null};n.prototype.validate=function(){const t=this._getControls();this._payload=this._getPayloadToValidate(t);this._clearControlStatus(t);const e=this._validate(this._payload);if(e){this._errors=null}else{this._errors=this._processValidationErrors(this._validate.errors)}return e};n.prototype.getErrors=function(){return this._errors};n.prototype.getPayloadUsedInValidation=function(){return this._payload};n.prototype.getValidProperties=function(){return this._validProperties.map(function t(e){return e})};n.prototype.addValidProperties=function(t){const e=this;t.forEach(function t(r){e._validProperties.push(r)})};n.prototype._getControls=function(){const t=this;if(this._validate.schema&&this._validate.schema.properties){return Object.keys(this._validate.schema.properties).map(function r(o){const s=t._view.byId(o);return s instanceof e?s:null}).filter(function t(e){return e})}else{return[]}};n.prototype._getPayloadToValidate=function(t){const e=this;const r={};t.forEach(function t(o){const s=o.getId().lastIndexOf("-")+1;const i=o.getId().substring(s);r[i]=e._getControlValue(o)});return r};n.prototype._getControlValue=function(t){let e=null;const r=Object.keys(t.mProperties);this._validProperties.forEach(function o(s){if(!e){const o=r.find(function t(e){return e===s});if(o){const r=["get",s.substring(0,1).toUpperCase(),s.substring(1)].join("");if(t[r]){e=t[r]()}}}});return e};n.prototype._clearControlStatus=function(t){t.forEach(function t(e){if(e&&e.setValueState){e.setValueState(r.None)}if(e&&e.setValueStateText){e.setValueStateText()}})};n.prototype._setControlErrorStatus=function(t,e){if(t&&t.setValueState){t.setValueState(r.Error)}if(t&&t.setValueStateText){t.setValueStateText(e)}};n.prototype._processValidationErrors=function(t){const e=this;const r=[];t.forEach(function t(o){const s=o.dataPath.substring(1);const i=e._view.byId(s);if(i){e._setControlErrorStatus(i,o.message);r.push(e._createErrorMessageObject(i,o.message,""))}});return r};n.prototype._createErrorMessageObject=function(t,e,r){return new s({message:e,description:r,type:o.Error,target:[t.getId(),"/"].join("")})};return n});