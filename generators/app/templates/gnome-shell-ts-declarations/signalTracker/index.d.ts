import * as signals from "@gnome-shell-ts-declarations/signals";
import * as GObject from "@gi-types/gobject2";


export class TransientSignalHolder extends GObject.Object {
    constructor(owner: signals.EventEmitter);
    destroy(): void;
}

export class SignalManager {
    constructor();
    getDefault(): SignalManager;
    getSignalTracker(obj: GObject.Object): SignalTracker;
    maybeGetSignalTracker(obj: GObject.Object): SignalTracker;
    removeSignalTracker(obj: GObject.Object): void;
}

export class SignalTracker {
    constructor(owner: GObject.Object);
    track(obj: GObject.Object, ...handlerIds: number[]): void;
    untrack(obj: GObject.Object): void;
    clear(): void;
    destroy(): void;
}

export function connectObject(thisObj: GObject.Object, ...args: any[]): void;
export function disconnectObject(thisObj: GObject.Object, obj: GObject.Object): void;
export function registerDestroyableType(gtype: GObject.Type): void;