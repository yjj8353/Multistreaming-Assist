/*
 * Shell Command 관련 기능
 */

import { execFile, /*execFileSync,*/ exec, execSync } from 'child_process'

// execFile(file[, args][, options][, callback])
export function useExecFile(file: string, args: string[] | null | undefined, options: Object): void | [string, string] {
  execFile(file, args, options, (err, stdout, stderr) => {
    if(err) {
      return ['error', stderr]
    }

    return ['success', stdout]
  })
}

// execFileSync(file[, args][, options])
// export function useExecFileSync(file: string, args: string[] | undefined, options: Object): string | Buffer {
//   let stdout: string | Buffer = ''

//   try {
//     stdout = execFileSync(file, args, options)
//   } catch(err) {
//     stdout = err.toString()
//   }

//   return stdout
// }

// exec(command[, options][, callback])
export function useExec(command: string, options: Object | null | undefined): void | [string, string]  {
  let result: string = ''
  let resultMessage: string = ''

  exec(command, options, (err, stdout, stderr) => {
    if(err) {
      result = 'error'
      resultMessage = stderr.toString()

      return [result, resultMessage]
    }

    result = 'success'
    resultMessage = stdout.toString()

    return [result, resultMessage]
  })
}

// execSync(command[, options])
export function useExecSync(command: string, options: Object | undefined): string {
  let stdout: string = ''

  try {
    if(options) { 
      stdout = execSync(command, options).toString()
    } else {
      stdout = execSync(command, undefined)
    }
  } catch(err) {
    stdout = ('Error: '.concat(err.message.toString()))
  }

  return stdout
}
