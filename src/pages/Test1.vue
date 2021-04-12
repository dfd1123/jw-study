<template>
  <div class="test-page">
    <h2>다이얼로그 테스트 페이지</h2>
    <div class="test-btns">
      <button class="confirm" @click="confirm" v-bpripple>
        Confirm 테스트
      </button>
      <button class="alert" @click="alert" v-bpripple>Alert 테스트</button>
      <button class="prompt" @click="prompt" v-bpripple>Prompt 테스트</button>
    </div>
    <div class="intro">
      <h4>설명</h4>
      <p>
        자주 쓰는 Dialog 기능을 컴포넌트로 묶어서 하나의 플러그인으로 Extend를
        하였습니다. async await 를 활용하면 다이얼로그들의 결과 값이 올때까지
        기다리며 결과값을 받아서 좀 더 원활하게 서비스를 제공할 수 있게 하였으며
        다이얼로그가 활성화되었을 때 뒤로가기나 페이지 이동이 비활성화 됩니다.
        또한 다이얼로그가 활성화되었을 때 Enter키를 누르면 자동으로 확인/예 가
        click되어 true 나 string 값을 반환합니다. ESC키를 눌렀을때는 false 값이
        반환됩니다.
        <span
          >각 버튼에는 직접 개발한 ripple directive가 적용되어 있습니다</span
        >
        <span
          >모바일 화면으로 전환하시고 화면을 밑으로 끌어내리시면
          새로고침(pull-down-refresh)가 진행됩니다.</span
        >
      </p>
    </div>
    <div class="page-move-btn">
      <router-link to="/test2">모달 테스트 ></router-link>
      <router-link to="/test3">토스트 테스트 ></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test1",
  methods: {
    async confirm() {
      const result = await this.$confirm("당신은 김종완?");
      alert(result);
    },
    async alert() {
      const result = await this.$alert("알러트 성공!!");
      alert(result);
    },
    async prompt() {
      const result = await this.$prompt("당신의 이름을 적어주세요");
      alert(result);
    },
  },
};
</script>

<style>
</style>
