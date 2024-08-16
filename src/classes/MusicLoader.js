export class MusicLoader {
    constructor(music, tracksData) {

        this.music = music
        this.tracksData = tracksData


        this.musicLoaderBox = document.getElementById('music_loader_box')
        this.musicProfile = document.getElementById('music_loader_profile')
        this.musicName = document.getElementById('music_loader_name')
        this.musicArtist = document.getElementById('music_loader_artist')
        this.currentTime = document.getElementById('current_time')
        this.duration = document.getElementById('duration')
        this.audio = document.getElementById('music_loader_audio')
        this.progressElm = document.getElementById('progress')

        this.loadMusic()
    }

    loadMusic() {
        this.musicLoaderBox.classList.remove('hidden')

        this.musicProfile.src = this.tracksData.image
        this.musicName.innerText = this.tracksData.name
        this.musicArtist.innerText = this.tracksData.artist
        this.currentDuration = this.tracksData.music

        setInterval(() => {
            this.musicTimer()
        }, 1000);
    }

    musicTimer() {
        const currentTime = this.music.currentTime
        if (!currentTime) { return }
        const duration = this.music.duration
        const progressElmWidth = (currentTime / duration) * 100
        this.progressElm.style.width = `${progressElmWidth}%`
        this.currentTime.innerText = ((currentTime / 60).toFixed(2)).toString('D2')
        this.duration.innerText = (duration / 60).toFixed(2)
    }

}

