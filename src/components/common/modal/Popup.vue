<template>
  <div popup :class="{ modal }">
    <p class="dim" />
    <div class="popup-holder" :class="{ sticky }">
      <custom-scroll ref="scroll">
        <div class="inside">
          <slot />
        </div>
      </custom-scroll>
    </div>
  </div>
</template>

<script>
import CustomScroll from "@/components/common/CustomScroll";
// import {SCROLL_FREEZE} from '@/store/modules/organizer';

export default {
  name: "Popup",
  components: { CustomScroll },
  props: {
    modal: { type: Boolean, default: false },
  },
  data() {
    return {
      target: null,
      holder: null,
      sticky: false,
      scrollY: 0,
    };
  },
  watch: {},
  computed: {},
  methods: {
    resize() {
      this.sticky = this.holder.clientHeight - this.target.clientHeight < 60;
    },
    positionY(v, t = 300) {
      this.$refs.scroll.positionY(v, t);
    },
  },
  mounted() {
    // this.holder = this.$el.querySelector('.popup-holder');
    // this.target = this.$el.querySelector('.inside');
    // if(this.target) {
    //   window.addEventListener('resize',this.resize);
    //   this.resize();
    // }
    // this.$store.commit(`organizer/${SCROLL_FREEZE}`,true);
  },
  beforeDestroy() {
    // this.$store.commit(`organizer/${SCROLL_FREEZE}`,false);
    // window.removeEventListener('resize',this.resize);
  },
};
</script>

<style>
</style>
