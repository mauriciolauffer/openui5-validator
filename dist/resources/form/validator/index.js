var fs=require("fs-extra");const source="dist/resources";const destination="../../webapp/lib";var init=async function(){fs.copy(source,destination,function(o){console.log(source);console.log(destination);if(o){console.log("An error occured while copying the folder.");return console.error(o)}console.log("Copy completed!")});try{const o=process.cwd()+"../../../webapp/manifest.json";const e=await fs.readJSON(o);const s=e["sap.ui5"];e["sap.ui5"].components={"form.validate":{}};e["sap.ui5"].resourceRoots={"form.validate":"./lib/form/validate"};fs.writeJSON(o,e);console.log("Updated manifest")}catch(o){console.log("Error during the manipulation of the manifest: "+o);throw o}};init();