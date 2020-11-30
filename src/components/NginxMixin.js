import fs from 'fs'

// shell
import { execFile } from 'child_process'
import { execFileSync } from 'child_process'
import { execSync } from 'child_process'

// vuex
import { mapGetters } from 'vuex'

export const NginxMixin = {
  computed: {
    ...mapGetters('dir', {
      getNginxDir: 'nginxDir',
      getNginxLogsDir: 'nginxLogsDir'
    }),

    nginxDir: {
      get() { return this.getNginxDir }
    },

    nginxLogsDir: {
      get() { return this.getNginxLogsDir }
    }
  },

  methods: {
    // nginx.exe 시작
    startNginxProcess() {
      if (!fs.existsSync(this.nginxLogsDir)) {
        fs.mkdirSync(this.nginxLogsDir)
      }

      execFile('nginx.exe', { cwd: this.nginxDir }, (err, stdout, stderr) => {
        if (err) {
          return err
        }
      })
    },

    // nginx.exe 종료
    quitNginxProcess() {
      let result
      let error

      try {
        result = execSync('taskkill /im nginx.exe /f')
      } catch (err) {
        error = err.stderr.toString()
      }

      return [result, error]
    },

    // 작동중인 nginx.exe 프로세스가 있는지 확인
    findNginxProcess() {
      let result
      let error
  
      try {
        result = execSync('tasklist /fi "imagename eq nginx.exe"')
      } catch (err) {
        error = err.stderr.toString()
        console.log(error)
      }
  
      result = result.toString()
      
      const re = new RegExp('nginx.exe')
      return re.test(result)
    },

    // 변경된 nginx.conf 파일이 문법적으로 오류가 없는지 확인
    testNginxProcess() {
      const result = new Result()

      execFileSync('nginx.exe', ['-t'], { cwd: this.nginxDir })

      return [result.getStdout(), result.getStderr()]
    }
  }
}

// 이유는 모르겠으나 quasar는 child_process의 execFileSync result가 들어오지 않으므로 main process의
// stdout stderr를 가로채서 만들어야 함
class Result {
  constructor() {
    this.stdout = []
    this.stderr = []

    this.stdoutUse()
    this.stderrUse()
  }

  stdoutUse () {
    const stdout = []

    process.stdout.write = function(str, encoding, fg) {
      stdout.push(str.toString())
    }

    this.stdout = stdout
  }

  stderrUse () {
    const stderr = []
    
    process.stderr.write = function(str, encoding, fg) {
      stderr.push(str.toString())
    }

    this.stderr = stderr
  }

  getStdout () {
    return this.stdout[0]
  }

  getStderr () {
    return this.stderr[0]
  }
}
