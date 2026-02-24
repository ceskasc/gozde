// ===== MUSIC CONTROL (YouTube IFrame API) =====
import { getMusicState, setMusicState } from '../utils/storage.js';

let player = null;
let apiReady = false;
let playerReady = false;
let currentState = getMusicState();

const PLAYLIST_ID = 'PLOUjbWEszD6Vs5RCUEw7JTGWF4L0uE3vG';

function loadYouTubeAPI() {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve();
            return;
        }
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
        window.onYouTubeIframeAPIReady = () => {
            apiReady = true;
            resolve();
        };
    });
}

function initPlayer() {
    return new Promise((resolve) => {
        player = new window.YT.Player('yt-player', {
            height: '0',
            width: '0',
            playerVars: {
                listType: 'playlist',
                list: PLAYLIST_ID,
                autoplay: 1,
                loop: 1,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
            },
            events: {
                onReady: (e) => {
                    playerReady = true;
                    e.target.setVolume(40);
                    if (currentState.muted) {
                        e.target.mute();
                    } else {
                        e.target.unMute();
                    }
                    if (currentState.playing) {
                        e.target.playVideo();
                    }
                    resolve();
                },
                onError: () => resolve(),
            },
        });
    });
}

export async function initMusic() {
    try {
        await loadYouTubeAPI();
        await initPlayer();
    } catch (e) {
        // YouTube not available, music silently disabled
    }
}

export function togglePlay() {
    if (!player || !playerReady) return;
    if (currentState.playing) {
        player.pauseVideo();
        currentState.playing = false;
    } else {
        player.playVideo();
        currentState.playing = true;
    }
    setMusicState(currentState);
    return currentState;
}

export function toggleMute() {
    if (!player || !playerReady) return;
    if (currentState.muted) {
        player.unMute();
        currentState.muted = false;
        // Also play if not playing
        if (!currentState.playing) {
            player.playVideo();
            currentState.playing = true;
        }
    } else {
        player.mute();
        currentState.muted = true;
    }
    setMusicState(currentState);
    return currentState;
}

export function getMusicInfo() {
    return { ...currentState };
}

// Music Control UI
export function createMusicControl(container) {
    const state = getMusicInfo();

    container.innerHTML = `
    <div class="music-float ${!state.playing ? 'music-float--paused' : ''}">
      <button class="music-float__btn" id="mc-play" aria-label="${state.playing ? 'Duraklat' : 'Oynat'}">
        ${state.playing ? iconPause() : iconPlay()}
      </button>
      <div class="music-float__indicator">
        <div class="music-float__bar"></div>
        <div class="music-float__bar"></div>
        <div class="music-float__bar"></div>
        <div class="music-float__bar"></div>
      </div>
      <button class="music-float__btn" id="mc-mute" aria-label="${state.muted ? 'Sesi aç' : 'Sesi kapat'}">
        ${state.muted ? iconMuted() : iconVolume()}
      </button>
    </div>
  `;

    const playBtn = container.querySelector('#mc-play');
    const muteBtn = container.querySelector('#mc-mute');
    const floatEl = container.querySelector('.music-float');

    playBtn.addEventListener('click', () => {
        const s = togglePlay();
        if (!s) return;
        playBtn.innerHTML = s.playing ? iconPause() : iconPlay();
        playBtn.setAttribute('aria-label', s.playing ? 'Duraklat' : 'Oynat');
        floatEl.classList.toggle('music-float--paused', !s.playing);
    });

    muteBtn.addEventListener('click', () => {
        const s = toggleMute();
        if (!s) return;
        muteBtn.innerHTML = s.muted ? iconMuted() : iconVolume();
        muteBtn.setAttribute('aria-label', s.muted ? 'Sesi aç' : 'Sesi kapat');
        // If un-muted, also update play state
        playBtn.innerHTML = s.playing ? iconPause() : iconPlay();
        floatEl.classList.toggle('music-float--paused', !s.playing);
    });
}

function iconPlay() {
    return '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
}

function iconPause() {
    return '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
}

function iconVolume() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>';
}

function iconMuted() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
}
