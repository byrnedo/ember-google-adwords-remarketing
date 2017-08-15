# ember-google-adwords-remarketing

Really simple add on for integrating [Adwords Remarketing](https://developers.google.com/adwords-remarketing-tag/asynchronous/) in ember.

This addon exposes a service called `conversion`.

You can use the `trackConversion(id, label, customParams)` function to record conversions.

Example:

```
import Ember from 'ember';

export default Ember.Route.extend({
  conversion: Ember.service.inject(),
  actions: {
    onThingDone(){
    
      this.get('conversion').trackConversion(123123, 'lkjlkjlkj');
      
    }
  }
});
```

If for some reason the google script doesn't download, we queue requests until it does.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-google-adwords-remarketing`
* `npm install`

## Configuration

In `config/environment.js`:

```
module.exports = function(environment) {
  let ENV = {
    ...
    googleAdwordsRemarketing: {
      enabled: true
    },
   ... 
```

