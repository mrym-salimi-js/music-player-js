
import { TransferHandler } from "./TransferHandler";
import { Home } from "./Home";
import { MusicHandler } from "./MusicHandler";
import { RenderElements } from "./RenderElements";
import { SocialSharing } from "./SocialSharing";
import { CurrentPage } from "./CurrentPage";
import { DomInterAction } from "./DomInterAction";

export class App {

    static init() {

        this.transferHandler = new TransferHandler()
        this.home = new Home()
        this.musicHandler = new MusicHandler()
        this.musicElmRender = new RenderElements()
        this.socialShairing = new SocialSharing()
        this.domInterAction = new DomInterAction()
        new CurrentPage()
    }

    static getFetchs() {

        return this.transferHandler.fetch;

    }
    static getHome() {
        return this.home;
    }

    static getMusicHandler() {
        return this.musicHandler;
    }

    static getMusicElmRender() {
        return this.musicElmRender;
    }
    static getDomInterAction() {
        return this.domInterAction;
    }

}
