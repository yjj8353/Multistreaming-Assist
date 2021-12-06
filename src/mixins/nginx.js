export const NginxMixin = {
  name: 'NginxMixin',

  methods: {
    startNginxProcess() {
      const option = {
        nginxLogsDir: this.nginxLogsDir,
        nginxDir: this.nginxDir
      }

      this.nginxIsRunning = window.nginx.start(option)
    },

    killNginxProcess() {
      this.nginxIsRunning = window.nginx.stop()
    },

    findNginxProcess() {
      const result = window.nginx.isWorking()
    }
  }
}
