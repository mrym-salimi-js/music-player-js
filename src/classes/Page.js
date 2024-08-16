import { App } from "./App";
import { DomInterAction, SliderRunnerDom } from "./DomInterAction";

export class Page {
    constructor(page) {

        this.page = page
        this.main = document.querySelector('.main_tracks')

    }
    async rendePage(itemId, globalMusic) {

        await fetch(`pages/${this.page}.html`)
            .then(response => response.text())
            .then(html => {

                this.main.innerHTML = html;
                this.after(itemId, globalMusic)
                new DomInterAction()

                if (globalMusic) {
                    this.globalMusicSet(globalMusic)
                }

            })

    }

    async globalMusicSet(globalMusic) {

        await App.getMusicHandler().globalMusicSet(globalMusic)

    }

}