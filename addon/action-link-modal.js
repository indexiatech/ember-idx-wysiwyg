import Ember from 'ember';

const {
  on,
  Component
} = Ember;

/**
 * ActionGroup component
 *
 * @class ActionGroup
 */

export default Component.extend({
  registerInParent: on('didInsertElement', function() {
    this.set('parentView.model', this);
  })
});
