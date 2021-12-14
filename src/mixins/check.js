export const CheckMixin = {
  name: 'CheckMixin',

  methods: {
    isIncludeKoreanOnPath(path) {
      const re = new RegExp('[ㄱ-ㅎ|ㅏ-ㅑ|가-힣]')
      return re.test(path)
    },

    isTwitchKeyRightPattern(key) {
      const re = new RegExp('^live_[0-9]*_[a-zA-Z0-9]{30}$')
      return re.test(key)
    },

    isYoutubeKeyIsRightPattern(key) {
      const re = new RegExp('^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}(-[a-z0-9]{4})?$')
      return re.test(key)
    },

    isTwitchKeyEmpty(key) {
      if(!key) {
        return true
      }

      return false
    },

    isYoutubeKeyEmpty(key) {
      if(!key) {
        return true
      }

      return false
    },

    isAdditionalKeyEmpty(key) {
      if(!key) {
        return true
      }

      return false
    },

    isAdditionalRTMPUrlEmpty(url) {
      if(!url) {
        return true
      }

      return false
    },

    isAllToggleSwitchOff(...toggleSwitchs) {
      for(const toggleSwitch of toggleSwitchs) {
        if(toggleSwitch) {
          return false
        }
      }

      return true
    },

    isNginxWorking() {
      return window.nginx.isWorking()
    },

    isWindowMaximized() {
      return window.app.isMaximized()
    }
  }
}
