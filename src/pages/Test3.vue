<template>
  <div class="test-page">
    <h2>Toast 테스트 페이지</h2>
    <div class="test-btns">
      <button v-bpripple="{ duration: 500 }" @click="toastSuccess">
        Success 테스트
      </button>
      <button v-bpripple="{ duration: 500 }" @click="toastFail">
        Fail 테스트
      </button>
      <button v-bpripple="{ duration: 500 }" @click="toastError">
        Error 테스트
      </button>
    </div>
    <div class="intro">
      <h4>설명</h4>
      <p>
        자주 쓰는 Toast 기능을 컴포넌트로 묶어서 하나의 플러그인으로 Extend를
        하였습니다. 기본적으로 1.5초 동안 유지되며 1.5초 뒤에는 사라집니다.
        toast 사용법은 this.$toast([string]:'success' or 'fail' or
        'error':required, [stinrg]:'message':required) 입니다.

        <br />
        <br />
        ex) this.$toast('success', '토스트 성공!')
        <br />
        <br />
        toast 기능에서 toast의 delay 시간이나 duration 시간, 커스텀 icon, 같은
        타입의 toast를 중복으로 표시할지를 설정하는 enableDuple, toast mode와
        같은 설정을 바꾸시고 싶으시다면 main.js에서 dialogNmodal 플러그인을 use
        하실때 option을 부여할 수 있습니다. (기본값 : { delay: 1500, duration:
        300, enableDuple: false, mode: 'bptoast', success: { icon: null, delay:
        2200 }, fail: { icon: null, delay: 4000 }, error: { icon: null, delay:
        4000 } })
        <br />
        <br />
        ex) // in main.js
        <br />
        <br />
        import dialogNmodal from "./plugins/dialogNmodal"; <br />
        Vue.use(dialogNmodal, { toast: { delay: 3000, duration: 2000,
        enableDuple: false, mode: 'bptoast', success: { icon:
        '/icon-success.svg', delay: 2200 }, fail: { icon: '/icon-fail.svg',
        delay: 4000 }, error: { icon: '/icon-error.svg', delay: 4000 } } });
        <br />
        <br />
        만약 특정 toast에만 따로 옵션을 주고 싶으시다면 $toast() 메소드 3번째
        인자로 옵션을 전달하시면 됩니다.

        <br />
        <br />
        ex) this.$toast('success', '토스트 성공!', { delay: 3000, duration: 2000
        })
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
      <router-link to="/test2">모달 테스트 ></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test3",
  methods: {
    toastSuccess() {
      this.$toast("success", "토스트 성공입니다.", { delay: 10000 });
    },
    toastFail() {
      this.$toast("fail", "토스트 에러입니다.");
    },
    toastError() {
      this.$toast("error", "토스트 경고입니다.");
    },
  },
};
</script>

<style>
.fefe {
  background-color: #777;
}
</style>
