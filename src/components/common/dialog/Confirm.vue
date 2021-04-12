<template>
  <div confirm class="dialog-holder">
    <div class="context">
      <div v-if="confirm.title" class="title">
        <h5>{{ confirm.title }}</h5>
      </div>
      <div class="message">
        <p v-html="confirm.message" />
      </div>
    </div>
    <div v-if="confirm.button" class="btns">
      <button
        v-if="confirm.button.no"
        type="button"
        class="btn-no"
        @click.stop="clickButton(confirm.button.no.value)"
      >
        {{ confirm.button.no.text }}
      </button>
      <button
        v-if="confirm.button.yes"
        type="button"
        class="btn-yes"
        @click.stop="clickButton(confirm.button.yes.value)"
        @keypress.up="clickButton(confirm.button.yes.value)"
      >
        {{ confirm.button.yes.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Confirm",
  data() {
    return {
      confirm: {
        title: "",
        message: "",
        button: {
          yes: {
            text: "예",
            value: true,
          },
          no: {
            text: "아니오",
            value: false,
          },
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
    this.resetState();
  },
  methods: {
    resetState() {
      this.confirm = { ...this.confirm, ...this.option };
    },
    async clickButton(status) {
      this.$emit("resolve", status);
    },
  },
};
</script>

<style>
</style>
