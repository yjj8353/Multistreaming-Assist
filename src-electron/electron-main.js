import { app, BrowserWindow, nativeTheme, ipcMain, shell, dialog } from 'electron'
import path from 'path'

import { spawn, execSync } from 'child_process'

import fs from 'fs'
import https from 'follow-redirects/https'

import windowStateKeeper from 'electron-window-state'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

let mainWindow

function createWindow () {
  /**
   * Initial window options
   */
  let mainWindowState = windowStateKeeper({
    defaultWidth: 480,
    defaultHeight: 600
  })

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    
    resizable: true,
    frame: false,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  mainWindowState.manage(mainWindow)
  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('example', (event, args) => {
  console.log(args)
})

// 앱 닫기
ipcMain.on('close-app', (event, args) => {
  if(mainWindow !== null && process.env.MODE === 'electron') {
    mainWindow.close()
  }
})

// 앱 최대화 및 이전크기로 되돌리기
ipcMain.on('maximize-app', (event, args) => {
  if(mainWindow !== null && process.env.MODE === 'electron') {
    if(mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  }
})

// 앱 최소화
ipcMain.on('minimize-app', (event, args) => {
  if(mainWindow !== null && process.env.MODE === 'electron') {
    mainWindow.minimize()
  }
})

// 앱 크기가 최대 상태인지 확인
ipcMain.on('is-maximized-app', (event, args) => {
  if(mainWindow !== null && process.env.MODE === 'electron') {
    event.returnValue = mainWindow.isMaximized()
  }
})

// nginx 시작
ipcMain.on('nginx-start', (event, args) => {
  if(!fs.existsSync(args.nginxLogsPath)) {
    fs.mkdirSync(args.nginxLogsPath)
  }

  const childProcess = spawn('nginx.exe', undefined, { cwd: args.nginxPath })
  
  childProcess.on('error', (err) => {
    if(err) {
      event.returnValue = { type: 'negative', message: 'nginx 실행에 실패했습니다.', isSuccess: false }
      console.error(err)
    }
  })
  
  event.returnValue = { isSuccess: true }
})

// nginx 정지
ipcMain.on('nginx-stop', (event, args) => {
  let isSuccess

  try {
    execSync('taskkill /im nginx.exe /f', undefined)
    isSuccess = true
  } catch(err) {
    console.err(err)
    isSuccess = false
  } finally {
    event.returnValue = isSuccess
  }
})

// nginx 프로세스가 존재하는지 확인
ipcMain.on('is-nginx-running', (event, args) => {
  let stdout = ''

  try {
    stdout = execSync('tasklist /fi "imagename eq nginx.exe"', undefined)
  } catch(err) {
    stdout = ('Error: ' + err)
    console.error(err)
  }

  const re = new RegExp('nginx.exe')
  event.returnValue =  re.test(stdout)
})

ipcMain.on('open-external', async (event, args) => {
  await shell.openExternal(args)
})

ipcMain.on('dirname', (event, args) => {
  event.returnValue = __dirname
})

ipcMain.on('make-nginx-conf', (event, args) => {
  let result

  try {
    fs.writeFileSync(path.join(args.path, 'nginx.conf'), args.data)
    result = true;
  } catch(e) {
    console.error(e)
    result = false
  } finally {
    event.returnValue = result
  }
})

ipcMain.on('make-broadcast-option', (event, args) => {
  let result

  try {
    fs.writeFileSync(path.join(args.path, 'broadcastOption.json'), args.data)
    result = true
  } catch(e) {
    console.error(e)
    result = false
  } finally {
    event.returnValue = result
  }
})

ipcMain.on('open-dialog', (event, args) => {
  let result

  result = dialog.showOpenDialogSync(mainWindow, { properties: ['openDirectory'] })
  event.returnValue = result[0]
})

ipcMain.on('broadcast-option', (event, args) => {
  let parsingData
  const defaultBroadcastOption = {
    'keys': {
      'twitch':'',
      'youtube':'',
      'rtmpUrl':'',
      'rtmpKey':''
    },

    'options': {
      'twitchOn':false,
      'youtubeOn':false,
      'additionalOn':false,
      'recordingOn':false,

      'recordingPath':'',

      'isUpdatePopupEnable':true
    }
  }

  try {
    const data = fs.readFileSync(args.nginxConfPath + '\\broadcastOption.json', 'UTF-8')
    parsingData = JSON.parse(data)
  } catch(e) {
    console.error(e)
    parsingData = defaultBroadcastOption
  }

  event.returnValue = parsingData
})

ipcMain.on('contributors', (event, args) => {
  let data
  try {
    data = fs.readFileSync('.' + args + '\\contributors.md', 'UTF-8')
  } catch(e) {
    console.error(e)
  }

  event.returnValue = data
})

ipcMain.on('open-web-page', (event, args) => {
  require('electron').shell.openExternal(args)
})

ipcMain.on('is-update-exist', (event, args) => {
  function preReleaseNumbering(preRelease) {
    const pr = {
      Alpha: 0,
      Beta: 1,
      RC: 2,
      RTM: 3
    }
  
    // pre release는 Alpha -> Beta -> RC -> RTM 순으로 버전이 높다
    switch(preRelease) {
      case 'alpha':
        return pr.Alpha
      case 'beta':
        return pr.Beta
      case 'rc':
        return pr.RC
      default:
        return pr.RTM
    }
  }

  let redirectedUrl = null
  let thisProgramVersion = null
  let latestProgramVersion = null
  let updateExist = false

  const request = https.request({
    host: 'github.com',
    path: '/yjj8353/Multistreaming-Assist/releases/latest'
  }, response => {
    redirectedUrl = response.responseUrl
    latestProgramVersion = redirectedUrl.replace('https://github.com/yjj8353/Multistreaming-Assist/releases/tag/v', '')
    
    try {
      thisProgramVersion = fs.readFileSync(path.join(args, 'version'), 'UTF-8')
    } catch(e) {
      console.error(e)
      event.returnValue = false
      
      retrun
    }

    const lpvArray = latestProgramVersion.split('.')
    const tpvArray = thisProgramVersion.split('.')

    const lpvMajor = lpvArray[0]
    const lpvMinor = lpvArray[1]
    const lpvPatch = lpvArray[2].split('-')[0]
    const lpvPreRelease = lpvArray[2].split('-')[1] ? preReleaseNumbering(lpvArray[2].split('-')[1].replace(/[0-9]*/g, '')) : preReleaseNumbering('')
    const lpvPreReleaseNumber = lpvArray[2].split('-')[1] ? ~~lpvArray[2].split('-')[1].replace(/[^0-9]*/g, '') : 0

    const tpvMajor = tpvArray[0]
    const tpvMinor = tpvArray[1]
    const tpvPatch = tpvArray[2].split('-')[0]
    const tpvPreRelease = tpvArray[2].split('-')[1] ? preReleaseNumbering(tpvArray[2].split('-')[1].replace(/[0-9]*/g, '')) : preReleaseNumbering('')
    const tpvPreReleaseNumber = tpvArray[2].split('-')[1] ? ~~tpvArray[2].split('-')[1].replace(/[^0-9]*/g, '') : 0

    if(parseInt(lpvMajor) > parseInt(tpvMajor)) {
      // major version update 있음
      updateExist = true
    } else {
      if(parseInt(lpvMinor) > parseInt(tpvMinor)) {
        // minor version update 있음
        updateExist = true
      } else {
        if(parseInt(lpvPatch) > parseInt(tpvPatch)) {
          // patch version update 있음
          updateExist = true
        } else {
          if(lpvPreRelease > tpvPreRelease) {
            // pre release version update 있음
            updateExist = true
          } else {
            if(lpvPreReleaseNumber > tpvPreReleaseNumber) {
              // pre release numbering update 있음
              updateExist = true
            } else {
              // version 동일함
              updateExist = false
            }            
          }
        }
      }
    }

    event.returnValue = updateExist
  }).on('error', err => {
    console.error(err)
  })

  request.end()
})
