/* config-overrides.js */
const path = require('path'); 

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components/');
  config.resolve.alias['@constants'] = path.resolve(__dirname, 'src/constants/');
  config.resolve.alias['@layout'] = path.resolve(__dirname, 'src/layout/');
  config.resolve.alias['@typings'] = path.resolve(__dirname, 'src/typings/');
  config.resolve.alias['@redux'] = path.resolve(__dirname, 'src/redux/');
  config.resolve.alias['@assets'] = path.resolve(__dirname, 'src/assets/');
  config.resolve.alias['@utils'] = path.resolve(__dirname, 'src/utils/');
  config.resolve.alias['@events'] = path.resolve(__dirname, 'src/events/');
  return config;
}
