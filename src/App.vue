<template>
  <div id="app">
    <pull-down-refresh>
      <router-view />
    </pull-down-refresh>
  </div>
</template>

<script>
import PullDownRefresh from "./components/common/pull-down-refresh/PullDownRefresh";

export default {
  name: "App",
  components: {
    PullDownRefresh,
  },
  data: () => {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>
