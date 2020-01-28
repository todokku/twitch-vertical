import Vue from 'vue';
import App from './App';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    isActive: false,
  },
  created: () => {
    chrome.storage.sync.get('vertical', function(obj) {
      this.isActive = obj.vertical;
      console.log(this.isActive);
      console.log(obj);
    });
  },
  render: h => h(App),
});
