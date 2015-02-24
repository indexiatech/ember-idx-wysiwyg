import Em from 'ember';
import IdxConfig from 'ember-idx-utils/config'

export default {
  name: 'ember-idx-wysiwyg',
  initialize: function() {
    var Config = Em.IdxConfig = Em.IdxConfig ? Em.IdxConfig : IdxConfig.create();

    var bsConfig = Config.getConfig('bs');
    if (!bsConfig) {
        Config.addConfig('bs');
        bsConfig = Config.getConfig('bs');
    }

    bsConfig['wysiwyg'] = {
        classes: ['well'],
        toolbarClasses: ['btn-toolbar'],
        actionGroupClasses: ['btn-group'],
        actionClasses: ['btn btn-default'],
        actionActiveClasses: ['active']
    }
  }
};