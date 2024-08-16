import { App } from "./App"
import { Page } from "./Page"

export class Home extends Page {

    async getArtists() {
        const musicsCat = 'artists'
        const artistsInfo = await App.getFetchs().fetchArtists()
        if (!artistsInfo) { return }
        const artistsUl = document.getElementById('artists_ul')
        if (!artistsUl) { return }
        artistsInfo.forEach(item => {
            artistsUl.append(App.getMusicElmRender().homeArtistsRender(item))
        })

    }
    async getNewTracks(currentMusic) {

        const newTracksInfo = await App.getFetchs().fetchNewTracks()
        if (!newTracksInfo) { return }
        const newTracksUl = document.getElementById('new_tracks_ul')
        const trackstemplate = document.getElementById('new_tracks_li_template')


        await this.prepareForTracksRender(newTracksInfo, newTracksUl, trackstemplate, currentMusic)
    }

    async getDjMixes(currentMusic) {

        const djMixesInfo = await App.getFetchs().fetchDjMixes()
        if (!djMixesInfo) { return }
        const djMixesUl = document.getElementById('djMixes_ul')
        const djMixesLiTemplate = document.getElementById('djMixes_li_template')

        await this.prepareForTracksRender(djMixesInfo, djMixesUl, djMixesLiTemplate, currentMusic)
    }

    async getTopWeeks(currentMusic) {
        const topWeekInfo = await App.getFetchs().fetchTopWeek()
        if (!topWeekInfo) { return }
        const topWeekUl = document.getElementById('top_week_ul')
        const topWeeksLiTemplate = document.getElementById('top_week_li_template')

        await this.prepareForTracksRender(topWeekInfo, topWeekUl, topWeeksLiTemplate, currentMusic)
    }

    async getTopMonthes(currentMusic) {
        const topMonthInfo = await App.getFetchs().fetchTopMonth()
        if (!topMonthInfo) { return }
        const topMonthUl = document.getElementById('top_month_ul')
        const topmonthesLiTemplate = document.getElementById('top_month_li_template')
        await this.prepareForTracksRender(topMonthInfo, topMonthUl, topmonthesLiTemplate, currentMusic)
    }

    async prepareForTracksRender(trackInfo, trackUl, tracLiTemplate, currentMusic) {
        if (!trackUl) { return }
        trackInfo.forEach(item => {
            trackUl.append(App.getMusicElmRender().homeTracksRender(item, trackInfo.indexOf(item), tracLiTemplate, trackUl, currentMusic))
        })

    }
    async after(itemId, currentMusic) {
        await this.getArtists()
        await this.getNewTracks(currentMusic)
        await this.getDjMixes(currentMusic)
        await this.getTopWeeks(currentMusic)
        await this.getTopMonthes(currentMusic)
    }

}