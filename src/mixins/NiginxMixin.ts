/*
 * Nginx Control 관련 기능
 */

import Vue from 'vue'
import Component from 'vue-class-component'

import fs from 'fs'

import { useExec, useExecFile, useExecSync } from '../functions/ShellFunction'

@Component
export class NginxMixin extends Vue {
  startNginxProcess(nginxDir: string, nginxLogsDir: string): void | [string, string]{
    if(!fs.existsSync(nginxLogsDir)) {
      fs.mkdirSync(nginxLogsDir)
    }

    return useExecFile('nginx.exe', null, { cwd: nginxDir })
    // execFile('nginx.exe', { cwd: nginxDir }, (err, stdout, stderr) => {
    //   if(err) {
    //     return err.message
    //   }

    //   return stdout
    // })
  }

  quitNginxProcess(): string {
    let result: string = ''

    result = useExecSync('taskkill /im nginx.exe /f', undefined)

    return result
  }

  findNginxProcess(): boolean {
    let result: string = ''

    result = useExecSync('tasklist /fi "imagename eq nginx.exe"', undefined)

    const re = new RegExp('nginx.exe')
    return re.test(result)
  }
}
