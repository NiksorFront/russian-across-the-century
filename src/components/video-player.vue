<script setup>
    import { ref, onMounted, onBeforeUnmount } from "vue";

    const {videoUrl, videoPoster} = defineProps(["videoUrl", "videoPoster"]);

    // Реактивные свойства для управления состоянием плеера
    // const startBrowsing = ref(false);
    const posterImg = ref(null);
    const videoContainer = ref(null);
    const isPaused = ref(true);
    const isMuted = ref(false);
    const volume = ref(1);
    const playbackRate = ref(1);
    const isScrubbing = ref(false);
    const isTheaterMode = ref(false);
    const isFullScreen = ref(false);
    const isMiniPlayer = ref(false);
    const currentTime = ref(0);
    const totalTime = ref(0);

    // Ссылки на элементы
    const video = ref(null);
    const timelineContainer = ref(null);
    const previewImg = ref(null);
    const thumbnailImg = ref(null);

    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2,});
    onMounted(() => {
        // Установка общей длительности видео
        video.value.addEventListener('loadeddata', () => {
            const time = video.value.duration;
            const seconds = Math.floor(time % 60);
            const minutes = Math.floor(time / 60) % 60;
            // const hours = Math.floor(time / 3600);
            // if (hours === 0) {
            //     totalTime.value = `${minutes}:${leadingZeroFormatter.format(seconds)}`
            // } else {
            //     totalTime.value = `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
            //     }
            // `${Math.floor(currentTime.value % 60) % 60}:${leadingZeroFormatter.format(Math.floor(currentTime.value % 60))}`
            totalTime.value = `${minutes}:${leadingZeroFormatter.format(seconds)}`;
        });

        // Обновление времени воспроизведения
        video.value.addEventListener('timeupdate', () => {
            currentTime.value = video.value.currentTime;
            updateTimelineProgress();
        });

        // Обработчики событий
        document.addEventListener("keydown", handleKeyDown);
        timelineContainer.value.addEventListener("mousemove", handleTimelineUpdate);
        timelineContainer.value.addEventListener("mousedown", toggleScrubbing);
        document.addEventListener("mouseup", (e) => { if (isScrubbing.value) toggleScrubbing(e); });
        document.addEventListener("mousemove", (e) => { if (isScrubbing.value) handleTimelineUpdate(e); });
    });

    onBeforeUnmount(() => {
        document.removeEventListener("keydown", handleKeyDown);
        timelineContainer.value.removeEventListener("mousemove", handleTimelineUpdate);
        timelineContainer.value.removeEventListener("mousedown", startScrubbing);
        document.removeEventListener("mouseup", stopScrubbing);
        document.removeEventListener("mousemove", handleTimelineUpdate);
    });

    // Функция для начала скраббинга
    const startScrubbing = (e) => {
        isScrubbing.value = true;
        toggleScrubbing(e); // Начать скраббинг
    };

    // Функция для остановки скраббинга
    const stopScrubbing = (e) => {
        if (isScrubbing.value) {
            toggleScrubbing(e, true); // Останавливаем скраббинг
            isScrubbing.value = false;
        }
    };

    const togglePlay = () => {
        if (video.value.paused) {
            video.value.play();
        } else {
            video.value.pause();
        }
        isPaused.value = video.value.paused;
    };

    const toggleMute = () => {
        video.value.muted = !video.value.muted;
        isMuted.value = video.value.muted;
    };

    const changeVolume = (e) => {
        video.value.volume = e.target.value;
        video.value.muted = e.target.value === 0;
        volume.value = video.value.volume;
    };

    const changePlaybackSpeed = () => {
        playbackRate.value = playbackRate.value + 0.25 > 2 ? 0.25 : playbackRate.value + 0.25;
        video.value.playbackRate = playbackRate.value;
    };

    const skip = (duration) => {
        video.value.currentTime += duration;
    };

    const toggleFullScreenMode = () => {
        if (document.fullscreenElement == null) {
            videoContainer.value.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        isFullScreen.value = !isFullScreen.value;
    };

    const toggleTheaterMode = () => {
        isTheaterMode.value = !isTheaterMode.value;
    };

    const toggleMiniPlayerMode = () => {
        if (isMiniPlayer.value) {
            document.exitPictureInPicture();
        } else {
            video.value.requestPictureInPicture();
        }
        isMiniPlayer.value = !isMiniPlayer.value;
    };

    const updateTimelineProgress = () => {
        const percent = video.value.currentTime / video.value.duration;
        timelineContainer.value.style.setProperty('--progress-position', percent);
    };

    const handleKeyDown = (e) => {
        const tagName = document.activeElement.tagName.toLowerCase();
        if (tagName === "input") return;

        switch (e.key.toLowerCase()) {
            case " ":
                if (tagName !== "button") togglePlay();
                break;
            case "k":
                togglePlay();
                break;
            case "f":
                toggleFullScreenMode();
                break;
            case "t":
                toggleTheaterMode();
                break;
            case "i":
                toggleMiniPlayerMode();
                break;
            case "m":
                toggleMute();
                break;
            // case "arrowleft":
            case "j":
                skip(-5);
                break;
            case "arrowright":
                case "l":
                skip(5);
            break;
        }
    };

    const toggleScrubbing = (e) => {
        const rect = timelineContainer.value.getBoundingClientRect();
        const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

        isScrubbing.value = (e.buttons & 1) === 1;
        if (!isScrubbing) {
            isPaused.value = video.value.paused;
            video.value.pause();
        } else {
            video.value.currentTime = percent * video.value.duration;
            if (!isPaused.value) video.value.play();
        }

        handleTimelineUpdate(e); // Обновляем прогресс
    };

    const handleTimelineUpdate = (e) => {
        const rect = timelineContainer.value.getBoundingClientRect();
        const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
        const previewImgNumber = Math.max(1, Math.floor((percent * video.value.duration) / 10));
        const previewImgSrc = `assets/previewImgs/preview${previewImgNumber}.jpg`;
        previewImg.value.src = previewImgSrc;
        timelineContainer.value.style.setProperty("--preview-position", percent);

        if (isScrubbing.value) {
            e.preventDefault();
            thumbnailImg.value.src = previewImgSrc;
            timelineContainer.value.style.setProperty("--progress-position", percent);
        }
    };
</script>

<template>
    <div ref="posterImg" class="w-full h-full z-10 relative" @click="() => {posterImg.classList.add('hidden'); togglePlay()}">
        <button class="absolute top-[39.58%] left-[41.666%] w-1/6 object-contain" aria-label="Смотреть" title="Смотреть"><svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg></button>
        <img :src="videoPoster" class="w-full h-full"/>
    </div>
    <div ref="videoContainer" class="video-container" :class="{'theater': isTheaterMode, 'full-screen': isFullScreen, 'mini-player': isMiniPlayer, 'paused': isPaused}">
        <img ref="thumbnailImg" class="thumbnail-img" />
        <div class="video-controls-container">
            <div ref="timelineContainer" class="timeline-container">
                <div class="timeline">
                    <img ref="previewImg" class="preview-img" />
                    <div class="thumb-indicator"></div>
                </div>
            </div>
            <div class="controls">
                <button class="play-pause-btn" @click="togglePlay">
                    <svg v-if="isPaused" height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-132"></use><path class="ytp-svg-fill" d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z" fill="#fff"></path></svg>
                    <svg v-else height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-173"></use><path class="ytp-svg-fill" d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" fill="#fff"></path></svg>
                </button>
                <div class="volume-container">
                    <button class="mute-btn" @click="toggleMute">
                        <svg v-if="isMuted" height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-168"></use><path d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z" fill="#fff"></path></svg>
                        <svg v-else height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use xlink:href="#ytp-id-26"></use><use xlink:href="#ytp-id-27"></use><defs><clipPath id="ytp-svg-volume-animation-mask"><path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path><path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path><path class="ytp-svg-volume-animation-mover" d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z" transform="translate(0, 0)"></path></clipPath><clipPath id="ytp-svg-volume-animation-slash-mask"><path class="ytp-svg-volume-animation-mover" d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z" transform="translate(0, 0)"></path></clipPath></defs><path class="ytp-svg-fill ytp-svg-volume-animation-speaker" clip-path="url(#ytp-svg-volume-animation-mask)" d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z" fill="#fff" id="ytp-id-26"></path><path class="ytp-svg-fill ytp-svg-volume-animation-hider" clip-path="url(#ytp-svg-volume-animation-slash-mask)" d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z" fill="#fff"></path></svg>
                    </button>
                    <input class="volume-slider" type="range" min="0" max="1" step="any" v-model="volume" @input="changeVolume">
                </div>
                <div class="duration-container opacity-90 ml-2">
                    <span class="helvetica-500 text-sm">{{`${Math.floor(currentTime / 60) % 60}:${leadingZeroFormatter.format(Math.floor(currentTime % 60))}`}}</span>
                    /
                    <span class="helvetica-500 text-sm">{{totalTime}}</span>
                </div>
                <button class="w-fit helvetica-500 text-sm ml-[auto] -translate-y-0.5" @click="changePlaybackSpeed">{{ playbackRate }}x</button>
                <button class="full-screen-btn" @click="toggleFullScreenMode">
                    <svg v-if="!isFullScreen" class="open" viewBox="0 0 30 30"><path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                    <svg v-else class="close" viewBox="0 0 30 30"><path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>
                </button>
            </div>
        </div>
        <video ref="video" :src="videoUrl" class="w-full h-hull" @click="togglePlay"></video>
    </div>
</template>

<style scoped>

    .video-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        /* margin-inline: auto; */
        background-color: black;
    }
    
    .video-container.theater,
    .video-container.full-screen {
        max-width: initial;
        width: 100%;
    }
    
    .video-container.theater {
        max-height: 90vh;
    }
    
    .video-container.full-screen {
        max-height: 100vh;
    }
    
    video {
        width: 100%;
    }
    
    .video-controls-container {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: white;
        z-index: 100;
        opacity: 0;
        transition: opacity 150ms ease-in-out;
    }
  
    .video-controls-container::before {
        content: "";
        position: absolute;
        bottom: 0;
        left:0;
        background: linear-gradient(to top, rgba(0, 0, 0, .75), transparent);
        width: 100%;
        aspect-ratio: 6 / 1;
        z-index: -1;
        pointer-events: none;
    }
    
    .video-container:hover .video-controls-container,
    .video-container:focus-within .video-controls-container,
    .video-container.paused .video-controls-container {
        opacity: 1;
    }
    
    .video-controls-container .controls {
        display: flex;
        padding: 0 clamp(5px, 1vw, 15px) 5px clamp(5px, 1vw, 15px);
        align-items: center;
    }
    
    .video-controls-container .controls button {
        background: none;
        border: none;
        color: inherit;
        padding: 0;
        height: 36px;
        width: fit-content;
        min-width: 36px;
        font-size: 0.95rem;
        cursor: pointer;
        opacity: .85;
        transition: opacity 150ms ease-in-out;
    }
    
    .video-controls-container .controls button:hover {
        opacity: 1;
    }
    
    .video-container.paused .pause-icon {
        display: none;
    }
    
    .video-container:not(.paused) .play-icon {
        display: none;
    }
    
    .video-container.theater .tall {
        display: none;
    }
    
    .video-container:not(.theater) .wide {
        display: none;
    }
    
    /* .video-container.full-screen .open {
        display: none;
    } */
    
    .video-container:not(.full-screen) .close {
        display: none;
    }
    
    .volume-high-icon,
    .volume-low-icon,
    .volume-muted-icon {
        display: none;
    }
    
    .video-container[data-volume-level="high"] .volume-high-icon {
        display: block;
    }
    
    .video-container[data-volume-level="low"] .volume-low-icon {
        display: block;
    }
    
    .video-container[data-volume-level="muted"] .volume-muted-icon {
        display: block;
    }
    
    .volume-container {
        display: flex;
        align-items: center;
    }
    
    .volume-slider {
        width: 0;
        transform-origin: left;
        transform: scaleX(0);
        transition: width 150ms ease-in-out, transform 150ms ease-in-out;
    }
    
    .volume-container:hover .volume-slider,
    .volume-slider:focus-within {
        width: 100px;
        transform: scaleX(1);
    }
    
    .duration-container {
        display: flex;
        align-items: center;
        gap: .25rem;
        flex-grow: 1;
    }
    
    .video-container.captions .captions-btn {
        border-bottom: 3px solid red;
    }
    
    .timeline-container {
        height: 7px;
        margin-inline: clamp(5px, 1vw, 10px);
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    
    .timeline {
        background-color: rgba(100, 100, 100, .5);
        height: 3px;
        width: 100%;
        position: relative
    }
    
    .timeline::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: calc(100% - var(--preview-position) * 100%);
        background-color: rgb(150, 150, 150);
        display: none;
    }
    
    .timeline::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: calc(100% - var(--progress-position) * 100%);
        background-color: red;
    }
    
    .timeline .thumb-indicator {
        --scale: 0;
        position: absolute;
        transform: translateX(-50%) scale(var(--scale));
        height: 200%;
        top: -50%;
        left: calc(var(--progress-position) * 100%);
        background-color: red;
        border-radius: 50%;
        transition: transform 150ms ease-in-out;
        aspect-ratio: 1 / 1;
    }
    
    .timeline .preview-img {
        position: absolute;
        height: 80px;
        aspect-ratio: 16 / 9;
        top: -1rem;
        transform: translate(-50%, -100%);
        left: calc(var(--preview-position) * 100%);
        border-radius: .25rem;
        border: 2px solid white;
        display: none;
    }
    
    .thumbnail-img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: none;
    }
    
    .video-container.scrubbing .thumbnail-img {
        display: block;
    }
    
    .video-container.scrubbing .preview-img,
    .timeline-container:hover .preview-img {
        display: block;
    }
    
    .video-container.scrubbing .timeline::before,
    .timeline-container:hover .timeline::before {
        display: block;
    }
    
    .video-container.scrubbing .thumb-indicator,
    .timeline-container:hover .thumb-indicator {
        --scale: 1;
    }
    
    .video-container.scrubbing .timeline,
    .timeline-container:hover .timeline {
        height: 100%;
    }

</style>