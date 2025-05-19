const radios = [
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/4/4b/PlaybackFM.JPG", 
    url: "../radios/gtasa/playbackfm.mp3" 
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/f/fa/KRose.JPG", 
    url: "../radios/gtasa/krose.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/c/c4/KDSTLogo.png",
    url: "../radios/gtasa/kdst.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/5/59/BounceFM.JPG", 
    url: "../radios/gtasa/bouncefm.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/f/f1/SF-UR.png",
    url: "../radios/gtasa/sf-ur.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/2/2d/RadioLosSantos.JPG", 
    url: "../radios/gtasa/radiolos.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/2/2e/Radio_X.JPG", 
    url: "../radios/gtasa/radiox.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/b/b3/CSR_103.9.jpg",
    url: "../radios/gtasa/csr.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/b/b9/KJahwest.JPG", 
    url: "../radios/gtasa/kjahwest.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/4/4d/MasterSoundsLogo.png",
    url: "../radios/gtasa/mastersounds.mp3"
  },
  {
    logo: "https://static.wikia.nocookie.net/esgta/images/f/ff/West_Coast_Talk_Radio.jpg",
    url: "../radios/gtasa/wctrc.mp3"
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
