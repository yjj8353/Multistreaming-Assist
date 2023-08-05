import { defineStore } from "pinia";

export const useComponentStore = defineStore("component", {
  state: () => ({
    _openNginxStatusAlert: false,
    _openNginxStillRunningAlert: false,
    _openPathErrorAlert: false,
    _openUpdateAlert: false,
  }),

  getters: {
    isOpenNginxStatusAlert(state) {
      return state._openNginxStatusAlert;
    },

    isOpenNginxStillRunningAlert(state) {
      return state._openNginxStillRunningAlert;
    },

    isOpenPathErrorAlert(state) {
      return state._openPathErrorAlert;
    },

    isOpenUpdateAlert(state) {
      return state._openUpdateAlert;
    },
  },

  actions: {
    openNginxStatusAlert() {
      this._openNginxStatusAlert = true;
    },

    openNginxStillRunningAlert() {
      this._openNginxStillRunningAlert = true;
    },

    openPathErrorAlert() {
      this._openPathErrorAlert = true;
    },

    openUpdateAlert() {
      this._openUpdateAlert = true;
    },

    closeNginxStatusAlert() {
      this._openNginxStatusAlert = false;
    },

    closeNginxStillRunningAlert() {
      this._openNginxStillRunningAlert = false;
    },

    closePathErrorAlert() {
      this._openPathErrorAlert = false;
    },

    closeUpdateAlert() {
      this._openUpdateAlert = false;
    },
  },
});
