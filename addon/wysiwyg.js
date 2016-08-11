import Ember from 'ember';
import WithConfigMixin from 'ember-idx-utils/mixin/with-config';

/**
 * WYSIWYG component
 *
 * @class Wysiwyg
 */

export default Ember.Component.extend(WithConfigMixin, {
  classNameBindings: ['styleClasses'],
  styleClasses: Ember.computed(function() {
    var _ref;
    return (_ref = this.get('config.wysiwyg.classes')) != null ? _ref.join(" ") : void 0;
  }),

  /**
   * A list of {{#crossLink "Toolbar"}}toolbar{{/crossLink}} instances.
   */
  toolbars: void 0,

  /**
   * The editor view
   */
  editor: void 0,
  initToolbars: Ember.on('init', function() {
    return this.set('toolbars', Ember.ArrayProxy.create({
      content: []
    }));
  }),

  initEditorContent: Ember.observer('editor', function() {
    if (this.get('editor')) {
      return Ember.run.once(this, (function() {
        return this.get('editor').$().html(this.get('as_html'));
      }));
    }
  }),

  /**
   * Add the given `Toolbar` instance.
   */
  addToolbar: function(toolbar) {
    return this.get('toolbars').addObject(toolbar);
  },

  /**
   * Remove the given `Toolbar` instance.
   */
  removeToolbar: function(toolbar) {
    return this.get('toolbars').removeObject(toolbar);
  },

  /**
   * Set the editor instance
   */
  setEditor: function(editor) {
    if (editor && editor.element) {
      editor.element.addEventListener('paste', () => Ember.run.scheduleOnce('afterRender', this, this.asHtmlUpdater));
    }
    return this.set('editor', editor);
  },

  asHtmlUpdater: Ember.on('update_actions', function() {
    return this.set('as_html', this.get('editor').$().html().replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, ''));
  })
});
