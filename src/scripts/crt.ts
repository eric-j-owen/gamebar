//selectors
const tv = document.querySelector("#crt") as HTMLDivElement;
const screenContent = document.querySelector(".screen-content");
const channelDisplay = document.querySelector(".curr-ch");

const powerBtn = document.querySelector(".power-btn") as HTMLButtonElement;
const chUp = document.querySelector(".channel-btns .up") as HTMLButtonElement;
const chDown = document.querySelector(".channel-btns .down");

//consts
const CHANNELS = [
  { ch: 3, content: "" },
  {
    ch: 4,
    content:
      "https://res.cloudinary.com/dpafg3gpo/video/upload/v1751748091/gxr3mmt7ta98ec7xbmdi.webm",
  },
  {
    ch: 5,
    content:
      "https://res.cloudinary.com/dpafg3gpo/video/upload/v1751748064/m3kaq9tizlqhmukcbbeq.webm",
  },
];

// state
let isTvOn = tv.getAttribute("data-power") === "on";

//audio samples
const clickOn = new Audio("assets/audio/tv-on.mp3");
const clickOff = new Audio("assets/audio/tv-off.mp3");
const tvHum = new Audio("assets/audio/tv-hum.mp3");
// still need: channel change sound, general button click sound, static sound

//event listeners
powerBtn.addEventListener("click", togglePower);
chUp.addEventListener("click", changeChannel);

//functions
function stopAudio(...audio: HTMLAudioElement[]) {
  for (const clip of audio) {
    clip.pause();
    clip.currentTime = 0;
  }
}

function togglePower() {
  //turn tv off
  if (isTvOn) {
    tv.setAttribute("data-power", "off");
    stopAudio(clickOn, tvHum);
    clickOff.play();
  }

  //turn tv on
  else {
    tv.setAttribute("data-power", "on");
    stopAudio(clickOff);
    clickOn.play();
    tvHum.play();
    tvHum.loop = true;
  }

  isTvOn = !isTvOn;
}

function changeChannel() {
  if (!isTvOn) return;
  console.log("testing");

  //play channel changing sound

  //update channel number

  //update channel content
}
