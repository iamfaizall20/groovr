const songs = [
    {
        "title": "Montagem Lunar Celestia 1.0",
        "author": "TOKYOPHILE",
        "src": "audios/1.mp3",
        "img": "images/1.jpg"
    },
    {
        "title": "Murder in My Mind",
        "author": "Kordhell"
    },
    {
        "title": "NEON BLADE",
        "author": "MoonDeity"
    },
    {
        "title": "RAVE",
        "author": "Dxrk ダーク"
    },
    {
        "title": "Phonky Town",
        "author": "PlayaPhonk"
    },
    {
        "title": "METAMORPHOSIS",
        "author": "INTERWORLD"
    },
    {
        "title": "SHADOW RAP",
        "author": "Freddie Dredd"
    },
    {
        "title": "Devil Eyes",
        "author": "Hippie Sabotage"
    },
    {
        "title": "LIVING LIFE IN THE NIGHT",
        "author": "Cheriimoya & Sierra Kidd"
    },
    {
        "title": "GigaChad Theme Phonk",
        "author": "g3ox_em"
    }
];


// Song Details
const title = document.querySelector('.phonk-title');
const author = document.querySelector('.author');
const audio = document.querySelector('.phonk');
const image = document.querySelector('.phonk-img');

// Controls
const previous = document.querySelector('.previous-icon i');
const play = document.querySelector('.play-icon');
const pause = document.querySelector('.pause-icon');
const next = document.querySelector('.forward-icon i');

// Timings & Progress bar
let currentTimeEl = document.querySelector('.current-time');
let endTimeEl = document.querySelector('.end-time');
let progressBar = document.querySelector('.progress-fill');

let songIndex = 0;

// Helper → format seconds as mm:ss
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

// Load song info
function updateSong(index) {
    title.textContent = songs[index].title;
    author.textContent = songs[index].author;
    audio.src = songs[index].src;
    image.src = songs[index].img;
}

// Next / Previous
function nextSong() {
    if (songIndex < songs.length - 1) {
        songIndex++;
        updateSong(songIndex);
        playSong();
    }
}

function prevSong() {
    if (songIndex > 0) {
        songIndex--;
        updateSong(songIndex);
        playSong();
    }
}

// Play / Pause
function playSong() {
    updateSong(songIndex);
    audio.play();
    pause.style.display = "flex";
    play.style.display = "none";
}
function pauseSong() {
    audio.pause();
    pause.style.display = "none";
    play.style.display = "flex";
}

// Event listeners for buttons
previous.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);
play.addEventListener('click', playSong);
pause.addEventListener('click', pauseSong);

// When page loads
document.addEventListener('DOMContentLoaded', () => {
    updateSong(songIndex);

    audio.addEventListener('loadedmetadata', () => {
        currentTimeEl.textContent = "0:00";
        endTimeEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        const current = audio.currentTime;
        const duration = audio.duration;

        if (duration > 0) {
            const progressPercentage = (current / duration) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }

        currentTimeEl.textContent = formatTime(current);
        endTimeEl.textContent = formatTime(duration);
    });
});
