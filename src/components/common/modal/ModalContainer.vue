<template>
  <transition :name="'md-' + transitionMode">
    <div modal-container v-if="modals.length">
      <component
        v-for="modal in modals"
        :is="modal.component"
        :options="modal.options"
        :key="modal.id"
        @hook:mounted="childCreated(modal.id)"
        @close="() => resolve(modal.id, true)"
        @resolve="(result) => resolve(modal.id, result)"
        @reject="(result) => reject(modal.id, result)"
      />
    </div>
  </transition>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import Popup from "@/components/common/modal/Popup";

export default {
  name: "ModalContainer",
  components: { Popup },
  data() {
    return {
      seq: 0,
      modals: [],
      transitionMode: "fade",
    };
  },
  methods: {
    add(component, options) {
      if ((this.$route.hash || []).includes("modal")) {
        this.$router.replace(this.$route.path);
      }
      this.$router.push({ hash: "#modal=" + component.name });

      this.transitionMode = options.transitionMode || this.transitionMode;

      return new Promise((resolve, reject) => {
        this.modals = _cloneDeep([
          ...this.modals,
          { id: this.seq++, component, resolve, reject, options },
        ]);
      });
    },
    resolve(id, result) {
      this.modals.find((m) => m.id === id).resolve(result);
      this.close(id);
    },
    reject(id, result) {
      result = result || {};
      this.modals.find((m) => m.id === id).reject(result);
      this.close(id);
    },
    close(id, next = null) {
      this.modals = this.modals.filter((m) => m.id !== id);

      !next ? this.$router.go(-1) : next();
    },
    childCreated(id) {
      this.$router.beforeEach((to, from, next) => {
        if (!Boolean(to.hash)) {
          this.close(id, next);
        }

        next();
      });
    },
  },
};
</script>

<style>
[modal-container] {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/**
  * Transition
  */
.md-fade-enter-active,
.md-fade-leave-active {
  transition: opacity 0.21s;
}

.md-fade-enter,
.md-fade-leave-to {
  opacity: 0;
}

.md-zoom-enter-active,
.md-zoom-leave-active {
  animation-duration: 0.21s;
  animation-fill-mode: both;
  animation-name: md-zoom;
}

.md-zoom-leave-active {
  animation-direction: reverse;
}

@keyframes md-zoom {
  from {
    opacity: 0;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
</style>
