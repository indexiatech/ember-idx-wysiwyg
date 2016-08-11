import Ember from 'ember';
import WithConfigMixin from 'ember-idx-utils/mixin/with-config';

const {
  on,
  computed
} = Ember;

/**
 * Toolbar component
 *
 * @class Toolbar
 */
export default Ember.Component.extend(WithConfigMixin, {
  classNameBindings: ['styleClasses'],
  styleClasses: computed(function() {
    var _ref;
    return (_ref = this.get('config.wysiwyg.toolbarClasses')) != null ? _ref.join(" ") : void 0;
  }),
  groups: void 0,
  initGroups: on('init', function() {
    return this.set('groups', Ember.ArrayProxy.create({
      content: []
    }));
  }),
  wysiwyg: computed.alias('parentView'),
  register: on('didInsertElement', function() {
    return this.get('wysiwyg').addToolbar(this);
  }),
  unregister: on('willDestroyElement', function() {
    return this.get('wysiwyg').removeToolbar(this);
  }),
  addGroup: function(g) {
    return this.get('groups').addObject(g);
  },
  removeGroup: function(g) {
    return this.get('groups').removeObject(g);
  }
});
