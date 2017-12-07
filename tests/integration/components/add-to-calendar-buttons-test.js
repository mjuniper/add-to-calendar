import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-to-calendar-buttons', 'Integration | Component | add to calendar buttons', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{add-to-calendar-buttons}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#add-to-calendar-buttons}}
      template block text
    {{/add-to-calendar-buttons}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
