import { App } from "./App";
import { DomInterAction } from "./DomInterAction";
import { Page } from "./Page";

export class Single extends Page {

    async singleTrackpreparing(itemId, globalMusic) {
        if (!itemId) { return }
        const musicData = await App.getFetchs().fetchSingleTrack(itemId)
        if (!musicData) { return }

        await App.getMusicHandler().singleTrackData(musicData)

        const musicBox = document.getElementById('music_box')
        if (!musicBox) { return }

        await App.getMusicElmRender().singleTrackRender(musicBox, musicData, globalMusic)

        this.getMusicByArtist(musicData.artist, musicData.id, globalMusic)

        return musicData
    }

    musicByArtistSelection(artist, id, globalMusic) {

        const artistNav = document.getElementById('artist')
        if (!artistNav) { return }
        artistNav.addEventListener('click', () => {
            this.getMusicByArtist(artist, id, globalMusic)
        })
    }
    musicByGenreSelection(category, id, globalMusic) {
        const categoryNav = document.getElementById('genre')
        if (!categoryNav) { return }
        categoryNav.addEventListener('click', () => {
            this.getMusicByGenre(category, id, globalMusic)
        })
    }

    async getMusicByArtist(artist, id, globalMusic) {
        const musicsData = await App.getFetchs().fetchByArtist(artist, id)
        App.getMusicHandler().getSearchResaults(musicsData)
        const trackCat = 'search'
        this.prepareForRender(musicsData, trackCat, globalMusic)
    }

    async getMusicByGenre(category, id, globalMusic) {
        const musicsData = await App.getFetchs().fetchByGenre(category, id)
        App.getMusicHandler().getCategoryResaults(musicsData)
        const trackCat = 'category'
        this.prepareForRender(musicsData, trackCat, globalMusic)
    }

    prepareForRender(musicsData, trackCat, globalMusic) {

        const musicsUl = document.getElementById('musics_ul')
        const musicLiTemp = document.getElementById('music_li_template')

        if (!musicsUl) { return }

        musicsUl.innerHTML = ''

        this.notFoundMessageSet(musicsData)
        if (!musicsData) { return }
       
        musicsData.forEach((item) => {
            musicsUl.append(App.getMusicElmRender().playListRender(item, musicsData.indexOf(item), trackCat, globalMusic, musicLiTemp))
        })
        if (globalMusic) {
            this.globalMusicSet(globalMusic)
        }
    }
    notFoundMessageSet(musicsData) {
        if (!musicsData) {
            return new DomInterAction().shwoNotFoundDataMessage()
        } else {
            new DomInterAction().hideNotFoundDataMessage()
        }
    }
    async globalMusicSet(globalMusic) {
        await App.getMusicHandler().globalMusicSet(globalMusic)

    }
    async after(itemId, globalMusic) {

        const musicData = await this.singleTrackpreparing(itemId, globalMusic)
        if (!musicData) { return }
        
        document.addEventListener('globalMusic', (event) => {
            this.musicByArtistSelection(musicData.artist, musicData.id, event.detail.globalMusic)
            this.musicByGenreSelection(musicData.category, musicData.id, event.detail.globalMusic)
        })

        this.musicByArtistSelection(musicData.artist, musicData.id, globalMusic)
        this.musicByGenreSelection(musicData.category, musicData.id, globalMusic)
    }
}