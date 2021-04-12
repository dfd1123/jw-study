<template>
  <vue-scroll
    custom-scroll
    :ops="defaultOption"
    @handle-scroll="scrollHandler"
    ref="scroller"
  >
    <slot />
  </vue-scroll>
</template>

<script>
export default {
  name: "CustomScroll",
  props: {
    option: { type: Object, default: null },
    scrollHandler: { type: Function, default: () => {} },
  },
  data() {
    return {
      scrollOption: null,
      defaultOption: {
        bar: {
          size: "4px",
          gutterOfSide: "10px",
          background: "#EBEBF0",
        },
        scrollPanel: {
          scrollingX: false,
          easing: "easeOutCubic",
        },
      },
    };
  },
  methods: {
    positionY(v, t) {
      this.$refs.scroller.scrollTo(
        {
          y: v,
        },
        t,
        "easeInQuad"
      );
    },
  },
  mounted() {
    this.scrollOption = this.option ? this.option : this.defaultOption;
  },
};
</script>

<style>
</style>
