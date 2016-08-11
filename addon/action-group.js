import Ember from 'ember';
import WithConfigMixin from 'ember-idx-utils/mixin/with-config';
var computed = Ember.computed;

/**
 * ActionGroup component
 *
 * @class ActionGroup
 */

export default Ember.Component.extend(WithConfigMixin, {
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.wysiwyg.actionGroupClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  toolbar: computed.alias('parentView'),
  wysiwyg: computed.alias('parentView.parentView'),
  register: (function() {
    return this.get('toolbar').addGroup(this);
  }).on('didInsertElement'),
  unregister: (function() {
    return this.get('toolbar').removeGroup(this);
  }).on('willDestroyElement')
});
