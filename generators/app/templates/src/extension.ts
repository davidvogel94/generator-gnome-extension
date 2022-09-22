/// <reference path="../node_modules/gnome-shell-extension-types/global.d.ts"/>

const {St, Clutter} = imports.gi;
const Main = imports.ui.main;

let panelButton: StButton;

function init () {
    // Create a Button with "Hello World" text
    let panelButtonText = new St.Label({
        text : "Hello World",
        y_align: Clutter.ActorAlign.CENTER,
    });
    panelButton = new St.Button({
        style_class : "panel-button",
        child: panelButtonText
    });
}

function enable () {
    // Add the button to the panel
    Main.panel._rightBox.insert_child_at_index(panelButton, 0);
}

function disable () {
    // Remove the added button from panel
    Main.panel._rightBox.remove_child(panelButton);
}