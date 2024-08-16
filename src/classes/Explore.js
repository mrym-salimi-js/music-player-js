import { Page } from "./Page"
import { App } from "./App"
import { DomInterAction } from "./DomInterAction"

export class Explore extends Page {

    async exploreFirstShow(globalMusic) {

        new DomInterAction().hideNotFoundDataMessage()

        const navName = 'suggestion'
        const firstShoData = await App.getFetchs().fetchExploreData(navName)
        if (!firstShoData) { return }
        this.prepareForRender(firstShoData, globalMusic, navName)
    }

    async prepareForShowExplore(globalMusic) {
        const exploreUl = document.getElementById('explore_ul');
        if (!exploreUl) { return }

        document.getElementById('explore_nav').addEventListener('click', (event) => {
            if (event.target.nodeName !== 'P') { return }
            const navName = event.target.getAttribute('text')
            this.fetchExplore(navName, globalMusic)
        })
    }

    async fetchExplore(navName, globalMusic) {
        if (!navName) { return }
        const exploreData = await App.getFetchs().fetchExploreData(navName)
        if (!exploreData) { return }
        this.prepareForRender(exploreData, globalMusic, navName)
    }

    prepareForRender(exploreData, globalMusic, trackCat) {
        const exploreUl = document.getElementById('explore_ul')
        const exploreLiTemplateElm = document.getElementById('explore_li_template')

        if (!exploreUl) { return }

        exploreUl.innerHTML = ''

        this.notFoundMessageSet(exploreData)
        if (!exploreData) { return }
        
        exploreData.forEach(item => {
            exploreUl.append(App.getMusicElmRender().playListRender(item, exploreData.indexOf(item), trackCat, globalMusic, exploreLiTemplateElm))
        })

        if (globalMusic) {
            this.globalMusicSet(globalMusic)
        }
    }
    notFoundMessageSet(exploreData) {
        if (!exploreData) {
            return new DomInterAction().shwoNotFoundDataMessage()
        } else {
            new DomInterAction().hideNotFoundDataMessage()
        }
    }
    async globalMusicSet(globalMusic) {
        await App.getMusicHandler().globalMusicSet(globalMusic)

    }

    async after(itemId, globalMusic) {
        document.addEventListener('globalMusic', (event) => {
            if (itemId) { return }
            this.prepareForShowExplore(event.detail.globalMusic)

        })
        await this.exploreFirstShow(globalMusic)
        await this.prepareForShowExplore(globalMusic)

    }

}