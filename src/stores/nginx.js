import { defineStore } from "pinia";

export const useNginxStore = defineStore("nginx", {
  state: () => ({
    _nginxRunning: false,
  }),

  getters: {
    isNginxRunning(state) {
      return state._nginxRunning;
    },
  },

  actions: {
    nginxOn() {
      this._nginxRunning = true;
    },

    nginxOff() {
      this._nginxRunning = false;
    },
  },
});
