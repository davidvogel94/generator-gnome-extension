import St from "@gi-types/st1";
import Clutter from "@gi-types/clutter10";
import { panelMenu as PanelMenu } from "./panelMenu";

export class panelMenu {}

export class PopupMenu {
    constructor(sourceActor: Clutter.Actor, arrowAlignment, arrowSide)
}

export class main {
    static panel: panel;
}

export class panel extends St.Widget {
    get boxOpacity(): number;
    set boxOpacity(value: number);

    addToStatusArea(role: String, indicator: PanelMenu.Button | St.Button, position: number, box: number): PanelMenu.Button;
    toggleAppMenu(): void;
    toggleCalendar(): void;
    closeCalendar(): void;
    closeQuickSettings(): void
}