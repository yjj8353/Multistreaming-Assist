/*
 * Shell Command 관련 기능
 */

import Vue from 'vue'
import Component from 'vue-class-component'

import { execFile, /*execFileSync,*/ exec, execSync } from 'child_process'

@Component
export class ShellMixin extends Vue {
  // execFile(file[, args][, options][, callback])
  useExecFile(file: string, args: string[] | null | undefined, options: Object): void | [string, string] {
    execFile(file, args, options, (err, stdout, stderr) => {
      if(err) {
        return ['error', stderr]
      }

      return ['success', stdout]
    })
  }

  // execFileSync(file[, args][, options])
  // useExecFileSync(file: string, args: string[] | undefined, options: Object): string | Buffer {
  //   let stdout: string | Buffer = ''

  //   try {
  //     stdout = execFileSync(file, args, options)
  //   } catch(err) {
  //     stdout = err.toString()
  //   }

  //   return stdout
  // }

  // exec(command[, options][, callback])
  useExec(command: string, options: Object | null | undefined): void | [string, string]  {
    exec(command, options, (err, stdout, stderr) => {
      if(err) {
        return ['error', stderr]
      }

      return ['success', stdout]
    })
  }

  // execSync(command[, options])
  useExecSync(command: string, options: Object | undefined): string | Buffer {
    let stdout: string | Buffer = ''
    
    try {
      stdout = execSync(command, options)
    } catch(err) {
      stdout = err.toString()
    }

    return stdout
  }
}
