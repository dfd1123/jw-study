<template>
  <div sample-modal>
    모달 페이지
    <div>
      <button @click="$emit('close')">취소</button>
      <button @click="$emit('resolve', model)">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SampleModal",
  data() {
    return {
      model: null,
    };
  },
  props: {
    options: { type: Object, default: null },
  },
  mounted() {},
  methods: {},
};
</script>

<style>
[sample-modal] {
  padding: 20px;
  background-color: #fff;
}
</style>
