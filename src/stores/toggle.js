import { defineStore } from "pinia";

export const useToggleStore = defineStore("toggle", {
  state: () => ({
    _twitchOn: false,
    _youtubeOn: false,
    _additionalOn: false,
    _recordingOn: false,
  }),

  getters: {
    isTwitchOn(state) {
      return state._twitchOn;
    },

    isYoutubeOn(state) {
      return state._youtubeOn;
    },

    isAdditionalOn(state) {
      return state._additionalOn;
    },

    isRecordingOn(state) {
      return state._recordingOn;
    },
  },

  actions: {
    twitchOn() {
      this._twitchOn = true;
    },

    twitchOff() {
      this._twitchOn = false;
    },

    youtubeOn() {
      this._youtubeOn = true;
    },

    youtubeOff() {
      this._youtubeOn = false;
    },

    additionalOn() {
      this._additionalOn = true;
    },

    additionalOff() {
      this._additionalOn = false;
    },

    recordingOn() {
      this._recordingOn = true;
    },

    recordingOff() {
      this._recordingOn = false;
    },
  },
});
