import { defineStore } from "pinia";

export const useKeyStore = defineStore("key", {
  state: () => ({
    _twitchKey: "",
    _youtubeKey: "",
    _additionalRTMPUrl: "",
    _additionalRTMPKey: "",
  }),

  getters: {
    twitchKey(state) {
      return state._twitchKey;
    },

    youtubeKey(state) {
      return state._youtubeKey;
    },

    additionalRTMPUrl(state) {
      return state._additionalRTMPUrl;
    },

    additionalRTMPKey(state) {
      return state._additionalRTMPKey;
    },

    fullTwitchUrl(state) {
      const fullTwitchUrl = state._twitchKey.trim()
        ? "push rtmp://live-sel.twitch.tv/app/" + state._twitchKey.trim() + ";"
        : "";
      return fullTwitchUrl;
    },

    fullYoutubeUrl(state) {
      const fullYoutubeUrl = state._youtubeKey.trim()
        ? "push rtmp://a.rtmp.youtube.com/live2/" +
          state._youtubeKey.trim() +
          ";"
        : "";
      return fullYoutubeUrl;
    },

    fullAdditionalUrl(state) {
      let fullAdditionalRTMPUrl =
        "push " +
        state._additionalRTMPUrl.trim() +
        "/" +
        state._additionalRTMPKey.trim() +
        ";";

      if (fullAdditionalRTMPUrl === "push /") {
        fullAdditionalRTMPUrl = "";
      }

      return fullAdditionalRTMPUrl;
    },
  },

  actions: {
    setTwitchKey(key) {
      this._twitchKey = key;
    },

    setYoutubeKey(key) {
      this._youtubeKey = key;
    },

    setAdditionalRTMPUrl(url) {
      this._additionalRTMPUrl = url;
    },

    setAdditionalRTMPKey(key) {
      this._additionalRTMPKey = key;
    },
  },
});
