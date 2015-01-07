import Em from 'ember';
import WithConfigMixin from 'ember-idx-utils/mixin/with-config';

var computed = Em.computed;

/**
 * Toolbar component
 *
 * @class Toolbar
 */
export default Em.Component.extend(WithConfigMixin, {
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.wysiwyg.toolbarClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  groups: void 0,
  initGroups: (function() {
    return this.set('groups', Em.ArrayProxy.create({
      content: []
    }));
  }).on('init'),
  wysiwyg: computed.alias('parentView'),
  register: (function() {
    return this.get('wysiwyg').addToolbar(this);
  }).on('didInsertElement'),
  unregister: (function() {
    return this.get('wysiwyg').removeToolbar(this);
  }).on('willDestroyElement'),
  addGroup: function(g) {
    return this.get('groups').addObject(g);
  },
  removeGroup: function(g) {
    return this.get('groups').removeObject(g);
  }
});
