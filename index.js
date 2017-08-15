/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-google-adwords-remarketing'
};
module.exports = {
  name: 'google-adwords-remarketing',
  contentFor: function(type, config) {
    let content='';
    if (type === 'head') {
        let opts = config.googleAdwordsRemarketing;
		if (opts && opts.enabled) {
			var scriptSrc = "//www.googleadservices.com/pagead/conversion_async.js";
			content = '<script type="text/javascript" src="'+scriptSrc+'"></script>';
		}
    }

    return content;
  }
};
