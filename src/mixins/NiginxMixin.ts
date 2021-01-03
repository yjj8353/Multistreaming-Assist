/*
 * Nginx Control 관련 기능
 */

import Vue from 'vue'
import Component from 'vue-class-component'

import fs from 'fs'
import { execFile, execFileSync, execSync } from 'child_process'

@Component
export class NginxMixin extends Vue {
  startNginxProcess(nginxDir: string, nginxLogsDir: string): void|string {
    if(!fs.existsSync(nginxLogsDir)) {
      fs.mkdirSync(nginxLogsDir)
    }

    execFile('nginx.exe', { cwd: nginxDir }, (err, stdout, stderr) => {
      if(err) {
        return err.message
      }

      return stdout
    })
  }

  quitNginxProcess(): string[] {
    let result: string = ''
    let error: string = ''

    try {
      result = execSync('taskkill /im nginx.exe /f').toString()
    } catch(err) {
      error = err.stderr.toString()
    }

    return [result, error]
  }

  findNginxProcess(): boolean {
    let result: string = ''
    let error: string = ''

    try {
      result = execSync('tasklist /fi "imagename eq nginx.exe"').toString()
    } catch (err) {
      error = err.toString()
    }

    const re = new RegExp('nginx.exe')
    return re.test(result)
  }
}
