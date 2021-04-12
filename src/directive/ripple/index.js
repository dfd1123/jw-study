import "./ripple.css";

async function rippleHandler(event, option = {}) {
  const target = event.target,
    ripple = document.createElement("bpripple"),
    //brightNess = option.brightNess || 0.5,
    duration =
      (option.duration || 500) / 1000 < 0
        ? 0.5
        : (option.duration || 500) / 1000,
    rect = target.getBoundingClientRect();

  let defaultColor = option.color || "rgb(238,238,238)";

  if (defaultColor.includes("#")) {
    defaultColor = function () {
      /* 맨 앞의 "#" 기호를 삭제하기. */

      const hex = defaultColor.trim().replace("#", "");

      /* rgb로 각각 분리해서 배열에 담기. */

      const rgb =
        hex.length === 3 ? hex.match(/[a-f\d]/gi) : hex.match(/[a-f\d]{2}/gi);

      rgb.forEach((str, x, arr) => {
        /* rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. */

        if (str.length === 1) str = str + str;

        /* 10진수로 변환하기. */

        arr[x] = parseInt(str, 16);
      });

      return "rgb(" + rgb.join(", ") + ")";
    };
  }

  ripple.className = "animate";
  ripple.style.left = `${event.x - rect.left}px`;
  ripple.style.top = `${event.y - rect.top}px`;
  ripple.style.setProperty("--material-scale", target.offsetWidth);
  ripple.style.animation = `materialRipple ${duration}s linear`;
  ripple.style.borderRadius = "50%";
  ripple.style.backgroundColor = getComputedStyle(target).backgroundColor;

  target.prepend(ripple);
  setTimeout(() => {
    ripple.parentNode.removeChild(ripple);
  }, duration * 1000);
}

export default {
  bind(el, binding) {
    const option = binding.value;
    el.classList.add("material-ripple");

    el.addEventListener("click", (e) => rippleHandler(e, option), {
      capture: false
    });
  },
  unbind(el) {
    el.removeEventListener("click", (e) => rippleHandler(e, {}), {
      capture: false
    });
  }
};
