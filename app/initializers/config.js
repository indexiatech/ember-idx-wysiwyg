import Em from 'ember';
import Config from 'ember-idx-utils/config'

export default {
  name: 'ember-idx-wysiwyg',
  initialize: function() {
    if (!Em.Config) {
        Em.Config = Config = Config.create()
    }

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