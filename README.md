# ember-google-adwords-remarketing

Really simple add on for integrating [Adwords Remarketing](https://developers.google.com/adwords-remarketing-tag/asynchronous/) in ember.

This addon exposes a service called `conversion`.

You can use the `trackEvent` function to record conversions.

NOTE: this is using the new `gtag` script from google. See [Changes to the Website Conversion Tracker Tag](https://support.google.com/adwords/answer/7548399?hl=en).

Example:

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  conversion: Ember.inject.service(),
  actions: {
    onThingDone(){
    
      this.get('conversion').trackEvent('conversion', 'AW-123456', {value: 100});
      
    }
  }
});
```

Methods:

`trackEvent` equates to `gtag('event'...)`
`setConfig` equates to `gtag('config'...)`

If for some reason the google script doesn't download, we queue requests until it does.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-google-adwords-remarketing`
* `npm install`

## Configuration

In `config/environment.js`:

```javascript
module.exports = function(environment) {
  let ENV = {
    ...
    googleAdwordsRemarketing: {
      enabled: true // required
      id: 'AW-123456', // required
      conversionLinker: false, // optional
      sendPageView: true // optional
    },
   ... 
```

