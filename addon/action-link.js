import Em from 'ember';
import WithConfigMixin from 'ember-idx-utils/mixin/with-config';
import Modal from 'ember-idx-modal/modal';
var computed = Em.computed;

export default Em.Component.extend(WithConfigMixin, {
  tagName: 'a',
  classNameBindings: ['styleClasses', 'activeClasses'],
  linkHref: '',
  initModal: (function() {
    var container = this.get('container');
    container.register('view:em-wysiwyg-action-link-modal', Modal.extend({
      layoutName: 'components/em-wysiwyg-action-link-modal',
      configName: 'bs',
      _parentView: this,
      linkHref: computed.alias('parentView.linkHref'),
      actions: {
        addLink: function() {
          this.get('parentView').send('addLink');
        }
      }
    }));
    this.set('modal', container.lookup('view:em-wysiwyg-action-link-modal'));
    return this.get('modal').append();
  }).on('init'),
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
  actions: {
    addLink: function() {
      this.get('editor').restoreSelection();
      this.get('editor').$().focus();
      if (this.get('linkHref')) {
        document.execCommand('CreateLink', 0, this.get('linkHref'));
      } else {
        document.execCommand('unlink', 0);
      }
      this.get('editor').saveSelection();
      this.get('wysiwyg').trigger('update_actions');
      return this.get('modal').close();
    }
  },
  click: function() {
    return this.get('modal').open();
  },
  wysiwyg: computed.alias('parentView.wysiwyg'),
  editor: computed.alias('wysiwyg.editor'),
  listenToUpdate: (function() {
    return this.get('wysiwyg').on('update_actions', (function(_this) {
      return function() {
        var container;
        container = _this.get('editor.selectionRange').commonAncestorContainer;
        if (container.nodeType === 3) {
          container = container.parentNode;
        }
        if (container.nodeName === "A") {
          _this.set('linkHref', Em.$(container).attr('href'));
          return _this.set('active', true);
        } else {
          _this.set('linkHref', '');
          return _this.set('active', false);
        }
      };
    })(this));
  }).on('init')
});