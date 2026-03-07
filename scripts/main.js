const radios = [
  { name: "Playback FM", logo: "https://static.wikia.nocookie.net/esgta/images/4/4b/PlaybackFM.JPG", url: "./radios/gtasa/playbackfm.mp3" },
  { name: "K-Rose", logo: "https://static.wikia.nocookie.net/esgta/images/f/fa/KRose.JPG", url: "./radios/gtasa/krose.mp3" },
  { name: "K-DST", logo: "https://static.wikia.nocookie.net/esgta/images/c/c4/KDSTLogo.png", url: "./radios/gtasa/kdst.mp3" },
  { name: "Bounce FM", logo: "https://static.wikia.nocookie.net/esgta/images/5/59/BounceFM.JPG", url: "./radios/gtasa/bouncefm.mp3" },
  { name: "SF-UR", logo: "https://static.wikia.nocookie.net/esgta/images/f/f1/SF-UR.png", url: "./radios/gtasa/sf-ur.mp3" },
  { name: "Radio Los Santos", logo: "https://static.wikia.nocookie.net/esgta/images/2/2d/RadioLosSantos.JPG", url: "./radios/gtasa/radiolos.mp3" },
  { name: "Radio X", logo: "https://static.wikia.nocookie.net/esgta/images/2/2e/Radio_X.JPG", url: "./radios/gtasa/radiox.mp3" },
  { name: "CSR 103.9", logo: "https://static.wikia.nocookie.net/esgta/images/b/b3/CSR_103.9.jpg", url: "./radios/gtasa/csr.mp3" },
  { name: "K-JAH West", logo: "https://static.wikia.nocookie.net/esgta/images/b/b9/KJahwest.JPG", url: "./radios/gtasa/kjahwest.mp3" },
  { name: "Master Sounds", logo: "https://static.wikia.nocookie.net/esgta/images/4/4d/MasterSoundsLogo.png", url: "./radios/gtasa/mastersounds.mp3" },
  { name: "WCTR", logo: "https://static.wikia.nocookie.net/esgta/images/f/ff/West_Coast_Talk_Radio.jpg", url: "./radios/gtasa/wctrc.mp3" }
];

const backgrounds = [
  "./radios/gtasa/background/back1-BYEIqH3u.png",
  "./radios/gtasa/background/back2-D1qvQaWC.png",
  "./radios/gtasa/background/back3-8h7Bkk0i.png",
  "./radios/gtasa/background/back4-BhW1GdW7.png",
  "./radios/gtasa/background/back5-DFZeDuEC.png",
  "./radios/gtasa/background/back6-Dd7gb3_J.png",
  "./radios/gtasa/background/back7-KCN0W2Pm.png"
];

const audio = document.getElementById("radioPlayer");
const radioNameText = document.getElementById("radioName");
const gallery = document.getElementById("radio-gallery");
const menuBg = document.getElementById("menu-bg");

let currentRadio = 0;
let interacted = false;
const appStartTime = Date.now();

const changeSound = new Audio("./radios/gtasa/gtasaradiochange.mp3");
const staticNoise = new Audio("data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0Yfzh/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39");
staticNoise.loop = true;
staticNoise.volume = 0.05;

// Inicializar la galería de logos
function setupGallery() {
  radios.forEach((radio, index) => {
    const div = document.createElement('div');
    div.className = 'radio-icon';
    div.innerHTML = `<img src="${radio.logo}" alt="${radio.name}">`;
    div.onclick = (e) => {
      e.stopPropagation();
      changeToRadio(index);
    };
    gallery.appendChild(div);
  });
  updateGalleryUI();
}

// Pintar las barras de volumen como en la imagen
function setupVolumeBars() {
  const bars = document.querySelectorAll('.volume-bar');
  bars.forEach(bar => {
    const spans = bar.querySelectorAll('span');
    spans.forEach((span, i) => {
      if (i < 12) { // 12 barras activas de 15, como se ve en la imagen
        span.classList.add('active');
      }
    });
  });
}

function updateGalleryUI() {
  const icons = document.querySelectorAll('.radio-icon');
  icons.forEach((icon, index) => {
    icon.classList.toggle('active', index === currentRadio);
  });
  radioNameText.innerText = radios[currentRadio].name;
}

function updateBackground() {
  const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  menuBg.style.opacity = "0";
  setTimeout(() => {
    menuBg.src = randomBg;
    menuBg.style.opacity = "1";
  }, 200);
}

function changeToRadio(index) {
  if (!interacted) interacted = true;
  currentRadio = index;
  updateGalleryUI();
  updateBackground();
  playCurrentRadio();
}

const randomOffsets = radios.map(() => Math.floor(Math.random() * 7200));

function getCurrentOffset(index) {
  const elapsed = Math.floor((Date.now() - appStartTime) / 1000);
  return (randomOffsets[index] + elapsed) % 7200;
}

function ensurePlay() {
  if (!interacted) {
    interacted = true;
    updateBackground();
    playCurrentRadio();
  }
}

function playCurrentRadio() {
  const radio = radios[currentRadio];

  changeSound.currentTime = 0;
  changeSound.play().catch(() => { });
  staticNoise.play().catch(() => { });

  audio.src = radio.url;
  audio.load();

  audio.onloadedmetadata = () => {
    const time = getCurrentOffset(currentRadio);
    if (time < audio.duration) {
      audio.currentTime = time;
    }

    audio.play().then(() => {
      staticNoise.pause();
      staticNoise.currentTime = 0;
    }).catch(e => console.log("Interacción requerida:", e));
  };
}

window.onkeydown = (e) => {
  if (e.key === "ArrowRight") {
    changeToRadio((currentRadio + 1) % radios.length);
  } else if (e.key === "ArrowLeft") {
    changeToRadio((currentRadio - 1 + radios.length) % radios.length);
  }
};

// Inicialización
setupGallery();
setupVolumeBars();
radioNameText.innerText = "Toca cualquier parte para empezar";
backgrounds.forEach(bg => { const img = new Image(); img.src = bg; });
