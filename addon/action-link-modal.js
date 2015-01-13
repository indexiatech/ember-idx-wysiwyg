import Em from 'ember';

/**
 * ActionGroup component
 *
 * @class ActionGroup
 */

export default Em.Component.extend({
  registerInParent: (function() {
    this.set('parentView.model', this);
  }).on('didInsertElement')
});