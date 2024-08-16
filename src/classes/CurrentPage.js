import { App } from "./App";

export class CurrentPage {
    constructor() {
        this.currentPage()
    }

    currentPage() {
        let url;
        const getPageLink = (window.location.href).split('/')
        const pageLink = getPageLink.slice(-1)
        url = pageLink[0]
      
        if (!url || url === 'Single') {
            url = 'Home'
        }
        App.transferHandler.router.navigateTo(url)
        const liTag = document.getElementById(`${url}`)
        App.getDomInterAction().menuNavActSet(liTag)
    }

}