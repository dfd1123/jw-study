<template>
  <router-view
    v-if="pullRefreshOpt.alive"
    @hook:created="childBeforeCreate"
    @hook:mounted="childMouted(pullRefreshOpt.refreshFnc)"
  />
</template>

<script>
import PullDownRefresh from "./module/pull-down-refresh/pullDownRefresh";

export default {
  name: "PullDownRefresh",
  data() {
    return {
      pullRefreshOpt: {
        alive: true,
        refreshStartTime: null,
        refreshFunc: () => {},
      },
    };
  },
  props: {
    container: {
      type: Object,
      default: null,
    },
  },
  methods: {
    pullRefresh() {
      return new Promise((resolve) => {
        this.routerRerender();

        this.pullRefreshOpt.refreshFnc = () => {
          // 여기서부터 this는 자식 컴포넌트 Obejct를 가르킨다.

          /*
            자식 컴포넌트의 라이프사이클훅을 이용하여 자식컴포넌트의 created가 끝난 시간과 
            mounted가 끝난 시간차를 elapsedTime 이라는 변수에 담아주고 1.5초 보다 
            빠르게 끝났다면 로딩 프로그래스가 최소 1.5초 애니메이션 진행 후 사라집니다.
          */
          let elapsedTime = 0;
          if (this.refreshStartTime) {
            elapsedTime = new Date().getTime() - this.refreshStartTime;
          }

          if (elapsedTime < 1500) {
            setTimeout(resolve, 1500);
            return false;
          }

          resolve();
        };
      });
    },
    routerRerender() {
      // router-view를 v-if 로 없앴다가 10ms 후에 다시 생성 (이유 : 라우트뷰 컴포넌트 재랜더링을 위해)
      this.pullRefreshOpt.alive = false;

      setTimeout(() => {
        this.pullRefreshOpt.alive = true;
      }, 10);
    },
    childMouted(refreshFunc) {
      if (typeof refreshFunc === "function") refreshFunc();
    },
    childBeforeCreate() {
      // 여기서 this는 자식 컴포넌트 Obejct를 가르킨다.
      this.refreshStartTime = new Date().getTime();
    },
  },
  mounted() {
    PullDownRefresh({
      container: this.container || document.querySelector("#app"),
      refresh: this.pullRefresh,
    });
  },
};
</script>

<style>
</style>
