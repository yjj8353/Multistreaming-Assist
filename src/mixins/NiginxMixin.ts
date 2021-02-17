/*
 * Nginx Control 관련 기능
 */

import fs from 'fs'
import { execSync, spawn } from 'child_process'

import Component, { mixins } from 'vue-class-component'

import { StoreMixin } from './StoreMixin'
import { QuasarMixin } from './QuasarMixin'

@Component
export class NginxMixin extends mixins(QuasarMixin, StoreMixin) {
  startNginxProcess() {
    if(!fs.existsSync(this.nginxLogsDir)) {
      fs.mkdirSync(this.nginxLogsDir)
    }

    this.nginxStatus = true

    const childProcess = spawn('nginx.exe', undefined, { cwd: this.nginxDir })
    
    childProcess.on('error', (err) => {
      if(err) {
        this.nginxStatus = false
        this.notify('negative', 'nginx 실행에 실패했습니다.')
      }
    })
  }

  quitNginxProcess() {
    try {
      execSync('taskkill /im nginx.exe /f', undefined)
      console.log('정상처리')
    } catch(err) {
      'Error: '.concat(err)
      console.log(err)
    }

    this.nginxStatus = false
  }

  findNginxProcess(): boolean {
    let stdout = ''

    try {
      stdout = execSync('tasklist /fi "imagename eq nginx.exe"', undefined)
    } catch(err) {
      stdout = ('Error: '.concat(err))
    }

    const re = new RegExp('nginx.exe')
    return re.test(stdout)
  }
}
