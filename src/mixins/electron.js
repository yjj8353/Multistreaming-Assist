import { dialog } from "@tauri-apps/api";
import { appConfigDir } from "@tauri-apps/api/path";
import { appWindow } from "@tauri-apps/api/window";
import { shell } from "@tauri-apps/api";

export const ElectronMixin = {
  name: "ElectronMixin",

  methods: {
    minimizeApp() {
      appWindow.minimize();
    },

    maximizeApp() {
      appWindow.toggleMaximize();
    },

    closeApp() {
      const result = window.nginx.isWorking();

      if (result) {
        this.openNginxStillRunningAlert = true;
      } else {
        appWindow.close();
      }
    },

    async openDialog(path) {
      if (path) {
        return await dialog.open({
          directory: true,
          multiple: false,
          defaultPath: path,
        });
      } else {
        return await dialog.open({
          directory: true,
          multiple: false,
          defaultPath: await appConfigDir(),
        });
      }
    },

    async openWebPage(url) {
      await shell.open(url);
    },
  },
};
