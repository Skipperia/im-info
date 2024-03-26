/**
 * Copyright (c) 2021, Guasam
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author  : guasam
 * @project : Electron Window
 * @package : Titlebar Menu Items
 */

export type TitlebarMenuItem = {
  name: string;
  action?: string;
  shortcut?: string;
  value?: string | number | boolean;
  items?: TitlebarMenuItem[];
};

export type TitlebarMenu = {
  name: string;
  items: TitlebarMenuItem[];
};


const titlebarMenus: TitlebarMenu[] = [
  {
    name: 'File',
    items: [
      {
        name: "Change Theme",
        action: 'changeTheme'
      },
      {
        name: 'Exit',
        action: 'exit',
        value: true
      }
    ],
  },
  {
    name: 'Edit',
    items: [
      {
        name: 'Toggle Advanced View',
        action: 'toggleAdvancedView'
      },
    ],
  },
  {
    name: 'View',
    items: [
      {
        name: 'Reload',
        action: 'reload',
        shortcut: 'Ctrl+R',
      },
      {
        name: 'Force Reload',
        action: 'force_reload',
        shortcut: 'Ctrl+Shift+R',
      },
      {
        name: 'Toogle Developer Tools',
        action: 'toggle_devtools',
        shortcut: 'Ctrl+Shift+I',
      },
      {
        name: '__',
      },
      {
        name: 'Toggle Fullscreen',
        action: 'toggle_fullscreen',
        shortcut: 'F11',
      },
    ],
  },
  {
    name: 'Credits',
    items: [
      {
        name: 'Alex',
        action: 'open_url',
        value: 'https://github.com/Skipperia',
        shortcut: '@Skipperia',
      },
    ],
  },
];

export default titlebarMenus;
