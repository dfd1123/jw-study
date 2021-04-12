<template>
  <div class="test-page">
    <h2>모달 테스트 페이지</h2>
    <div class="test-btns">
      <button v-bpripple="{ duration: 500 }" @click="modal">모달 테스트</button>
    </div>
    <div class="intro">
      <h4>설명</h4>
      <p>
        자주 쓰는 Modal 기능을 컴포넌트로 묶어서 하나의 플러그인으로 Extend를
        하였습니다. 모달이 활성화되고
        <b>뒤로가기를 하면 모달만 닫히고 모달을 열었던 페이지는 그대로 유지</b
        >됩니다.
        <br />
        <br />
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
      <router-link to="/test1">다이얼로그 테스트 ></router-link>
      <router-link to="/test3">토스트 테스트 ></router-link>
    </div>
  </div>
</template>

<script>
import SampleModal from "@/components/common/modal/SampleModal";

export default {
  name: "Test2",
  methods: {
    modal() {
      this.$modal(SampleModal, { transitionMode: "fade" });
    },
  },
};
</script>

<style>
.fefe {
  background-color: #777;
}
</style>
