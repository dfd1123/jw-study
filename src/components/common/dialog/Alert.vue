<template>
  <div alert class="dialog-holder">
    <div class="context">
      <div v-if="alert.title" class="title">
        <h5>{{ alert.title }}</h5>
      </div>
      <div class="message">
        <p v-html="alert.message" />
      </div>
    </div>
    <div class="btns">
      <button v-if="alert.button" type="button" @click.stop="clickButton(true)">
        {{ alert.button.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  data() {
    return {
      alert: {
        title: "",
        message: "",
        button: {
          text: "확인",
        },
      },
    };
  },
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log("awdawdawd");
    this.resetState();
  },
  methods: {
    resetState() {
      this.alert = { ...this.alert, ...this.option };
    },
    async clickButton(status) {
      this.$emit("resolve", status);
    },
  },
};
</script>

<style>
[alert] {
}
</style>
