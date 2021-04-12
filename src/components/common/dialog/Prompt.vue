<template>
  <div prompt class="dialog-holder">
    <div class="context">
      <div v-if="prompt.title" class="title">
        <h5>{{ prompt.title }}</h5>
      </div>
      <div class="message">
        <p v-html="prompt.message" />
        <div class="prompt-inp">
          <input
            ref="promptInput"
            type="text"
            v-model="prompt.submitText"
            @keyup.enter="clickButton(prompt.submitText)"
            @keyup.esc="clickButton(false)"
          />
        </div>
      </div>
    </div>
    <div class="btns">
      <button
        v-if="prompt.button.no"
        type="button"
        class="btn-no"
        @click.stop="clickButton(prompt.button.no.value)"
      >
        {{ prompt.button.no.text }}
      </button>
      <button
        v-if="prompt.button.yes"
        type="button"
        class="btn-yes"
        @click.stop="clickButton(prompt.submitText)"
      >
        {{ prompt.button.yes.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Prompt",
  data() {
    return {
      prompt: {
        title: "",
        message: "",
        submitText: "",
        button: {
          yes: {
            text: "확인",
            value: true,
          },
          no: {
            text: "취소",
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
    this.$refs.promptInput.focus();
  },
  methods: {
    resetState() {
      this.prompt = { ...this.prompt, ...this.option };
    },
    async clickButton(status) {
      this.$emit("resolve", status);
    },
  },
};
</script>

<style>
[prompt] .prompt-inp {
  margin: 15px 0;
}

[prompt] .prompt-inp input[type="text"] {
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
