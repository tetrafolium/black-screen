import {KeyboardAction, SplitDirection} from "../../Enums";
import {remote} from "electron";
import {getAcceleratorForAction} from "../keyevents/Keybindings";



export function buildMenuTemplate(app: Electron.App, browserWindow: Electron.BrowserWindow): Electron.MenuItemOptions[] {
    const template: Electron.MenuItemOptions[] = [
        {
            label: "Black Screen",
            submenu: [
                {
                    label: "About Black Screen",
                    role: "about",
                },
                {
                    type: "separator",
                },
                {
                    label: "Hide Black Screen",
                    accelerator: getAcceleratorForAction(KeyboardAction.blackScreenHide),
                    click: () => {
                        app.hide();
                    },
                },
                {
                    label: "Hide Others",
                    accelerator: getAcceleratorForAction(KeyboardAction.blackScreenHideOthers),
                    role: "hideothers",
                },
                {
                    type: "separator",
                },
                {
                    label: "Quit",
                    accelerator: getAcceleratorForAction(KeyboardAction.blackScreenQuit),
                    click: () => {
                        app.quit();
                    },
                },
            ],
        },
        {
            label: "Edit",
            submenu: [
                {
                    label: "Undo",
                    accelerator: getAcceleratorForAction(KeyboardAction.editUndo),
                    role: "undo",
                },
                {
                    label: "Redo",
                    accelerator: getAcceleratorForAction(KeyboardAction.editRedo),
                    role: "redo",
                },
                {
                    label: "Find",
                    accelerator: getAcceleratorForAction(KeyboardAction.editFind),
                    click: () => {
                        (document.querySelector("input[type=search]") as HTMLInputElement).select();
                    },
                },
                {
                    type: "separator",
                },
                {
                    label: "Cut",
                    accelerator: getAcceleratorForAction(KeyboardAction.clipboardCut),
                    role: "cut",
                },
                {
                    label: "Copy",
                    accelerator: getAcceleratorForAction(KeyboardAction.clipboardCopy),
                    role: "copy",
                },
                {
                    label: "Paste",
                    accelerator: getAcceleratorForAction(KeyboardAction.clipboardPaste),
                    role: "paste",
                },
                {
                    label: "Select All",
                    accelerator: getAcceleratorForAction(KeyboardAction.editSelectAll),
                    role: "selectall",
                },
            ],
        },
        {
            label: "View",
            submenu: [
                {
                    label: "Reload",
                    accelerator: getAcceleratorForAction(KeyboardAction.viewReload),
                    click: () => {
                        browserWindow.reload();
                    },
                },
                {
                    label: "Toggle Full Screen",
                    accelerator: getAcceleratorForAction(KeyboardAction.viewToggleFullScreen),
                    click: () => {
                        browserWindow.setFullScreen(!browserWindow.isFullScreen());
                    },
                },
                {
                    label: "Toggle Developer Tools",
                    accelerator: getAcceleratorForAction(KeyboardAction.developerToggleTools),
                    click: () => {
                        browserWindow.webContents.toggleDevTools();
                    },
                },
            ],
        },
        {
            label: "Window",
            submenu: [
                {
                    label: "Add Tab",
                    accelerator: getAcceleratorForAction(KeyboardAction.tabNew),
                    click: () => {
                        window.application.addTab();
                    },
                },
                {
                    label: "Split Horizontally",
                    accelerator: getAcceleratorForAction(KeyboardAction.windowSplitHorizontally),
                    click: () => {
                        window.focusedTab.addPane(SplitDirection.Horizontal);
                        window.application.forceUpdate();
                    },
                },
                {
                    label: "Split Vertically",
                    accelerator: getAcceleratorForAction(KeyboardAction.windowSplitVertically),
                    click: () => {
                        window.focusedTab.addPane(SplitDirection.Vertical);
                        window.application.forceUpdate();
                    },
                },
            ],
        },
        {
            label: "Pane",
            submenu: [
                {
                    label: "Previous",
                    accelerator: getAcceleratorForAction(KeyboardAction.tabPrevious),
                    click: () => {
                        window.focusedTab.activatePreviousPane();
                        window.application.forceUpdate();
                    },
                },
                {
                    label: "Next",
                    accelerator: getAcceleratorForAction(KeyboardAction.tabNext),
                    click: () => {
                        window.focusedTab.activateNextPane();
                        window.application.forceUpdate();
                    },
                },
                {
                    label: "Close",
                    accelerator: getAcceleratorForAction(KeyboardAction.tabClose),
                    click: () => {
                        window.application.closeFocusedPane();
                        window.application.forceUpdate();
                    },
                },
            ],
        },
        {
            label: "Help",
            submenu: [
                {
                    label: "GitHub Repository",
                    click: () => {
                        /* tslint:disable:no-unused-expression */
                        remote.shell.openExternal("https://github.com/shockone/black-screen");
                    },
                },
            ],
        },
    ];
    return template;
}
