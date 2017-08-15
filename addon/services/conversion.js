import Ember from 'ember';

export default Ember.Service.extend({
  // overridden in app extension
  config: null,
  pending: null,
  init(){
    this._super(...arguments);
    this.set('pending', []);
  },
  trackConversion(id, label, customParams = null) {
    let conf = this.get('config.googleAdwordsRemarketing');
    if ( conf && conf.enabled) {
      let payload = {
        google_conversion_id: id,
        google_conversion_label: label,
        google_custom_params: customParams,
        google_remarketing_only: true
      };
      //waiting for script to load
      if (typeof(window.google_trackConversion) === "function") {
        // clear pending
        this._evacuatePending();
        window.google_trackConversion(payload);
      } else {
        this.get('pending').pushObject(payload)
      }
    }
  },
  _evacuatePending(){
    if (this.get('pending.length')) {
      this.get('pending').forEach((p) => {
        window.google_trackConversion(p);
      });
      this.get('pending').clear();
    }
  }
});
