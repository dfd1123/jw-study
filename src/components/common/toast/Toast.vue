<template>
  <div
    toast
    :class="['tm-com', toast.type, option.mode + '-toast']"
    @click="$emit('close', toast.id, true)"
  >
    <span :style="icon ? `background-image:url(${icon})` : ''">{{
      toast.message
    }}</span>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      icon: null,
    };
  },
  props: {
    toast: {
      type: Object,
      default: () => ({}),
    },
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    this.icon = this.option[this.toast.type]
      ? this.option[this.toast.type].icon || null
      : null;
  },
};
</script>

<style>
[toast].bptoast-toast span {
  display: inline-block;
  vertical-align: middle;
  width: auto;
  padding: 3px 0;
  padding-left: 30px;
}

[toast].bptoast-toast.error span {
  background-image: url("/images/img/icon-warning.svg");
  background-repeat: no-repeat;
  background-position: left 1px;
  background-size: 20px 20px;
}

[toast].bptoast-toast.fail span {
  background-image: url("/images/img/icon-warning.svg");
  background-repeat: no-repeat;
  background-position: left 1px;
  background-size: 20px 20px;
}

[toast].bptoast-toast.success span {
  background-image: url("/images/img/icon-success.svg");
  background-repeat: no-repeat;
  background-position: left 1px;
  background-size: 20px 20px;
}
</style>