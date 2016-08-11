import Ember from 'ember';
import StyleBindingsMixin from 'ember-idx-utils/mixin/style-bindings';

export default Ember.Component.extend(StyleBindingsMixin, {
  styleBindings: ['marginTop:margin-top', 'background', 'display'],
  attributeBindings: ['contenteditable'],
  contenteditable: 'true',
  marginTop: 10,
  background: 'white',
  display: 'block',
  wysiwyg: Ember.computed.alias('parentView'),
  updateToolbar: function(e) {
    return this.get('wysiwyg').trigger('update_actions');
  },
  keyUp: function() {
    this.saveSelection();
    return this.updateToolbar(this);
  },
  mouseUp: function() {
    this.saveSelection();
    return this.updateToolbar(this);
  },
  mouseOut: function() {
    this.saveSelection();
    return this.updateToolbar(this);
  },
  getCurrentSelectionRange: function() {
    var sel;
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  },
  saveSelection: function() {
    return this.set('selectionRange', this.getCurrentSelectionRange());
  },
  restoreSelection: function() {
    var e, selection;
    selection = window.getSelection();
    var selectionStr = selection.toString();
    var contentStr = this.$().text();
    if(selectionStr === contentStr) {
      return selection;
    }

    if (this.get('selectionRange')) {
      try {
        selection.removeAllRanges();
      } catch (_error) {
        e = _error;
        document.body.createTextRange().select();
        document.selection.empty();
      }
      return selection.addRange(this.get('selectionRange'));
    }
  },
  markSelection: function(input, color) {
    this.restoreSelection();
    if (document.queryCommandSupported('hiliteColor')) {
      document.execCommand('hiliteColor', 0, color || 'transparent');
    }
    return this.saveSelection();
  },
  register: Ember.on('didInsertElement', function() {
    return this.get('wysiwyg').setEditor(this);
  }),
  unregister: Ember.on('willDestroyElement', function() {
    return this.get('wysiwyg').setEditor(void 0);
  })
});
