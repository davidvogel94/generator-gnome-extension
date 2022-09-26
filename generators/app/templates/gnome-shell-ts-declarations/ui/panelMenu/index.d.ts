import St from "@gi-types/st1";
import { PopupMenu } from "@gnome-shell-ts-declarations/ui";

export namespace panelMenu {
    export class ButtonBox extends St.Widget {
        parent: St.Widget;
    }
    export class Button extends ButtonBox {
        

        public setSensitive(sensitive: boolean): void;
        public setMenu(menu: PopupMenu): void;
    }
}

export default panelMenu;