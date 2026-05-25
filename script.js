// Audio Element
const audio = document.getElementById("audio");

// Buttons
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Song Details
const title = document.getElementById("song-title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

// Progress
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// Volume
const volume = document.getElementById("volume");

// Playlist
const playlist = document.getElementById("playlist");

// Songs Array
const songs = [
  {
    title: "Aaya sher",
    artist: "Anirudh Ravichander",
    src: "songs/Aaya Sher.mp3",
    cover: "images/nani.jpg"
  },

  {
    title: "God Mode",
    artist: "Sai Abhyankkar",
    src: "songs/God Mode.mp3",
    cover: "images/suriya.jpg"
  },

  {
    title: "Fire Storm",
    artist: "SS Thaman",
    src: "songs/Fire storm.mp3",
    cover: "images/Kalayan.png"
  },

  {
    title: "Sada Siva",
    artist: "Mani sharma",
    src: "songs/Sada Siva.mp3",
    cover: "images/babu.png"
  },
];

// Current Song Index
let songIndex = 0;

// Load Song
function loadSong(index) {

  const song = songs[index];

  title.textContent = song.title;
  artist.textContent = song.artist;

  audio.src = song.src;

  cover.src = song.cover;

  updatePlaylist();
}

// Play Song
function playSong() {

  audio.play();

  playBtn.textContent = "⏸";
}

// Pause Song
function pauseSong() {

  audio.pause();

  playBtn.textContent = "▶";
}

// Toggle Play/Pause
playBtn.addEventListener("click", () => {

  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }

});

// Next Song
function nextSong() {

  songIndex++;

  if (songIndex >= songs.length) {
    songIndex = 0;
  }

  loadSong(songIndex);

  playSong();
}

// Previous Song
function prevSong() {

  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songIndex);

  playSong();
}

// Buttons Events
nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

// Update Progress
audio.addEventListener("timeupdate", () => {

  const currentTime = audio.currentTime;
  const duration = audio.duration;

  if (duration) {

    const progressPercent =
      (currentTime / duration) * 100;

    progress.value = progressPercent;

    // Current Time
    let currentMinutes =
      Math.floor(currentTime / 60);

    let currentSeconds =
      Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }

    currentTimeEl.textContent =
      `${currentMinutes}:${currentSeconds}`;

    // Duration
    let durationMinutes =
      Math.floor(duration / 60);

    let durationSeconds =
      Math.floor(duration % 60);

    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }

    durationEl.textContent =
      `${durationMinutes}:${durationSeconds}`;
  }

});

// Change Progress
progress.addEventListener("input", () => {

  audio.currentTime =
    (progress.value / 100) * audio.duration;

});

// Volume Control
volume.addEventListener("input", () => {

  audio.volume = volume.value;

});

// Autoplay Next Song
audio.addEventListener("ended", () => {

  nextSong();

});

// Create Playlist
function createPlaylist() {

  playlist.innerHTML = "";

  songs.forEach((song, index) => {

    const li = document.createElement("li");

    li.textContent =
      `${song.title} - ${song.artist}`;

    li.addEventListener("click", () => {

      songIndex = index;

      loadSong(songIndex);

      playSong();

    });

    playlist.appendChild(li);

  });

}

// Highlight Current Song
function updatePlaylist() {

  const items = playlist.querySelectorAll("li");

  items.forEach((item, index) => {

    item.classList.remove("active-song");

    if (index === songIndex) {
      item.classList.add("active-song");
    }

  });

}

// Initial Load
createPlaylist();

loadSong(songIndex);