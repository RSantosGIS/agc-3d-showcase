const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

/*
  Override webpack default conditions when building the app
  need to do this to allow for an external, publically accessible dependency resource that also does not get minimized
*/

module.exports = function override(config, env) {
  config.externals = {
    'AgcShowcaseConfig': 'AgcShowcaseConfig'
  };
  config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
  return config;
}