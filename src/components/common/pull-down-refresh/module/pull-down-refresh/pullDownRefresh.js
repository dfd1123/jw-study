/* eslint-disable no-mixed-operators */
/* eslint-disable no-void */
/* eslint-disable no-undef */
import { refreshIcon } from "./styles/refreshIcon";
import ptrAnimatesMaterial from "./styles/animate";
import "./styles/style.css";

(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : (global.pullToRefresh = factory());
})(this, function () {
  function ontouchpan(_ref) {
    var element = _ref.element;
    var onpanstart = _ref.onpanstart;
    var onpanmove = _ref.onpanmove;
    var onpanend = _ref.onpanend;

    var touchId = void 0;
    var startX = void 0;
    var startY = void 0;
    var panstartCalled = void 0;

    function calcMovement(e) {
      var touch = Array.prototype.slice
        .call(e.changedTouches)
        .filter(function (touch) {
          // console.log(touch)
          return touch.identifier === touchId;
        })[0];
      if (!touch) return false;

      // console.log(touch)

      e.deltaX = touch.screenX - startX;
      e.deltaY = touch.screenY - startY;
      return true;
    }

    function touchstart(e) {
      console.log("touchPull");
      var touch = e.changedTouches[0];
      touchId = touch.identifier;
      startX = touch.screenX;
      startY = touch.screenY;
    }

    function touchmove(e) {
      if (calcMovement(e)) {
        if (onpanstart && !panstartCalled) {
          onpanstart(e);
          panstartCalled = true;
        }

        onpanmove(e);
      }
    }

    function touchend(e) {
      if (calcMovement(e)) onpanend(e);
    }

    element.addEventListener("touchstart", touchstart);
    if (onpanmove) element.addEventListener("touchmove", touchmove);
    if (onpanend) element.addEventListener("touchend", touchend);

    return function () {
      element.removeEventListener("touchstart", touchstart);
      if (onpanmove) element.removeEventListener("touchmove", touchmove);
      if (onpanend) element.removeEventListener("touchend", touchend);
    };
  }

  function pullToRefresh(opts) {
    opts = Object.assign(
      {
        scrollable: document.body,
        threshold: 150,
        onStateChange: function onStateChange() {}
      },
      opts
    );

    var _opts = opts;
    var container = _opts.container;
    var scrollable = _opts.scrollable;
    var threshold = _opts.threshold;
    var refresh = _opts.refresh;
    var onStateChange = _opts.onStateChange;
    var animates = _opts.animates || ptrAnimatesMaterial;

    const makeRefreshIconElement = (() => {
      const dom = document.createElement("div");
      dom.classList.add("pull-to-refresh-material__control");
      dom.innerHTML = refreshIcon;

      return dom;
    })();

    container.classList.add("pull-to-refresh-material");
    container.prepend(makeRefreshIconElement);

    var distance = void 0;
    var offset = void 0;
    var state = void 0; // state: pulling, aborting, reached, refreshing, restoring

    function addClass(cls) {
      container.classList.add("pull-to-refresh--" + cls);
    }

    function removeClass(cls) {
      container.classList.remove("pull-to-refresh--" + cls);
    }

    function scrollTop() {
      if (
        !scrollable ||
        [window, document, document.body, document.documentElement].includes(
          scrollable
        )
      ) {
        return document.documentElement.scrollTop || document.body.scrollTop;
      } else {
        return scrollable.scrollTop;
      }
    }

    return ontouchpan({
      element: container,

      onpanmove: function onpanmove(e) {
        // console.log(threshold)
        var d = e.deltaY;

        if (
          container.classList.contains("pulldown-disable") ||
          document.body.classList.contains("pulldown-disable")
        )
          return false;

        if (
          scrollTop() > 0 ||
          (d < 0 && !state) ||
          state in { aborting: 1, refreshing: 1, restoring: 1 }
        )
          return;

        if (e.cancelable) {
          e.preventDefault();
        }

        if (distance == null) {
          offset = d;
          state = "pulling";
          addClass(state);
          onStateChange(state, opts);
        }

        // console.log(d - offset)

        d = d - offset;
        if (d < 0) d = 0;
        distance = d;

        // console.log(state)

        if (
          (d >= threshold && state !== "reached") ||
          (d < threshold && state !== "pulling")
        ) {
          removeClass(state);
          state = state === "reached" ? "pulling" : "reached";
          // console.log(state)
          addClass(state);
          onStateChange(state, opts);
        }

        animates.pulling(d, opts);
      },
      onpanend: function onpanend() {
        if (state == null) return;

        if (state === "pulling") {
          removeClass(state);
          state = "aborting";
          onStateChange(state);
          addClass(state);
          animates.aborting(opts).then(function () {
            removeClass(state);
            distance = state = offset = null;
            onStateChange(state);
          });
        } else if (state === "reached") {
          removeClass(state);
          state = "refreshing";
          addClass(state);
          onStateChange(state, opts);
          animates.refreshing(opts);

          refresh().then(function () {
            removeClass(state);
            state = "restoring";
            addClass(state);
            onStateChange(state);

            animates.restoring(opts).then(function () {
              removeClass(state);
              distance = state = offset = null;
              onStateChange(state);
            });
          });
        }
      }
    });
  }

  return pullToRefresh;
});
