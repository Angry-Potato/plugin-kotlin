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
      ref: {
        type: "object",
        properties: {
          pieces: {
            type: "array",
            items: {
              type: "object"
            }
          }
        },
        required: ["pieces"]
      }
    },
    required: ["mods", "ref"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const node = path.getValue();
    return node.ref.pieces[0].name;
  }
};
