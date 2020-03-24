/* config-overrides.js */
const path = require('path');
const { override, addLessLoader, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addLessLoader(),
  addWebpackAlias({
    ['@components']: path.resolve(__dirname, 'src/components/'),
    ['@constants']: path.resolve(__dirname, 'src/constants/'),
    ['@layout']: path.resolve(__dirname, 'src/layout/'),
    ['@typings']: path.resolve(__dirname, 'src/typings/'),
    ['@redux']: path.resolve(__dirname, 'src/redux/'),
    ['@assets']: path.resolve(__dirname, 'src/assets/'),
    ['@utils']: path.resolve(__dirname, 'src/utils/'),
    ['@events']: path.resolve(__dirname, 'src/events/'),
    ['@hooks']: path.resolve(__dirname, 'src/hooks/'),
    ['@audio']: path.resolve(__dirname, 'src/audio/'),
  }),
);
