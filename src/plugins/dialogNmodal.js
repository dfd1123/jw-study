import DialogContainer from "@/components/common/dialog/DialogContainer";
import ModalContainer from "@/components/common/modal/ModalContainer";
import ToastContainer from "@/components/common/toast/ToastContainer";
import Confirm from "@/components/common/dialog/Confirm";
import Alert from "@/components/common/dialog/Alert";
import Prompt from "@/components/common/dialog/Prompt";

export default {
  install(Vue, pluginOptions) {
    const getContainer = (c, type = "modal") => {
      let mdHolder = c;

      const mdContainer = Vue.extend(
        type === "dialog"
          ? DialogContainer
          : type === "toast"
          ? ToastContainer
          : ModalContainer
      );

      while (mdHolder.$parent) {
        if (!mdHolder.$parent) break;
        mdHolder = mdHolder.$parent;
      }

      if (!mdHolder[`_${type}Container)`]) {
        mdHolder[`_${type}Container)`] = new mdContainer({
          parent: mdHolder
        });
        mdHolder[`_${type}Container)`].$mount();
        mdHolder.$el.appendChild(mdHolder[`_${type}Container)`].$el);
      }

      document.body.classList.add("pulldown-disable");
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return mdHolder[`_${type}Container)`];
    };

    const validation = (params) => {
      if (
        (typeof params !== "object" && typeof params !== "string") ||
        Array.isArray(params)
      ) {
        let caughtType = typeof params;
        if (Array.isArray(params)) caughtType = "array";

        throw new Error(
          `Options type must be an object. Caught: ${caughtType}. Expected: object`
        );
      } else if (typeof params === "string") {
        return {
          message: params
        };
      }

      return params;
    };

    const callBackFunc = (result) => {
      document.body.classList.remove("pulldown-disable");
      document.body.style.overflow = null;
      document.body.style.touchAction = null;
      return result;
    };

    const handlingDialog = async (params, occurComponent, createComponent) => {
      params = validation(params);

      if (typeof params === "object") {
        return await getContainer(occurComponent, "dialog")
          .add(createComponent, params)
          .then(callBackFunc);
      }
    };

    Vue.prototype.$confirm = async function (params) {
      return await handlingDialog(params, this, Confirm);
    };

    Vue.prototype.$alert = async function (params) {
      return await handlingDialog(params, this, Alert);
    };

    Vue.prototype.$prompt = async function (params) {
      return await handlingDialog(params, this, Prompt);
    };

    Vue.prototype.$modal = function (component, options) {
      return getContainer(this).add(component, options).then(callBackFunc);
    };

    Vue.prototype.$toast = function (type, message, individualOpt = {}) {
      const option = pluginOptions
        ? pluginOptions.toast || individualOpt
        : individualOpt;
      return getContainer(this, "toast")
        .add(type, message, option)
        .then(callBackFunc);
    };
  }
};
