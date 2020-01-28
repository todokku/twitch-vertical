<template>
  <div>
    <p>Hello world!</p>
    <p>I'm active? {{ isActive }}</p>
    <button @click="toggle">Press me</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      let active = this.isActive;

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { vertical: active });
      });

      chrome.storage.sync.set({ vertical: active });
    },
  },
  created: function() {
    // Watches for changes in the local storage
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      for (var key in changes) {
        var storageChange = changes[key];
        this.isActive = storageChange.newValue;
        console.log('STORAGE ON CHANGE');
        console.log(this.isActive);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
