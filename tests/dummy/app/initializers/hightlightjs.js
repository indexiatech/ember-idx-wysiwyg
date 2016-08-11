import Em from 'ember';
import UtilsConfig from 'ember-idx-utils/config';
/*global hljs*/

var Config;

export default {
  name: 'hightlightjs',
  initialize: function() {
    //In real app we don't need this coz the initializer of modal will be merged into the app and will run automatically
    Em.Config = Config = UtilsConfig.create();
    var defaultConfig = Config.getConfig('bs');

    if (!defaultConfig) {
        Config.addConfig('bs');
        defaultConfig = Config.getConfig('bs');
    }

    defaultConfig['modal'] = {
        classes: ['em-modal', 'modal', 'fade'],
        bodyClasses: ['modal-body'],
        titleClasses: ['modal-header'],
        footerClasses: ['modal-footer']
    };

    return Em.Route.reopen({
      renderTemplate: function() {
        this._super();
        return Em.run.next(this, function() {
          return $('pre code').each(function(i, e) {
            return hljs.highlightBlock(e);
          });
        });
      }
    });
  }
};
