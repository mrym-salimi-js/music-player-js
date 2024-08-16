
export class SocialSharing {
    constructor() {
        this.musicUrl;

        this.telegram = document.getElementById('telegram')
        this.whatsApp = document.getElementById('whats-app')
        this.faceBook = document.getElementById('face-book')
        this.linkdin = document.getElementById('linkdin')
        this.sharingIconsBox = document.getElementById('sharing-icon-box')
        this.extSharingIconsBox = document.getElementById('ext-sharing-icon-box')

        this.socialSharingHrefSetPreparing()
        this.exitSocialSharingBox()
    }
    socialSharingHrefSetPreparing() {
        document.addEventListener('click', (event) => {

            const musicUrl = event.target.getAttribute('music-href')
            if (!musicUrl) { return }

            this.socialSharingHrefSet(musicUrl)
        })
    }

    socialSharingHrefSet(musicUrl) {

        this.telegram.setAttribute('href', `https://telegram.me/share/url?url=${musicUrl}&text=MyMusic.ir`)

        this.whatsApp.setAttribute('href', `https://api.whatsapp.com/send?text=${musicUrl}`)
        this.faceBook.setAttribute('href', `https://www.facebook.com/share.php?u=${musicUrl}`)
        this.linkdin.setAttribute('href', `https://www.linkedin.com/sharing/share-offsite/?url=${musicUrl}`)


        this.sharingIconsBox.classList.remove('hidden');
    }

    exitSocialSharingBox() {
        this.extSharingIconsBox.addEventListener('click', () => {
            this.sharingIconsBox.classList.add('hidden');
        })
    }

}