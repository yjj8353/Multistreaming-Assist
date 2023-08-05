import { defineStore } from "pinia";

export const useOptionStore = defineStore("option", {
  state: () => ({
    _updatePopupEnable: true,
  }),

  getters: {
    isUpdatePopupEnable(state) {
      return state._updatePopupEnable;
    },
  },

  actions: {
    updatePopupDisable() {
      this._updatePopupEnable = false;
    },
  },
});
