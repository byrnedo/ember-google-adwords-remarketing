import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  pending: null,
  init(){
    this._super(...arguments);
    this.set('pending', []);
  },
  trackConversion(id, label, customParams = null) {
    if (config.googleAdwordsRemarketing && config.googleAdwordsRemarketing.enabled) {
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
