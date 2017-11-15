import Ember from 'ember';

export default Ember.Service.extend({
  // overridden in app extension
  config: null,
  pending: null,
  init(){
    this._super(...arguments);
    this.set('pending', []);
  },
  trackConversion(id, label, customParams = null, remarketingOnly = true) {
    let conf = this.get('config.googleAdwordsRemarketing');
    if ( conf && conf.enabled) {
      let payload = {
        google_conversion_id: id,
        google_conversion_label: label,
        google_custom_params: customParams,
        google_remarketing_only: remarketingOnly
      };
      //waiting for script to load
      if (typeof(window.google_trackConversion) === "function") {
        // clear pending
        this._evacuatePending();
        this._send(payload);
      } else {
        this.get('pending').pushObject(payload)
      }
    }
  },
  _send(p){
    window.google_trackConversion(p);
    Ember.Logger.debug('adwordsRemarketing: trackConversion sent');
  },
  _evacuatePending(){
    if (this.get('pending.length')) {
      this.get('pending').forEach((p) => {
        this._send(p);
      });
      this.get('pending').clear();
    }
  }
});
