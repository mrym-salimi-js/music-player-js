
export class Router {
    constructor(page) {
        this.page = page

    }
    navigateTo(url, itemId = null, currentMusic = null) {
        const page = this.page.find(item => item.page === url)

        if (page) {
            page.rendePage(itemId, currentMusic)

            history.pushState({ route: url }, '', url)
        }

    }

}
