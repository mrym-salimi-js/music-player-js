import axios from "axios"
export class Fetch {
    constructor() {

        this.artistsInfo = []
        this.newTrackInfo = []
        this.djMixesInfo = []
        this.topWeekInfo = []
        this.topMonthInfo = []
        this.singleTrackInfo = []
    }

    async fetchArtists() {
        if (this.artistsInfo.length > 0) {
            return this.artistsInfo;
        }

        const artistData = await axios.get('http://myapi.iapp.ir/api/artists/8');
        this.artistsInfo = artistData.data.data
        return this.artistsInfo;
    }

    async fetchNewTracks() {
        if (this.newTrackInfo.length > 0) {
            return this.newTrackInfo
        }
        const { data: resault } = await axios.get('http://myapi.iapp.ir/api/NewTracks/8');
        const newTrackInfo = resault.data
        this.newTrackInfo = newTrackInfo
        return this.newTrackInfo;
    }
    async fetchDjMixes() {
        if (this.djMixesInfo.length > 0) {
            return this.djMixesInfo
        }
        const { data: resault } = await axios.get('http://myapi.iapp.ir/api/DjMixes/8');
        const djMixesInfo = resault.data
        this.djMixesInfo = djMixesInfo
        return this.djMixesInfo;
    }
    async fetchTopWeek() {
        if (this.topWeekInfo.length > 0) {
            return this.topWeekInfo
        }
        const { data: resault } = await axios.get('http://myapi.iapp.ir/api/TopWeek/8');
        const topWeekInfo = resault.data
        this.topWeekInfo = topWeekInfo
        return this.topWeekInfo;
    }
    async fetchTopMonth() {
        if (this.topMonthInfo.length > 0) {
            return this.topMonthInfo
        }
        const { data: resault } = await axios.get('http://myapi.iapp.ir/api/TopMonth/8');
        const topMonthInfo = resault.data
        this.topMonthInfo = topMonthInfo
        return this.topMonthInfo;
    }
    async fetchByGenre(category, id) {

        const { data: resault } = await axios.get(`http://myapi.iapp.ir/api/Category/${category}/8/${id}`, {
            validateStatus: function (status) {
                return status = 404
            }
        })
        const genresInfo = resault.data
        return genresInfo
    }
    async fetchByArtist(artist, id) {

        const { data: resault } = await axios.get(`http://myapi.iapp.ir/api/search/${artist}/${id}`, {
            validateStatus: function (status) {
                return status = 404
            }
        })

        const artistsInfo = resault.data

        return artistsInfo
    }
    async fetchSingleTrack(itemId) {
        if (this.singleTrackInfo.length > 0) {
            return this.singleTrack
        }
        const { data: resault } = await axios.get(`http://myapi.iapp.ir/api/Music/${itemId}`)
        const musicInfo = resault.data[0];
        this.singleTrackInfo = musicInfo
        return this.singleTrackInfo
    }
    async fetchExploreData(navName) {
        const { data: resault } = await axios.get(`http://myapi.iapp.ir/api/${navName}/8`);
        return resault.data
    }

    async fetchSearchsData(searchItem) {
        const { data: resault } = await axios.get(`http://myapi.iapp.ir/api/search/${searchItem}/0`, {
            validateStatus: function (status) {
                return status = 404
            }
        })
        return resault.data
    }

}