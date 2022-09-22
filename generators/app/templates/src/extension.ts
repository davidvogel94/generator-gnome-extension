/// <reference path="../node_modules/gnome-shell-extension-types/global.d.ts"/>

import './styles/stylesheet.css';

const {St, Clutter} = imports.gi;
const Main = imports.ui.main;

class GnomeExtension {
    private panelButton: StButton;

    constructor() {
        // Create a Button with "Hello World" text
        let panelButtonText = new St.Label({
            text: 'Hello World!',
            y_align: Clutter.ActorAlign.CENTER,
        });
        this.panelButton = new St.Button({
            style_class: 'panel-button',
            child: panelButtonText
        });
    }
    
    enable(): void {
        // Add the button to the panel
        Main.panel._rightBox.insert_child_at_index(this.panelButton, 0);
    }
    
    disable(): void {
        // Remove the added button from panel
        Main.panel._rightBox.remove_child(this.panelButton);
    }
}

export default function(): GnomeExtension {
    return new GnomeExtension();
}

