import { mapActions, mapState } from "pinia";

import { useComponentStore } from "src/stores/component";
import { useKeyStore } from "src/stores/key";
import { useNginxStore } from "src/stores/nginx";
import { useOptionStore } from "src/stores/option";
import { usePathStore } from "src/stores/path";
import { useToggleStore } from "src/stores/toggle";

export const StoreMixin = {
  name: "StoreMixin",

  computed: {
    twitchKey: {
      get() {
        return this.getTwitchKey;
      },
      set(value) {
        this.setTwitchKey(value);
      },
    },

    youtubeKey: {
      get() {
        return this.getYoutubeKey;
      },
      set(value) {
        this.setYoutubeKey(value);
      },
    },

    additionalRTMPUrl: {
      get() {
        return this.getAdditionalRTMPUrl;
      },
      set(value) {
        this.setAdditionalRTMPUrl(value);
      },
    },

    additionalRTMPKey: {
      get() {
        return this.getAdditionalRTMPKey;
      },
      set(value) {
        this.setAdditionalRTMPKey(value);
      },
    },

    isTwitchOn: {
      get() {
        return this.getTwitchOn;
      },
      set(value) {
        value ? this.twitchOn() : this.twitchOff();
      },
    },

    isYoutubeOn: {
      get() {
        return this.getYoutubeOn;
      },
      set(value) {
        value ? this.youtubeOn() : this.youtubeOff();
      },
    },

    isAdditionalOn: {
      get() {
        return this.getAdditionalOn;
      },
      set(value) {
        value ? this.additionalOn() : this.additionalOff();
      },
    },

    isRecordingOn: {
      get() {
        return this.getRecordingOn;
      },
      set(value) {
        value ? this.recordingOn() : this.recordingOff();
      },
    },

    ...mapState(useComponentStore, {
      isOpenNginxStatusAlert: "isOpenNginxStatusAlert",
      isOpenNginxStillRunningAlert: "isOpenNginxStillRunningAlert",
      isOpenPathErrorAlert: "isOpenPathErrorAlert",
      isOpenUpdateAlert: "isOpenUpdateAlert",
    }),

    ...mapState(useKeyStore, {
      getTwitchKey: "twitchKey",
      getYoutubeKey: "youtubeKey",
      getAdditionalRTMPUrl: "additionalRTMPUrl",
      getAdditionalRTMPKey: "additionalRTMPKey",
      fullTwitchUrl: "fullTwitchUrl",
      fullYoutubeUrl: "fullYoutubeUrl",
      fullAdditionalUrl: "fullAdditionalUrl",
    }),

    ...mapState(useOptionStore, {
      isUpdatePopupEnable: "isUpdatePopupEnable",
    }),

    ...mapState(useNginxStore, {
      isNginxRunning: "isNginxRunning",
    }),

    ...mapState(usePathStore, {
      dirname: "dirname",
      rootPath: "rootPath",
      nginxPath: "nginxPath",
      nginxConfPath: "nginxConfPath",
      nginxLogsPath: "nginxLogsPath",
      recordingPath: "recordingPath",
    }),

    ...mapState(useToggleStore, {
      getTwitchOn: "isTwitchOn",
      getYoutubeOn: "isYoutubeOn",
      getAdditionalOn: "isAdditionalOn",
      getRecordingOn: "isRecordingOn",
    }),
  },

  methods: {
    ...mapActions(useComponentStore, {
      openNginxStatusAlert: "openNginxStatusAlert",
      openNginxStillRunningAlert: "openNginxStillRunningAlert",
      openPathErrorAlert: "openPathErrorAlert",
      openUpdateAlert: "openUpdateAlert",
      closeNginxStatusAlert: "closeNginxStatusAlert",
      closeNginxStillRunningAlert: "closeNginxStillRunningAlert",
      closePathErrorAlert: "closePathErrorAlert",
      closeUpdateAlert: "closeUpdateAlert",
    }),

    ...mapActions(useKeyStore, {
      setTwitchKey: "setTwitchKey",
      setYoutubeKey: "setYoutubeKey",
      setAdditionalRTMPUrl: "setAdditionalRTMPUrl",
      setAdditionalRTMPKey: "setAdditionalRTMPKey",
    }),

    ...mapActions(useNginxStore, {
      nginxOn: "nginxOn",
      nginxOff: "nginxOff",
    }),

    ...mapActions(useOptionStore, {
      updatePopupDisable: "updatePopupDisable",
    }),

    ...mapActions(usePathStore, {
      setDirname: "setDirname",
      setRootAndNginxPaths: "setRootAndNginxPaths",
      setRecordingPath: "setRecordingPath",
    }),

    ...mapActions(useToggleStore, {
      twitchOn: "twitchOn",
      youtubeOn: "youtubeOn",
      additionalOn: "additionalOn",
      recordingOn: "recordingOn",
      twitchOff: "twitchOff",
      youtubeOff: "youtubeOff",
      additionalOff: "additionalOff",
      recordingOff: "recordingOff",
    }),
  },
};
