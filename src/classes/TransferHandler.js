import { Router } from "./Router"
import { Fetch } from "./Fetch"
import { routes } from "../routes"

export class TransferHandler {
    constructor() {

        document.addEventListener('globalMusic', (event) => {

            this.handleNavLink(event.detail.globalMusic)
        })

        document.addEventListener('globalMusic', (event) => {

            this.handleHistory(event.detail.globalMusic)
        })
        this.handleNavLink()
        this.handleHistory()
        this.router = new Router(routes)
        this.fetch = new Fetch()
    }
    handleNavLink(globalMusic) {

        document.addEventListener('click', (event) => {

            let page;
            let itemId;


            if (!event.target.getAttribute('download-link')) {
                event.preventDefault()
            }

            if (event.target.tagName === 'A') {

                page = event.target.getAttribute('href')
                itemId = event.target.getAttribute('data-id')
            }

            if (event.target.tagName === 'IMG') {

                page = event.target.parentElement.getAttribute('href')
                itemId = event.target.parentElement.getAttribute('data-id')
            }


            if (page != null) {
                this.router.navigateTo(page, itemId, globalMusic)
            }

        })
    }
    handleHistory() {
        window.addEventListener('popstate', (event) => {
            const route = event.state ? event.state.route : 'Home';
            this.router.navigateTo(route);
        })
    }
}
