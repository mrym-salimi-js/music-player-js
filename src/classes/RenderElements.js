import { App } from "./App";

export class RenderElements {
    constructor() {
    }
    playListRender(trackData, trackIndex, trackCat, globalMusic, liTempElm) {
        const liTemplate = document.importNode(liTempElm.content, true)


        liTemplate.getElementById('track-a').setAttribute('data-id', trackData.id)
        liTemplate.getElementById('track-a').setAttribute('download-link', '')
        liTemplate.querySelector('li').id = trackData.id
        liTemplate.getElementById('artist_profile').src = trackData.image
        liTemplate.getElementById('artist_name').innerText = trackData.artist
        liTemplate.getElementById('music_name').innerText = trackData.name
        liTemplate.getElementById('music_duration').innerText = trackData.diration
        liTemplate.getElementById('audio').src = trackData.music
        liTemplate.getElementById('audio').innerText = trackIndex
        liTemplate.getElementById('audio').setAttribute('audio-id', `${trackData.id} `)
        liTemplate.getElementById('audio').setAttribute('track-cat', `${trackCat}`)
        liTemplate.getElementById('download-track').href = `${trackData.music}`
        liTemplate.getElementById('share-track').setAttribute('music-href', `${trackData.music}`)
        liTemplate.getElementById('share-track-svg').setAttribute('music-href', `${trackData.music}`)
        liTemplate.getElementById('share-track-path').setAttribute('music-href', `${trackData.music}`)

        if (globalMusic && globalMusic.currentTime > 0) {
            this.globalMusicCheck(trackData, liTemplate, globalMusic)
        }
        App.getMusicHandler().musicSelected(liTemplate, trackData, globalMusic);

        return liTemplate

    }
    async singleTrackRender(musicBox, musicData, globalMusic) {
        musicBox.innerHTML = ''

        const musicTemplate = document.getElementById('music_template')
        const musicTemp = document.importNode(musicTemplate.content, true)

        musicTemp.getElementById('download-icon').href = `${musicData.music}`;
        musicTemp.getElementById('music_profile').src = musicData.image
        musicTemp.getElementById('music_name').innerText = musicData.name
        musicTemp.getElementById('music_artist').innerText = musicData.artist
        musicTemp.getElementById('audio').src = musicData.music
        musicTemp.getElementById('audio').setAttribute('audio-id', `${musicData.id} `)
        musicTemp.getElementById('audio').setAttribute('track-cat', `search`)
        musicTemp.getElementById('audio').setAttribute('audio-place', 'single')
        musicTemp.getElementById('share-icon').setAttribute('music-href', `${musicData.music}`)
        musicTemp.getElementById('share-icon-svg').setAttribute('music-href', `${musicData.music}`)
        musicTemp.getElementById('share-icon-path').setAttribute('music-href', `${musicData.music}`)
        musicTemp.getElementById('music_bg').style.backgroundImage = `linear-gradient(rgb(59 59 59 / 45%), rgb(33 32 32)),url('${musicData.image}')`;

        if (globalMusic) {
            this.globalMusicCheck(musicData, musicTemp, globalMusic)
        }

        App.getMusicHandler().musicSelected(musicTemp, musicData, globalMusic);

        musicBox.append(musicTemp)
    }
    homeArtistsRender(artistData) {

        const artistsLiTemplate = document.getElementById('artists_li_template')

        const artistLitemplate = document.importNode(artistsLiTemplate.content, true)
        artistLitemplate.querySelector('a').setAttribute('data-id', artistData.id)
        artistLitemplate.getElementById('artist_profile').src = artistData.profile
        artistLitemplate.getElementById('artist_name').innerText = artistData.artist
        return artistLitemplate
    }
    homeTracksRender(tracksData, itemIndex, tracksLiTemplate, trackUl, globalMusic) {

        const trackstemplate = document.importNode(tracksLiTemplate.content, true)

        trackstemplate.getElementById('track-a').setAttribute('data-id', tracksData.id)
        trackstemplate.querySelector('li').id = tracksData.id
        trackstemplate.getElementById('tracks_profile').src = tracksData.image
        trackstemplate.getElementById('tracks_artist').innerText = tracksData.artist
        trackstemplate.getElementById('tracks_music').innerText = tracksData.name
        trackstemplate.getElementById('audio').src = tracksData.music
        trackstemplate.getElementById('audio').innerText = itemIndex
        trackstemplate.getElementById('audio').setAttribute('track-ul', `${trackUl.id}`)
        trackstemplate.getElementById('audio').setAttribute('audio-id', `${tracksData.id}`)

        let trackUlAttr;
        if (globalMusic) {
            trackUlAttr = globalMusic.getAttribute('track-ul')
        }
        if (trackUl.id === trackUlAttr) {
            this.globalMusicCheck(tracksData, trackstemplate, globalMusic)
        }
        App.getMusicHandler().musicSelected(trackstemplate, tracksData, globalMusic);

        return trackstemplate

    }

    globalMusicCheck(trackData, liTemplate, globalMusic) {

        const trackId = parseInt(globalMusic.getAttribute('audio-id'))
        const trackDataId = parseInt(trackData.id)
        if (trackDataId != trackId) { return }

        this.globalMusicSet(liTemplate, globalMusic)

    }

    globalMusicSet(liTemplate, globalMusic) {

        liTemplate.getElementById('audio').setAttribute('situation', `${globalMusic.getAttribute('situation')} `)
        
        const globalMusicSituation = globalMusic.getAttribute('situation')
        this.globalMusicSituationSet(globalMusicSituation, liTemplate)
    }

    globalMusicSituationSet(situation, liTemplate) {
        if (situation === 'playing') {
            liTemplate.getElementById('play-pause-box').classList.remove('opacity-0')
            liTemplate.getElementById('pause-icon').classList.add('hidden')
            liTemplate.getElementById('play-icon').classList.remove('hidden')

        }
        App.getMusicHandler().getGlobalMusic(liTemplate.getElementById('audio'))
    }
}
