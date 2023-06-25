process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";
process.env.ASSET_PATH = "/";
process.env.PORT = 5500;

var webpack = require("webpack"),
  config = require("../webpack.config");

delete config.chromeExtensionBoilerplate;

config.mode = "development";

webpack(config, function (err) {
  if (err) throw err;
});
