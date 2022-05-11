const schemaJson = require("./api_schema");
var Validator = require("jsonschema").Validator;

class Validation {
  
  constructor(fields, data) {
    this.v = new Validator({ throwError: true });
    this.fields = fields;
    this.data = data;
    this.returnData = {};
  }
  schemaBuilder(schemaName) {
   
    this.schema = {
      id: `/${schemaName}`,
      type: "object",
      properties: {},
    };
    for (let fieldName in this.fields) {
      this._structureValidation(fieldName);
      this.returnData[fieldName] = this.data[fieldName];
      this.schema["properties"][fieldName] = {
        $ref: `/${fieldName}`,
      };
      this.v.addSchema(this.fields[fieldName], `/${fieldName}`);
    }
    return this;
  }
  _check() {
    let validatorResult = this.v.validate(this.data, this.schema);
    if (!validatorResult.valid) {
       throw new Error(validatorResult.errors[0].stack)      
    }
    return this.returnData;
  }
  _structureValidation(fieldName) {
    if (Object.keys(this.fields[fieldName]) == 0) {
      throw new Error(`No validation found for ${fieldName}`);
    }
  }
}

const sanitize = function (name, data) {
  return new Validation(schemaJson[name], data).schemaBuilder(name)._check();
};
module.exports = {
  sanitize,
};
