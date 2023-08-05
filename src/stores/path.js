import { dirname, resourceDir } from "@tauri-apps/api/path";

import { defineStore } from "pinia";

export const usePathStore = defineStore("path", {
  state: () => ({
    _dirname: "",
    _rootPath: "",
    _nginxPath: "",
    _nginxConfPath: "",
    _nginxLogsPath: "",
    _recordingPath: "",
  }),

  getters: {
    dirname(state) {
      return state._dirname;
    },

    rootPath(state) {
      return state._rootPath;
    },

    nginxPath(state) {
      return state._nginxPath;
    },

    nginxConfPath(state) {
      return state._nginxConfPath;
    },

    nginxLogsPath(state) {
      return state._nginxLogsPath;
    },

    recordingPath(state) {
      return state._recordingPath;
    },
  },

  actions: {
    async setDirname() {
      const resourceDirPath = await resourceDir();
      this._dirname = await dirname(resourceDirPath);
    },

    setRootAndNginxPaths() {
      this._rootPath = this._dirname;
      this._nginxPath = this._rootPath + "\\nginx";
      this._nginxConfPath = this._nginxPath + "\\conf";
      this._nginxLogsPaht = this._nginxPath + "\\logs";
    },

    setRecordingPath(path) {
      this._recordingPath = path;
    },
  },
});
