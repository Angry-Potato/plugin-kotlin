const {
  doc: {
    builders: { concat, literalline }
  }
} = require("prettier");
const djv = require("djv");
const env = new djv();
const jsonSchema = {
  common: {
    properties: {
      mods: {
        type: "array",
        items: {
          type: "object"
        }
      },
      names: {
        type: "array",
        items: {
          type: "string"
        }
      }
    },
    required: ["mods", "names"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const { names: names } = path.getValue();

    return concat(["package ", names.join("."), literalline]);
  }
};
