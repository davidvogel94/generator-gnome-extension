import { main as Main } from '@gnome-shell-ts-declarations/ui';
import { panelButton } from '@gnome-extension/ui/panelButton';
import './styles/stylesheet.css';

//@ts-ignore
const getCurrentExtension = (): any => imports.misc.extensionUtils.getCurrentExtension();

enum PanelBoxes {
  LEFT = 0,
  CENTER = 1,
  RIGHT = 2,
}

class JiraIssueTrackerExtension {
  //@ts-ignore
  private panelButton: PanelMenu.Button;

  constructor() {}

  enable(): void {
    // Create a Button with "Hello World" text
    this.panelButton = new panelButton('Hello World');
    // Add the button to the panel
    Main.panel.addToStatusArea(getCurrentExtension().metadata.uuid, this.panelButton, 1, PanelBoxes.RIGHT);
  }

  disable(): void {
    // Remove the added button from panel
    this.panelButton.destroy();
  }
}

export default function (): JiraIssueTrackerExtension {
  return new JiraIssueTrackerExtension();
}
