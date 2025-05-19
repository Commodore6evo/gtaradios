const radios = [
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/4/4b/PlaybackFM.JPG", 
    url: "../../radios/gtasaplaybackfm.mp3" 
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/f/fa/KRose.JPG", 
    url: "../../radios/gtasakrose.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/c/c4/KDSTLogo.png",
    url: "../../radios/gtasakdst.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/5/59/BounceFM.JPG", 
    url: "../../radios/gtasabouncefm.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/f/f1/SF-UR.png",
    url: "../../radios/gtasasf-ur.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/2/2d/RadioLosSantos.JPG", 
    url: "../../radios/gtasaradiolos.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/2/2e/Radio_X.JPG", 
    url: "../../radios/gtasaradiox.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/b/b3/CSR_103.9.jpg",
    url: "../../radios/gtasacsr.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/b/b9/KJahwest.JPG", 
    url: "../../radios/gtasakjahwest.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/4/4d/MasterSoundsLogo.png",
    url: "../../radios/gtasamastersounds.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/f/ff/West_Coast_Talk_Radio.jpg",
    url: "../../radios/gtasawctrc.mp3"
  }
];

const audio = document.getElementById("radioPlayer");
const logoImg = document.getElementById("radioLogo");
let currentRadio = 0;
let interacted = false;
const appStartTime = Date.now();

const randomOffsets = radios.map(() => Math.floor(Math.random() * 600));

function ensurePlay() {
  if (!interacted) {
    interacted = true;
    playCurrentRadio();
  }
}

function getCurrentOffset(index) {
  const elapsed = Math.floor((Date.now() - appStartTime) / 1000);
  return (randomOffsets[index] + elapsed) % 7200;
}

function playCurrentRadio() {
  const radio = radios[currentRadio];
  logoImg.src = radio.logo;
  audio.src = radio.url;
  audio.load();

  audio.addEventListener("loadedmetadata", () => {
    const time = getCurrentOffset(currentRadio);
    if (time < audio.duration) {
      audio.currentTime = time;
    }
    audio.play().catch(() => {});
  }, { once: true });
}

function nextRadio() {
  ensurePlay();
  currentRadio = (currentRadio + 1) % radios.length;
  playCurrentRadio();
}

function prevRadio() {
  ensurePlay();
  currentRadio = (currentRadio - 1 + radios.length) % radios.length;
  playCurrentRadio();
}

logoImg.src = radios[currentRadio].logo;
