import { App } from "./App";
import { DomInterAction } from "./DomInterAction";
import { Page } from "./Page"
export class Search extends Page {

    searchDefaultBg() {
        new DomInterAction().hideNotFoundDataMessage()

        const searchUl = document.getElementById('search_ul')
        searchUl.innerHTML = '';

        const searchDefaultBgTemplate = document.getElementById('serach_default_bg_template')
        const searchDefaultBgTemp = document.importNode(searchDefaultBgTemplate.content, true)

        searchUl.append(searchDefaultBgTemp)


        return searchDefaultBgTemp
    }
    async getMusicByGenreIndefaultBg(globalMusic) {
        document.getElementById('search_ul').addEventListener('click', (event) => {
            if (event.target.nodeName !== 'P') { return }
            const genreName = event.target.innerText
            this.fetchMusicByGenre(genreName, globalMusic)
        })
    }
    async fetchMusicByGenre(genreName,globalMusic) {
        const id = 0;
        const getMusicByGenre = await App.getFetchs().fetchByGenre(genreName, id);
        if (!getMusicByGenre) { return }
        this.prepareForRender(getMusicByGenre, globalMusic)
    }
    async getInput(globalMusic) {
        const inputSearch = document.getElementById('serach_artist')
        this.prapareFroSearch(inputSearch, globalMusic);
    }

    async prapareFroSearch(inputSearch, globalMusic) {
        await inputSearch.addEventListener('keyup', () => {
            this.doSearch(inputSearch, globalMusic)
        })
    }

    async doSearch(inputSearch, globalMusic) {

        if (!inputSearch.value) { return this.searchDefaultBg() }
        const searchResault = await App.getFetchs().fetchSearchsData(inputSearch.value)


        App.getMusicHandler().getSearchResaults(searchResault)
        this.prepareForRender(searchResault, globalMusic)
    }

    prepareForRender(searchResault, globalMusic) {

        const searchUl = document.getElementById('search_ul')
        const serachLiTemplateElm = document.getElementById('search_li_template')

        searchUl.innerHTML = '';

        this.notFoundMessageSet(searchResault)

        if (!searchResault) { return }

        const trackCat = 'search';

        searchResault.forEach((item) => {
            searchUl.append(App.getMusicElmRender().playListRender(item, searchResault.indexOf(item), trackCat, globalMusic, serachLiTemplateElm))
        })
    }

    notFoundMessageSet(searchResault) {
        if (!searchResault) {
            return new DomInterAction().shwoNotFoundDataMessage()
        } else {
            new DomInterAction().hideNotFoundDataMessage()
        }

    }
    async after(itemId, globalMusic) {
        await this.getInput(globalMusic)
        await this.getMusicByGenreIndefaultBg(globalMusic)
    }
}