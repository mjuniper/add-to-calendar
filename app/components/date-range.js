import Ember from 'ember';

export default Ember.Component.extend({

  startDate: Ember.computed('model.attributes.startDate', function () {
    return new Date(this.get('model.attributes.startDate'))
    .toISOString()
    .replace(/T/, ' ')
    .replace(/:00.000Z/, '');
  }),

  endDate: Ember.computed('model.attributes.endDate', function () {
    return new Date(this.get('model.attributes.endDate'))
    .toISOString()
    .replace(/T/, ' ')
    .replace(/:00.000Z/, '');
  }),

});
