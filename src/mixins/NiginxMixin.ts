/*
 * Nginx Control 관련 기능
 */

import fs from 'fs'
import Component, { mixins } from 'vue-class-component'
import { useExecFile, useExecSync } from '../functions/ShellFunction'

import { StoreMixin } from 'src/mixins/StoreMixin'
@Component
export class NginxMixin extends mixins(StoreMixin) {
  startNginxProcess(): void | [string, string] {
    if(!fs.existsSync(this.nginxLogsDir)) {
      fs.mkdirSync(this.nginxLogsDir)
    }

    return useExecFile('nginx.exe', null, { cwd: this.nginxDir })
    // execFile('nginx.exe', { cwd: nginxDir }, (err, stdout, stderr) => {
    //   if(err) {
    //     return err.message
    //   }

    //   return stdout
    // })
  }

  quitNginxProcess(): string {
    let result = ''
    result = useExecSync('taskkill /im nginx.exe /f', undefined)

    return result
  }

  findNginxProcess(): boolean {
    let result = ''
    result = useExecSync('tasklist /fi "imagename eq nginx.exe"', undefined)

    const re = new RegExp('nginx.exe')
    return re.test(result)
  }
}
