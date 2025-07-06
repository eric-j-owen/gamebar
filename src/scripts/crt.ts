//selectors
const tv = document.querySelector("#crt") as HTMLDivElement;
const screenContent = document.querySelector(".screen-content");
const channelDisplay = document.querySelector(".curr-ch");

const powerBtn = document.querySelector(".power-btn") as HTMLButtonElement;
const chUp = document.querySelector(".channel-btns .up") as HTMLButtonElement;
const chDown = document.querySelector(
  ".channel-btns .down"
) as HTMLButtonElement;

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
let currCh = CHANNELS[0]!.ch;
let currAudioPlaying: HTMLAudioElement[] = [];

//audio samples
const sfx = {
  clickOn: new Audio("assets/audio/tv-on.mp3"),
  clickOff: new Audio("assets/audio/tv-off.mp3"),
  tvHum: new Audio("assets/audio/tv-hum.mp3"),
  changeCh: new Audio("assets/audio/change-ch.mp3"),
};

const btnSfx = {
  click1: new Audio("assets/audio/button-clicks/button-click-1.mp3"),
  click2: new Audio("assets/audio/button-clicks/button-click-2.mp3"),
  click3: new Audio("assets/audio/button-clicks/button-click-3.mp3"),
  click4: new Audio("assets/audio/button-clicks/button-click-4.mp3"),
  click5: new Audio("assets/audio/button-clicks/button-click-5.mp3"),
  click6: new Audio("assets/audio/button-clicks/button-click-6.mp3"),
  click7: new Audio("assets/audio/button-clicks/button-click-7.mp3"),
  click8: new Audio("assets/audio/button-clicks/button-click-8.mp3"),
  click9: new Audio("assets/audio/button-clicks/button-click-9.mp3"),
  click10: new Audio("assets/audio/button-clicks/button-click-10.mp3"),
  click11: new Audio("assets/audio/button-clicks/button-click-11.mp3"),
};
const sfxArray = Object.values(sfx);
const clicksArray = Object.values(btnSfx);

//event listeners
powerBtn.addEventListener("click", togglePower);
chUp.addEventListener("click", changeChannel);
chDown.addEventListener("click", changeChannel);

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
    stopAudio(...Object.values(sfx));
    sfx.clickOff.play();
  }

  //turn tv on
  else {
    tv.setAttribute("data-power", "on");
    stopAudio(sfx.clickOff);
    sfx.clickOn.play();
    sfx.tvHum.play();
    sfx.tvHum.loop = true;
  }

  isTvOn = !isTvOn;
}

function changeChannel(e: MouseEvent) {
  if (!isTvOn) return;
  const target = e.target as HTMLButtonElement;
  let direction;

  if (target.classList.contains("up")) {
    direction = 1;
  } else {
    direction = -1;
  }

  console.log(direction);
  //play channel changing sound
  playButtonClick();
  //update and display channel number
  if (channelDisplay) {
    channelDisplay.textContent = `CH-${currCh}`;
  }

  //update channel content
}

//ensures a random button click sfx is used each time
function playButtonClick() {
  stopAudio(...clicksArray);
  const randomIdx = Math.floor(Math.random() * clicksArray.length);
  clicksArray[randomIdx]?.play();
}
