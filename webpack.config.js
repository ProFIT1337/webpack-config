const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, 'src', 'index'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: "bundle.js",
  },
};