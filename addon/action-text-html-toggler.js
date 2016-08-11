import Ember from 'ember';
import WithConfigMixin from 'ember-idx-utils/mixin/with-config';
var computed = Ember.computed;

export default Ember.Component.extend(WithConfigMixin, {
  tagName: 'a',
  layoutName: 'components/em-wysiwyg-action',
  classNameBindings: ['styleClasses', 'activeClasses'],
  wysiwyg: computed.alias('parentView.wysiwyg'),
  editor: computed.alias('wysiwyg.editor'),
  //When active, we'r in textarea mode
  active: false,
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
    if (this.get('active')) {
      this.set('active', false);
      this.set('wysiwyg.editor.display', 'block');
      this.set('wysiwyg.editor-textarea.display', 'none');
      //Copy the content of as_html into data
      this.get('editor').$().html(this.get('wysiwyg.as_html'));
    } else {
      this.set('active', true);
      this.set('wysiwyg.editor.display', 'none');
      this.set('wysiwyg.editor-textarea.display', 'block');
    }
  }
});
