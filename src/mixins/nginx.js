export const NginxMixin = {
  name: 'NginxMixin',

  methods: {
    startNginxProcess() {
      const option = {
        nginxLogsDir: this.nginxLogsDir,
        nginxDir: this.nginxDir
      }

      const result = window.nginx.start(option)

      if(result.isSuccess) {
        this.isNginxRunning = true
      } else {
        this.isNginxRunning = false
        this.notify(re.type, re.message)
      }
    },

    killNginxProcess() {
      const result = window.nginx.stop()

      if(result) {
        this.isNginxRunning = false
      }
    },

    findNginxProcess() {
      const result = window.nginx.isWorking()

      return result
    }
  }
}
