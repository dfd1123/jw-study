<template>
  <div toast-con class="toast-con">
    <transition-group :name="option.mode || 'bptoast'">
      <toast
        v-for="toast in toasts"
        :key="`toast-${toast.id}`"
        :toast="toast"
        :option="option"
        @close="close"
        :class="['compo', option.mode || '']"
        :style="`--toast-duration:${durationTime}s;`"
      />
    </transition-group>
  </div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import Toast from "./Toast";

const defaultOption = {
  mode: "bptoast",
  delay: 1500,
  duration: 500,
  success: {
    icon: null,
    delay: 2200,
  },
  fail: {
    icon: null,
    delay: 4000,
  },
  error: {
    icon: null,
    delay: 4000,
  },
  enableDuple: false,
};

export default {
  name: "ToastContainer",
  data() {
    return {
      seq: 0,
      toasts: [],
      option: {},
      possibleTypes: ["success", "fail", "error"],
    };
  },
  components: {
    Toast,
  },
  computed: {
    delayTime() {
      return (this.option.delay || 0) / 1000;
    },
    durationTime() {
      return (this.option.duration || 0) / 1000;
    },
  },
  methods: {
    close(id, rightNow = false) {
      this.toasts.find((toast) => toast.id === id).resolve();
      setTimeout(
        () => {
          this.toasts = this.toasts.filter((toast) => toast.id !== id);
        },
        rightNow ? 0 : this.option.delay
      );
    },
    async add(type, message, option) {
      option = {
        ...option,
        delay:
          option.delay ||
          (option[type]
            ? option[type].delay || defaultOption[type].delay
            : defaultOption[type].delay),
      };
      this.option = { ...defaultOption, ...option };

      const isValid = await this.validOption(type, message);
      if (!isValid) {
        return false;
      }

      return new Promise((resolve, reject) => {
        const setToast = _cloneDeep({ id: this.seq++, type, message, resolve });

        this.toasts = [...this.toasts, setToast];

        this.close(setToast.id);
      });
    },
    validOption(type, message) {
      const lastIndex = this.toasts.length - 1;

      if (!this.possibleTypes.includes(type)) {
        throw new Error(
          `This Toast type not exist. For the Toast type, only 'success, fail, and error'.`
        );
      }

      if (
        !this.option.enableDuple &&
        lastIndex >= 0 &&
        this.toasts[lastIndex].type === type
      ) {
        return false;
      }

      return true;
    },
  },
};
</script>

<style>
[toast-con] .compo {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  width: 100%;
  min-height: 40px;
  text-align: center;
  padding: 15px 10px;
  box-sizing: border-box;
  transform: translateY(0%);
  opacity: 1;
}

[toast-con] .bptoast.error {
  -webkit-box-shadow: 0 0 16px 0 rgba(229, 187, 48, 0.58);
  box-shadow: 0 0 16px 0 rgba(229, 187, 48, 0.58);
  border: solid 1px #ffd341;
  background-color: #e9b718;
}

[toast-con] .bptoast.fail {
  -webkit-box-shadow: 0 0 16px 0 rgba(229, 187, 48, 0.58);
  box-shadow: 0 0 16px 0 rgba(229, 187, 48, 0.58);
  border: solid 1px #ffd341;
  background-color: #e9b718;
}

[toast-con] .bptoast.success {
  -webkit-box-shadow: 0 0 16px 0 rgba(11, 213, 161, 0.29);
  box-shadow: 0 0 16px 0 rgba(11, 213, 161, 0.29);
  border: solid 1px #34edbd;
  background-color: #0bd5a1;
}

[toast-con] .bptoast:not(:last-child) {
  -webkit-box-shadow: none;
  box-shadow: none;
}

[toast-con] .bptoast-enter-active,
[toast-con] .bptoast-enter {
  animation-duration: var(--toast-duration);
  animation-name: bptoast-in;
}

[toast-con] .bptoast-leave-active,
[toast-con] .bptoast-leave-to,
[toast-con] .bptoast-leave {
  animation-duration: var(--toast-duration);
  animation-name: bptoast-out;
}

/* [toast-con] .bptoast-enter-active,
[toast-con] .bptoast-leave-active {
  animation-duration: 5s;
  animation-fill-mode: both;
  animation-name: bptoast-in;
}

[toast-con] .bptoast-enter,
[toast-con] .bptoast-leave-to {
  animation-direction: reverse;
} */

@keyframes bptoast-in {
  from {
    opacity: 0;
    transform: translateY(-10%);
  }

  30% {
    transform: translateY(10%);
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}

@keyframes bptoast-out {
  0% {
    opacity: 1;
    transform: translateY(0%);
  }

  100% {
    opacity: 0;
    transform: translateY(-10%);
  }
}
</style>