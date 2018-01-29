import Ember from 'ember';

window.dataLayer = window.dataLayer || [];

window.gtag = window.gtag || function () {
  window.dataLayer.push(arguments)
};

export default Ember.Service.extend({
  // overridden in app extension
  config: null,
  pending: null,
  init() {
    this._super(...arguments);
    this.set('pending', []);

    Ember.assert('Must set `googleAdwordsRemarketing` object in config/environment.js', Ember.get(this, 'config.googleAdwordsRemarketing'));

    let conf = Ember.get(this, 'config.googleAdwordsRemarketing');
    window.gtag('js', new Date());
    let opts = {};
    if (conf.conversionLinker) {
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

  getDataLayer() {
    return window.dataLayer;
  },

  gtag(){
    window.gtag(...arguments);
  },

  trackEvent(name, extraAttrs, sendTo) {
    let payload = extraAttrs || {};
    if (sendTo) {
      payload.send_to = sendTo;
    }
    window.gtag('event', name, payload)
  },
});
