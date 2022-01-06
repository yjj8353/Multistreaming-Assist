export const NginxMixin = {
  name: 'NginxMixin',

  methods: {
    startNginxProcess() {
      const option = {
        nginxLogsPath: this.nginxLogsPath,
        nginxPath: this.nginxPath
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
      } else {
        this.notify('negative', 'nginx.exe 프로세스가 존재하지 않습니다')
        this.isNginxRunning = false
      }
    },

    findNginxProcess() {
      const result = window.nginx.isWorking()

      return result
    }
  }
}
