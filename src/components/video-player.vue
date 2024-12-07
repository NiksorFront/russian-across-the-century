<script setup>
    import { ref, onMounted, onBeforeUnmount } from "vue";

    const {videoInfo} = defineProps(["videoInfo"]);

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

    // Окно настроек воспроизведения и качества
    const isSettingsVisible = ref(false);
    const isPlaybackRateMenu = ref(false);
    const menuSettings = ref(null);
    const isQualityMenu = ref(false);

    // Доступные варианты скорости и качества
    const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const qualities = ["144", "240", "360", "480", "720", "1080"];
    const selectedQuality = ref("720");

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

        //Установка точно такой же минуты после обновления разрешения 
        video.value.addEventListener("loadedmetadata", () => {
            video.value.currentTime = currentTime.value;
        });
        
        // Обновление времени воспроизведения
        video.value.addEventListener('timeupdate', () => {
            if(video.value.currentTime !== 0){
                currentTime.value = video.value.currentTime;
                updateTimelineProgress();
            }
        });
        document.addEventListener('click', closigMenuWhenCkickOutside)

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
        document.removeEventListener('click', closigMenuWhenCkickOutside)
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

    const changePlaybackRate = (rate) => {
        playbackRate.value = rate;
        video.value.playbackRate = rate;
    };

    const toggleSettingsMenu = () => {
        isSettingsVisible.value = !isSettingsVisible.value;
        isPlaybackRateMenu.value = false;
        isQualityMenu.value = false;
    };

    const closigMenuWhenCkickOutside = (e) => {
        if (!e.target.classList.contains("settings-menu") && isSettingsVisible.value && e.target.id !== "elementMenu"){
            // console.log(1235)
            isSettingsVisible.value = false;
            isPlaybackRateMenu.value = false;
            isQualityMenu.value = false;
        }
    }

    const selectPlaybackRateMenu = () => {
        isPlaybackRateMenu.value = true;
        isQualityMenu.value = false;
    };

    const selectQualityMenu = () => {
        isPlaybackRateMenu.value = false;
        isQualityMenu.value = true;
    };

    const selectQuality = (quality) => {
        selectedQuality.value = quality;
    };

    const skip = (duration) => {
        video.value.currentTime += duration;
    };

    const toggleFullScreenMode = () => {
        const videoCont = videoContainer.value;

        // Проверка на платформу: iOS или Android
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        // const isAndroid = /Android/.test(navigator.userAgent) || useragent.search("android");

        if (document.fullscreenElement || 
            document.mozFullScreenElement || 
            document.webkitFullscreenElement || 
            document.msFullscreenElement) {
            // Если видео уже в полноэкранном режиме, выходим из него
            console.log('Выход из полноэкранного режима');
            
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(err => {
                    console.log('Ошибка при выходе из Fullscreen:', err);
                });
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen().catch(err => {
                    console.log('Ошибка при выходе из Fullscreen (Firefox):', err);
                });
            } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
                document.webkitExitFullscreen().catch(err => {
                    console.log('Ошибка при выходе из Fullscreen (Webkit):', err);
                });
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen().catch(err => {
                    console.log('Ошибка при выходе из Fullscreen (IE/Edge):', err);
                });
            } else {
                console.log('Ваш браузер не поддерживает выход из полноэкранного режима');
            }

        } else {
            // Если видео еще не в полноэкранном режиме
            if (isIOS) {
                video.value.webkitEnterFullscreen(); // iOS Safari
            } else {
                // Для других устройств, включая Android
                console.log('Открытие видео в полноэкранном режиме через стандартный Fullscreen API');
                if (videoCont.requestFullscreen) {
                    videoCont.requestFullscreen().catch(err => {
                        console.log('Ошибка при открытии в Fullscreen на Android:', err);
                    });
                } else if (videoCont.webkitRequestFullscreen) { // Chrome, Safari
                    videoCont.webkitRequestFullscreen().catch(err => {
                        console.log('Ошибка при открытии в Fullscreen на Webkit:', err);
                    });
                } else if (videoCont.mozRequestFullScreen) { // Firefox
                    videoCont.mozRequestFullScreen().catch(err => {
                        console.log('Ошибка при открытии в Fullscreen на Firefox:', err);
                    });
                } else if (videoCont.msRequestFullscreen) { // IE/Edge
                    videoCont.msRequestFullscreen().catch(err => {
                        console.log('Ошибка при открытии в Fullscreen на IE/Edge:', err);
                    });
                } else {
                    video.value.requestFullscreen().catch(err => {
                        console.log('Ваш браузер не поддерживает Fullscreen API', err);
                    });;
                    // console.log('Ваш браузер не поддерживает Fullscreen API');
                }
            }
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
        const previewImgNumber = Math.max(1, Math.floor(percent * video.value.duration));
        console.log(previewImgNumber);
        const previewImgSrc = `${videoInfo.urlFrames}${previewImgNumber}.jpg`;
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
        <img :src="videoInfo.preview" class="w-full h-full"/>
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
                <button @click="togglePlay">
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

                <!-- Кнопка открытия меню настроек скорости и качества -->
                <button id="elementMenu" class="w-fit helvetica-500 text-sm ml-[auto] -translate-y-0.5" @click="toggleSettingsMenu">
                    <svg id="elementMenu" height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path id="elementMenu" d="m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z" fill="#fff"></path></svg>
                </button>
                <!-- Окно настроек -->
                <div id="elementMenu" v-if="isSettingsVisible" class="settings-menu helvetica-300">
                    <!-- Основное меню с вариантами выбора -->
                    <div id="elementMenu" v-if="!isPlaybackRateMenu && !isQualityMenu" class="flex flex-col justify-between gap-4">
                        <a id="elementMenu" @click="selectPlaybackRateMenu" class="whitespace-pre">{{`Скорость воспроизведения:             ${ playbackRate }x >`}}</a>
                        <a id="elementMenu" @click="selectQualityMenu" class="whitespace-pre">{{`Качество:                                        ${ selectedQuality }p >`}}</a>
                    </div>

                    <!-- Меню выбора скорости воспроизведения -->
                    <ul id="elementMenu" v-else-if="isPlaybackRateMenu">
                        <li id="elementMenu" v-for="rate in playbackRates" :key="rate" @click="changePlaybackRate(rate)" class="flex flex-row">
                            <svg id="elementMenu" class="size-4 my-auto mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.94 511.94" xml:space="preserve" fill="white" stroke="white" stroke-width="15">
                                <path id="elementMenu" v-if="playbackRate === rate" d="m500.29 61.9-344.4 365.44L11.02 289.38 0 300.96l156.51 149.07L511.94 72.88z"/>
                            </svg>
                            {{ rate === 1 ? 'обычная' : rate }}
                        </li>
                    </ul>

                    <!-- Меню выбора качества -->
                    <ul id="elementMenu" v-else-if="isQualityMenu">
                        <li id="elementMenu" v-for="quality in qualities" :key="quality" @click="selectQuality(quality)" class="flex flex-row">
                            <svg id="elementMenu" class="size-4 my-auto mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.94 511.94" xml:space="preserve" fill="white" stroke="white" stroke-width="15">
                                <path id="elementMenu`" v-if="selectedQuality === quality" d="m500.29 61.9-344.4 365.44L11.02 289.38 0 300.96l156.51 149.07L511.94 72.88z"/>
                            </svg>
                            {{ quality }}p
                        </li>
                    </ul>
                </div>

                <!-- Кнопка открытия полноэкранного режима  -->
                <button class="full-screen-btn" @click="toggleFullScreenMode">
                    <svg v-if="!isFullScreen" class="open" viewBox="0 0 30 30"><path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                    <svg v-else class="close" viewBox="0 0 30 30"><path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>
                </button>
            </div>
        </div>
        <video ref="video" :src="videoInfo[selectedQuality]" class="w-full h-hull" @click="togglePlay"></video>
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
        max-width: 36px;
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
        max-width: 36px;
        display: flex;
        align-items: center;
    }

    .volume-container:hover{
        max-width: 200px;
    }
    
    .volume-slider {
        width: 0;
        transform-origin: left;
        transform: scaleX(0);
        transition: width 150ms ease-in-out, transform 150ms ease-in-out;
    }
    
    .volume-container:hover .volume-slider, .volume-slider:focus-within {
        width: 100px;
        transform: scaleX(1);
    }
    
    .duration-container {
        max-width: 100px;
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

    .settings-menu {
        position: absolute;
        bottom: 55px;
        right: clamp(5px,10%,10px);
        padding: min(5%, 20px) min(2%, 10px);
        background-color: rgba(0, 0, 0, 0.85);
        /* width: 35vw; */
        width: clamp(50px, w-fit, 300px);
        font-size: clamp(5px, 2.5vw, 15px);
        text-align: left;
        color: white;
        z-index: 200;
        border-radius: clamp(5px, 1vw, 15px);
    }

    /* .settings-menu div{
        width: clamp(50px, 25vw, 450px);
    } */

    .settings-menu a, li{
        cursor: pointer;
        margin-right: 5px;
        transition: background-color 0.2s;
    }

    .settings-menu a:hover, li:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    @media (width > 640px){
        .settings-menu div, li{
            padding-left: 6px;
        }
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