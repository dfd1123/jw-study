import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const useComponent = (component) => () => import(`../pages/${component}.vue`);

export const routes = [
  {
    path: "/",
    redirect: "/test1"
  },
  {
    path: "/test1",
    component: useComponent("Test1")
  },
  {
    path: "/test2",
    component: useComponent("Test2")
  },
  {
    path: "/test3",
    component: useComponent("Test3")
  }
];

export const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
