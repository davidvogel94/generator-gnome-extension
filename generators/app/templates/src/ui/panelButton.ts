import St from '@gi-types/st1';
import GObject from '@gi-types/gobject2';
import panelMenu from '@gnome-shell-ts-declarations/ui/panelMenu';

export const panelButton = GObject.registerClass(
  {
    GTypeName: 'panelButton',
  },
  class panelButton extends panelMenu.Button {
    constructor(name: string, createMenu = false) {
      super({
        nameText: 'Button',
        dontCreateMenu: !createMenu,
      });

      this.name = name;

      const button = new St.Button({
        style_class: 'panel-status-menu-box',
        label: name,
      });

      this.add_child(button);
    }
  },
);
