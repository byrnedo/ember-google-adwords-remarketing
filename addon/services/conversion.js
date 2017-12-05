import Ember from 'ember';

window.dataLayer = window.dataLayer || [];

window.gtag = function(){datalayer.push(arguments)};

export default Ember.Service.extend({
  // overridden in app extension
  config: null,
  pending: null,
  init() {
    this._super(...arguments);
    this.set('pending', []);

    let conf = this.get('config.googleAdwordsRemarketing');
    gtag('js', new Date());
    let opts = {};
    if (conf.conversionLinker)  {
      opts.conversion_linker = conf.conversionLinker;
    }

    if (conf.sendPageView) {
      opts.send_page_view = conf.sendPageView;
    }

    window.gtag('config', conf.id, opts);
  },

  setConfig(id, opts) {
    window.gtag('config', id, opts)
  },

  trackEvent(name, sendTo, extraAttrs) {
    let conf = this.get('config.googleAdwordsRemarketing');
    if (conf && conf.enabled) {
      let payload = extraAttrs || {};
      payload.send_to = sendTo;
      window.gtag('event', name, payload)
    }

  },
});
