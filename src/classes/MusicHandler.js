import axios from "axios";
import { MusicLoader } from "./MusicLoader"

export class MusicHandler {

    constructor() {

        this.volume;
        this.lastMusic;
        this.tracksData;
        this.globalMusic;
        this.lastGlobalMusic;
        this.currentMusic;
        this.searchResault;
        this.categotyResault;
        this.singleTrack;

        this.stopBtn = document.getElementById('stop_btn')
        this.playBtn = document.getElementById('play_btn')
        this.nextBtn = document.getElementById('next')
        this.prevBtn = document.getElementById('prev')
        this.progressBar = document.getElementById('progress_bar')
        this.volumeProggBar = document.getElementById('volume_prgg_bar')
        this.volumeProgg = document.getElementById('volume_progg')
        this.connectVolumeIcon = document.getElementById('volume_icon')
        this.disconnetVolumeIcon = document.getElementById('no_volume_icon')
        this.extMusic = document.getElementById('ext_audio')
        this.rptMusic = document.getElementById('repeat-audio')
        this.musicLoaderBox = document.getElementById('music_loader_box')

        this.getNextMusic()
        this.getpreviousMusic()

    }
    musicSelected(trackTemplate, trackData, currentMusic) {
        this.globalMusic = currentMusic
        const getMusicIcon = trackTemplate.getElementById('play-pause-box')
        getMusicIcon.addEventListener('click', () => {
            this.musicAction(trackData, getMusicIcon)
        })
    }

    musicAction(trackData, iconBox) {

        const music = iconBox.nextElementSibling
        this.currentMusic = music
        iconBox.children['pause-icon'].classList.contains('hidden') ?
            this.pauseMusic() : this.playMusic(trackData);
    }
    async singleTrackData(singleTrack) {
        this.singleTrack = singleTrack
    }
    async playMusic(trackData) {

        if (this.lastGlobalMusic) {
            this.lastGlobalMusicAction(this.lastGlobalMusic)
        }

        this.pauseLastMusics()
        this.handleMusicAfterPlay(this.currentMusic)
        this.getCurrentMusic()
        this.currentMusic.play()

        new MusicLoader(this.currentMusic, trackData)
        this.playAction(null)

        this.lastMusic = this.currentMusic
        this.tracksData = await this.getMusics()

    }

    pauseMusic() {

        this.getCurrentMusic()
        this.globalMusicAction()
        this.currentMusic.pause()

        this.pauseAction(this.currentMusic)
    }

    pauseLastMusics() {

        if (this.lastMusic) {
            this.lastMusic.setAttribute('situation', 'pausing')
            this.lastMusic.pause()
            this.lastMusic.currentTime = 0

            this.pauseAction(this.lastMusic)
        }
    }

    globalMusicAction() {
        if (this.globalMusic && this.globalMusic.getAttribute('situation') === 'playing') {
            this.globalMusic.pause()
            this.pauseAction(this.globalMusic)
            return
        }
    }

    lastGlobalMusicAction() {
        this.pauseAction(this.lastGlobalMusic)
    }

    handleMusicAfterPlay(music) {
        this.repeatMusic()
        this.playMusicInLoader(music)
        setInterval(() => {

            this.pauseMusicInLoader(music)
        }, 1000);
        this.progressBarSet(music)
        this.musicDefaultVolume(music)
        this.musicVolumeConnected(music)
        this.musicVolumedDisconnected(music)
        this.exiteCurrentMusic(music)

    }

    async getMusics() {
        const trackCat = this.currentMusic.getAttribute('track-cat')

        if (trackCat === 'search') {
            return this.searchResault
        }
        if (trackCat === 'category') {
            return this.categotyResault
        }
        const { data: resault } = await axios.get(`http://myapi.iapp.ir/api/${trackCat}/8`);
        return resault.data;
    }

    getNextMusic() {
        this.nextBtn.addEventListener('click', () => {
            this.nextMusic()
        })
    }

    async nextMusic() {
        let nxt;
        let getNextMusic;
        let trackData = await this.tracksData
        if (!trackData) { return }
        if (trackData.length == 1) { return }

        const nextMusicIndex = +(this.currentMusic.innerText) + 1;

        if (nextMusicIndex <= trackData.length - 1) {
            nxt = nextMusicIndex
            getNextMusic = this.currentMusic.parentElement.parentElement.nextElementSibling.children[0].children['audio'];
        } else {
            nxt = 0
            getNextMusic = this.currentMusic.parentElement.parentElement.parentElement.children[0].children[0].children['audio'];
        }

        trackData = trackData[nxt]
        this.currentMusic = getNextMusic
        this.playMusic(trackData)
    }

    getpreviousMusic() {
        this.prevBtn.addEventListener('click', () => {
            this.previosMusic()
        })
    }

    async previosMusic() {


        let nxt;
        let getPrevMusic;
        let trackData = this.tracksData;

        if (!trackData) { return }
        if (trackData.length == 1) { return }
        const prevMusicIndex = +(this.currentMusic.innerText) - 1;


        if (prevMusicIndex < 0) {
            nxt = trackData.length - 1
            getPrevMusic = this.currentMusic.parentElement.parentElement.parentElement.children[trackData.length - 1].children[0].children['audio'];

        } else {
            nxt = prevMusicIndex
            getPrevMusic = this.currentMusic.parentElement.parentElement.previousElementSibling.children[0].children['audio'];
        }

        trackData = trackData[nxt]
        this.currentMusic = getPrevMusic
        this.playMusic(trackData)

    }

    pauseMusicInLoader(music) {
        this.stopBtn.addEventListener('click', () => {
            this.playBtn.classList.remove("hidden");
            this.stopBtn.classList.add("hidden");
            music.setAttribute('situation', 'playing')
            if (music.currentTime > 0) {
                music.play()
                this.playAction(null)
            }
        })
    }

    playMusicInLoader(music) {

        this.playBtn.addEventListener('click', () => {
            this.stopBtn.classList.remove("hidden");
            this.playBtn.classList.add("hidden");
            music.setAttribute('situation', 'pausing')
            music.pause()
        })
    }

    playAction() {

        this.currentMusic.setAttribute('situation', 'playing')
        const musicIcon = this.currentMusic.previousElementSibling
        musicIcon.classList.remove('opacity-0')
        musicIcon.children['pause-icon'].classList.add('hidden')
        musicIcon.children['play-icon'].classList.remove('hidden')
        this.musicLoaderBtnSet()
    }

    pauseAction(music) {

        music.setAttribute('situation', 'pausing')
        const musicIcon = music.previousElementSibling
        if (music.getAttribute('track-ul')) {
            musicIcon.classList.add('opacity-0')
        }

        musicIcon.children['pause-icon'].classList.remove('hidden')
        musicIcon.children['play-icon'].classList.add('hidden')
        this.musicLoaderBtnSet()
    }

    musicLoaderBtnSet() {

        const situation = this.currentMusic.getAttribute('situation')
        if (situation === 'playing') {
            this.stopBtn.classList.add("hidden")
            this.playBtn.classList.remove("hidden")
        } else {
            this.playBtn.classList.add("hidden")
            this.stopBtn.classList.remove("hidden")
        }
    }

    progressBarSet(music) {
        this.progressBar.addEventListener('click', (event) => {
            if (music.currentTime > 0) {
                music.currentTime = ((event.offsetX / this.progressBar.clientWidth) * music.duration)
            }
        })
    }

    musicDefaultVolume(music) {
        if (!this.volume) {
            this.volume = 0.5
        }
        music.volume = this.volume
        this.musicVolumeProggWith(music)
        this.musicVolumeSet(music)
    }

    musicVolumeSet(music) {
        this.volumeProggBar.addEventListener('click', (event) => {
            music.volume = (event.offsetX / this.volumeProggBar.clientWidth)
            this.musicVolumeProggWith(music)
            this.volume = music.volume;
        })
    }

    musicVolumeConnected(music) {
        this.connectVolumeIcon.addEventListener('click', () => {
            music.volume = 0
            this.musicVolumeProggWith(music)
            this.connectVolumeIcon.classList.add('hidden')
            this.disconnetVolumeIcon.classList.remove('hidden')
        })
    }

    musicVolumedDisconnected(music) {
        this.disconnetVolumeIcon.addEventListener('click', () => {
            music.volume = this.volume
            this.musicVolumeProggWith(music)
            this.disconnetVolumeIcon.classList.add('hidden')
            this.connectVolumeIcon.classList.remove('hidden')
        })
    }

    musicVolumeProggWith(music) {
        this.volumeProgg.style.width = `${music.volume * 100}%`;
    }

    repeatMusic() {
        this.rptMusic.addEventListener('click', () => {
            if (this.rptMusic.classList.contains('fill-[#505050]')) {
                this.rptMusic.classList.remove('fill-[#505050]')
                this.rptMusic.classList.add('fill-[#fbe81d]')
                this.currentMusic.loop = true
                this.currentMusic.play()
            } else {
                this.rptMusic.classList.remove('fill-[#fbe81d]')
                this.rptMusic.classList.add('fill-[#505050]')
                this.currentMusic.loop = false
            }
        })
    }

    exiteCurrentMusic(music) {
        this.extMusic.addEventListener('click', () => {
            this.pauseMusic(music)
            this.musicLoaderBox.classList.add('hidden')
        })
    }

    getSearchResaults(searchResault) {
        this.searchResault = searchResault
    }
    getCategoryResaults(categotyResault) {
        this.categotyResault = categotyResault
    }

    getGlobalMusic(currentMusicElm) {
        this.currentMusic = currentMusicElm
        this.lastGlobalMusic = currentMusicElm
    }

    getCurrentMusic() {
        if (!this.currentMusic) {
            return
        }
        document.dispatchEvent(new CustomEvent('globalMusic', {
            detail: {
                globalMusic: this.currentMusic
            }
        }));
    }

    async globalMusicSet(globalMusic) {

        const situation = globalMusic.getAttribute('situation')
        if (situation === 'playing') {
            globalMusic.play()

        } else {
            globalMusic.pause()
        }

    }
}