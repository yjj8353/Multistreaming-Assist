export const ElectronMixin = {
  name: 'ElectronMixin',

  methods: {
    minimizeApp() {
      window.app.minimize()
    },

    maximizeApp() {
      window.app.maximize()
    },

    closeApp() {
      const result = window.nginx.isWorking()

      if(result) {
        this.openNginxStillRunningAlert = true
      } else {
        window.app.close()
      }
    },

    openDialog() {
      return window.app.openDialog()
    },

    openExternal(url) {
      window.shell.openExternal(url)
    },

    openWebPage(url) {
      window.app.openWebPage('open-web-page', url)
    }
  }
}