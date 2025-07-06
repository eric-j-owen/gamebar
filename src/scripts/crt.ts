//selectors
const els = {
  tv: document.querySelector("#crt") as HTMLDivElement,
  screenContent: document.querySelector(".screen-content") as HTMLDivElement,
  channelVid: document.querySelector(
    ".channel-content video"
  ) as HTMLVideoElement,
  powerBtn: document.querySelector(".power-btn") as HTMLButtonElement,
  chDisplay: document.querySelector(".ch-display") as HTMLDivElement,
  volDisplay: document.querySelector(".vol-display") as HTMLDivElement,
  volSlots: document.querySelectorAll(".vol-slot") as NodeListOf<Element>,
  chUp: document.querySelector(".channel-btns .up") as HTMLButtonElement,
  chDown: document.querySelector(".channel-btns .down") as HTMLButtonElement,
  volUp: document.querySelector(".volume-btns .up") as HTMLButtonElement,
  volDown: document.querySelector(".volume-btns .down") as HTMLButtonElement,
};
for (const [key, el] of Object.entries(els)) {
  if (!el) throw Error(`missing ${key}`);
}

//consts
const TIMEOUT_DUR = 4000;
const MAX_VOL = 10;
const MIN_VOL = 1;
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
let isTvOn = els.tv.getAttribute("data-power") === "on";
let channelIdx = 0;
let currVol = 5;
// for resetting timeouts on channel+volume concurrent button clicks
let channelTimeout: number;
let volTimeout: number;

//audio samples
const sfx = {
  clickOn: new Audio("assets/audio/tv-on.mp3"),
  clickOff: new Audio("assets/audio/tv-off.mp3"),
  tvHum: new Audio("assets/audio/tv-hum.mp3"),
  static: new Audio("assets/audio/tv-static.mp3"),
  powerOff: new Audio("assets/audio/tv-power-off.mp3"),
};

const btnSfx = {
  click1: new Audio("assets/audio/button-clicks/button-click-1.mp3"),
  click2: new Audio("assets/audio/button-clicks/button-click-2.mp3"),
  click3: new Audio("assets/audio/button-clicks/button-click-3.mp3"),
  click4: new Audio("assets/audio/button-clicks/button-click-4.mp3"),
};
const sfxArray = Object.values(sfx);
const clicksArray = Object.values(btnSfx);

//event listeners
els.powerBtn.addEventListener("click", togglePower);
els.chUp.addEventListener("click", changeChannel);
els.chDown.addEventListener("click", changeChannel);
els.volUp.addEventListener("click", changeVolume);
els.volDown.addEventListener("click", changeVolume);

//functions
function stopAudio(...audio: HTMLAudioElement[]) {
  for (const clip of audio) {
    clip.pause();
    clip.currentTime = 0;
  }
}

//ensures a random button click sfx is used each time

function playButtonClick() {
  const randomIdx = Math.floor(Math.random() * clicksArray.length);
  clicksArray[randomIdx]?.play();
}

function togglePower() {
  //turn tv off
  if (isTvOn) {
    stopAudio(...sfxArray);
    sfx.clickOff.play();
    sfx.powerOff.play();
    els.tv.setAttribute("data-power", "off");
  }

  //turn tv on
  else {
    stopAudio(sfx.clickOff);
    sfx.clickOn.play();
    sfx.static.play();
    sfx.tvHum.play();
    sfx.tvHum.loop = true;

    els.tv.setAttribute("data-power", "on");
    displayChannel(channelIdx);
  }

  isTvOn = !isTvOn;
}

function changeChannel(e: MouseEvent) {
  if (!isTvOn) return;
  const target = e.target as HTMLButtonElement;

  // update channel index depending on button clicked
  let direction = target.classList.contains("up") ? 1 : -1;
  channelIdx += direction;
  if (channelIdx > CHANNELS.length - 1) {
    channelIdx = 0;
  } else if (channelIdx < 0) {
    channelIdx = CHANNELS.length - 1;
  }

  stopAudio(...clicksArray, sfx.static);
  playButtonClick();
  sfx.static.play();
  sfx.static.loop = true;
  displayChannel(channelIdx);
}

function displayChannel(i: number) {
  if (channelTimeout) {
    clearTimeout(channelTimeout);
  }
  els.chDisplay.hidden = false;
  els.chDisplay!.textContent = `CH-${CHANNELS[i]?.ch}`;

  channelTimeout = setTimeout(() => {
    els.chDisplay!.hidden = true;
  }, TIMEOUT_DUR);
}

function changeVolume(e: MouseEvent) {
  if (!isTvOn) return;
  const target = e.target as HTMLButtonElement;
  let direction = target.classList.contains("up") ? 1 : -1;

  currVol += direction;
  if (currVol > MAX_VOL) {
    currVol = MAX_VOL;
  } else if (currVol < MIN_VOL) {
    currVol = MIN_VOL;
  }
  stopAudio(...clicksArray);
  displayVolume(currVol);
  playButtonClick();
}

function displayVolume(currVol: number) {
  if (volTimeout) clearTimeout(volTimeout);

  els.volDisplay.hidden = false;

  // displays volume bars in slots that have an index less than the current volume
  els.volSlots.forEach((slot, i) => {
    slot.classList.toggle("on", i < currVol);
  });

  volTimeout = setTimeout(() => {
    els.volDisplay.hidden = true;
  }, TIMEOUT_DUR);
}
