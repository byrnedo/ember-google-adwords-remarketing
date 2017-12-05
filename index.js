/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-google-adwords-remarketing',
  contentFor: function(type, config) {
    let content='';
    if (type === 'head') {
      let opts = config.googleAdwordsRemarketing;
      if (opts && opts.enabled) {
        let convId = opts.id || 'AW-GOOGLE_CONVERSION_ID';
        let scriptSrc = 'https://www.googletagmanager.com/gtag/js?id=' + convId;
        content = '<script async src="'+scriptSrc+'"></script>\n';
      }
    }

    return content;
  }
};
