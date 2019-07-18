const {
  doc: {
    builders: { concat }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  return concat(path.map(print, "elems"));
};