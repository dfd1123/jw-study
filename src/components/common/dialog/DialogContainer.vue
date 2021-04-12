<template>
  <transition name="md-fade">
    <div v-show="isShow" dialog-wrap class="dialog-wrap">
      <div class="dialog-con">
        <div v-if="component" class="compo-holder">
          <component
            class="compo"
            :is="component"
            :option="option"
            @hook:mounted="backDefense"
            @open="open"
            @close="close"
            @resolve="close"
          />
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
import _cloneDeep from "lodash/cloneDeep";

export default {
  name: "DialogContainer",
  data() {
    return {
      isShow: false,
      component: null,
      option: {},
    };
  },
  methods: {
    open() {
      this.isShow = true;
      document.addEventListener("keydown", this.handleKeyUp, true);
    },
    close(confirm) {
      this.isShow = false;
      this.option = {};

      document.removeEventListener("keydown", this.handleKeyUp);
      this.component.resolve(confirm);

      setTimeout(() => {
        this.component = null;
      }, 1000);
    },
    add(component, option = {}) {
      this.open();

      return new Promise((resolve, reject) => {
        this.component = _cloneDeep({
          ...component,
          resolve,
          reject,
        });
        this.option = { ...this.option, ...option };
      });
    },
    handleKeyUp(e) {
      if (this.component.name === "Prompt") return false;

      if (e.keyCode === 13 || e.keyCode === 27) {
        this.close(e.keyCode === 13 ? true : false);
        e.target.blur();
        e.preventDefault();
      } else {
        return false;
      }
    },
    backDefense() {
      this.$router.beforeEach((to, from, next) => {
        if (this.isShow) {
          next(false);
          return false;
        }

        next();
      });
    },
  },
};
</script>

<style>
[dialog-wrap] {
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

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

[dialog-wrap] .dialog-con {
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  min-width: 200px;
  max-width: 300px;
  margin: 0 auto;
  overflow: hidden;
  animation-duration: 0.21s;
  animation-fill-mode: both;
  animation-name: dialog-zoom;
}

[dialog-wrap] .dialog-con .dialog-holder .context {
  padding: 10px 0;
}

[dialog-wrap] .dialog-con .dialog-holder .title,
[dialog-wrap] .dialog-con .dialog-holder .message {
  margin: 10px 0;
  padding: 0 15px;
}

[dialog-wrap] .dialog-con .dialog-holder .message {
  font-size: 0.9em;
}

[dialog-wrap] .dialog-holder .title h5 {
}

[dialog-wrap] .dialog-holder .btns {
  overflow: hidden;
}

[dialog-wrap] .dialog-holder .btns > button {
  position: relative;
  float: left;
  border: none;
  border-radius: 0;
  padding: 10px 0;
  outline: none;
  cursor: pointer;
}

[dialog-wrap] .dialog-holder .btns > button::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: -1px;
  z-index: 1;
  height: 100%;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.5);
}

[dialog-wrap] .dialog-holder .btns > button:last-child::after {
  display: none;
}

[dialog-wrap] .dialog-holder .btns > button:first-child:nth-last-child(1),
[dialog-wrap]
  .dialog-holder
  .btns
  > button:first-child:nth-last-child(1)
  ~ button {
  width: 100%;
}

[dialog-wrap] .dialog-holder .btns > button:first-child:nth-last-child(2),
[dialog-wrap]
  .dialog-holder
  .btns
  > button:first-child:nth-last-child(2)
  ~ button {
  width: 50%;
}

[dialog-wrap] .dialog-holder .btns .btn-yes {
}

[dialog-wrap] .dialog-holder .btns .btn-no {
}

[dialog-wrap] h1,
[dialog-wrap] h2,
[dialog-wrap] h3,
[dialog-wrap] h4,
[dialog-wrap] h5,
[dialog-wrap] h6,
[dialog-wrap] p {
  margin: 0;
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

@keyframes dialog-zoom {
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
