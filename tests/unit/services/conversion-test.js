import { moduleFor, test } from 'ember-qunit';

moduleFor('service:conversion', 'Unit | Service | conversion', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let config = {
    googleAdwordsRemarketing:{id: 'test', enabled: false}
  };

  let service = this.subject({config});

  service.trackEvent('conversion', 'AW-123123', {value: 100});

  service.gtag({foo: "bar"});
  service.getDataLayer().push({foo1: "bar1"});
  assert.ok(service);

});
