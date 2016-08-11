import Ember from 'ember';
import WithConfigMixin from 'ember-idx-utils/mixin/with-config';
var computed = Ember.computed;

export default Ember.Component.extend(WithConfigMixin, {
  tagName: 'a',
  classNameBindings: ['styleClasses', 'activeClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.wysiwyg.actionClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  activeClasses: (function() {
    var _ref;
    if (this.get('active')) {
      return (_ref = this.get('config.wysiwyg.actionActiveClasses')) != null ? _ref.join(" ") : void 0;
    }
  }).property('active'),
  click: function() {
    var args, command, commands;
    this.get('editor').restoreSelection();
    this.get('editor').$().focus();
    commands = this.get('command').split(' ');
    command = commands.shift();
    args = commands.join(' ');
    document.execCommand(command, 0, args);
    this.get('editor').saveSelection();
    return this.get('wysiwyg').trigger('update_actions');
  },
  wysiwyg: computed.alias('parentView.wysiwyg'),
  editor: computed.alias('wysiwyg.editor'),
  listenToUpdate: (function() {
    return this.get('wysiwyg').on('update_actions', (function(_this) {
      return function() {
        return _this.set('active', document.queryCommandState(_this.get('command')));
      };
    })(this));
  }).on('init')
});
