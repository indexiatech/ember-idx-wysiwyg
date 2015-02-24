import Em from 'ember';
var computed = Em.computed;
import StyleBindingsMixin from 'ember-idx-utils/mixin/style-bindings';

export default Em.TextArea.extend(StyleBindingsMixin, {
    styleBindings: ['display', 'width', 'border'],
    width: '100%',
    border: 'none;',
    wysiwyg: computed.alias('parentView'),
    value: computed.alias('wysiwyg.as_html'),
    display: 'none',
    registerInParent: (function() {
        this.set('parentView.editor-textarea', this);
    }).on('init')
});
