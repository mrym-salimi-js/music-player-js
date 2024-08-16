export class DomInterAction {
    constructor() {
        this.ulTags = document.querySelectorAll('.ul-box')
        this.navLis = document.querySelectorAll('.nav-li')
        this.tabNavs = document.querySelectorAll('.tab-nav')
        this.menuLogo = document.getElementById('menu-logo')

        this.sliderActions()
        this.tabNavActions()
        this.menuNavActions()
        this.socialSharingShow()
        this.menuLogoAction()
    }

    shwoNotFoundDataMessage() {
        document.getElementById('not-found').classList.remove('hidden')
    }

    hideNotFoundDataMessage() {
        document.getElementById('not-found').classList.add('hidden')
    }

    socialSharingShow() {
        const socialSharingBoxElm = document.getElementById('sharing-icon-box')
        const getSocialSharingElmHide = socialSharingBoxElm.classList.contains('hidden')
        if (!getSocialSharingElmHide) {
            socialSharingBoxElm.classList.add('hidden')
        }
    }

    tabNavActions() {
        this.tabNavs.forEach((tabNav) => {
            tabNav.addEventListener('click', () => {
                this.tabNavs.forEach((tnv) => {
                    tnv.classList.remove('border-b-2')
                    tnv.classList.remove('border-[#fbe81d]')
                })
                tabNav.classList.add('border-b-2')
                tabNav.classList.add('border-[#fbe81d]')
            })
        })
    }

    menuLogoAction() {
        this.menuLogo.addEventListener('click', () => {
            const liTag = document.getElementById('Home')
            this.menuNavActSet(liTag)
        })
    }
    menuNavActions() {
        this.navLis.forEach((navLi) => {
            navLi.addEventListener('click', () => {
                this.menuNavActSet(navLi)
            })
        })
    }

    menuNavActSet(navLi) {
        this.navLis.forEach((li) => {
            li.classList.remove('bg-[#212121]')
        })
        navLi.classList.add('bg-[#212121]')
    }

    sliderActions() {

        let pressed = false
        let startX = 0
        let scrollLeft;

        this.ulTags.forEach((ulTag) => {
            ulTag.addEventListener('mousedown', (event) => {
                pressed = true;
                if (startX > 0) { return }

                startX = event.pageX - ulTag.offsetLeft;
                scrollLeft = ulTag.scrollLeft;
            })

            ulTag.addEventListener('mouseleave', () => {
                pressed = false
            })

            window.addEventListener('mouseup', () => {
                pressed = false
            })

            ulTag.addEventListener('mousemove', (event) => {
                if (!pressed) { return }

                const x = event.pageX - ulTag.offsetLeft;
                const walk = x - startX;
                ulTag.scrollLeft = scrollLeft - walk;
            })
        })
    }

}