//consts
const CHANNELS = {
  3: {
    video: "",
    audio: "",
  },
  4: {
    video: "",
    audio: "",
  },
  5: {
    video: "",
    audio: "",
  },
};

//selectors
const tv = document.querySelector("#crt") as HTMLDivElement;

const powerBtn = document.querySelector(".power-btn") as HTMLButtonElement;

//event listeners
powerBtn.addEventListener("click", togglePower);

//functions
function togglePower() {
  const powerStatus = tv.getAttribute("data-power");
  if (powerStatus === "on") {
    tv.setAttribute("data-power", "off");
  } else {
    tv.setAttribute("data-power", "on");
  }
}
