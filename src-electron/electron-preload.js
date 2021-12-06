/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */

import { contextBridge, ipcRenderer } from 'electron'

// 앱 관련 api
contextBridge.exposeInMainWorld(
  'app', {
    maximize: (event, data) => {
      ipcRenderer.send('maximize-app')
    },

    minimize: (event, data) => {
      ipcRenderer.send('minimize-app')
    },

    close: (event, data) => {
      ipcRenderer.send('close-app')
    },

    isMaximized: (event, data) => {
      return ipcRenderer.sendSync('is-maximized-app')
    },

    openDialog: (event, data) => {
      return ipcRenderer.sendSync('open-dialog')
    },

    openWebPage: (event, data) => {
      ipcRenderer.send(event, data)
    }
  }
)

contextBridge.exposeInMainWorld(
  'nginx', {
    start: (option) => {
      return ipcRenderer.sendSync('nginx-start', option)
    },

    stop: (event, data) => {
      ipcRenderer.send('nginx-stop')
    },

    isWorking: (event, data) => {
      return ipcRenderer.sendSync('is-nginx-running')
    }
  }
)

contextBridge.exposeInMainWorld(
  'shell', {
    openExternal: (url) => {
      ipcRenderer.send('open-external', url)
    }
  }
)

contextBridge.exposeInMainWorld(
  'fs', {
    writeFileSync: (event, data) => {
      ipcRenderer.sendSync(event, data)
    }
  }
)

contextBridge.exposeInMainWorld(
  'path', {
    dirname: (event, data) => {
      return ipcRenderer.sendSync('dirname', data)
    }
  }
)

contextBridge.exposeInMainWorld(
  'write', {
    makeNginxConf: (event, data) => {
      return ipcRenderer.sendSync(event, data)
    },

    makeBroadcastOption: (event, data) => {
      return ipcRenderer.sendSync(event, data)
    }
  }
)

contextBridge.exposeInMainWorld(
  'read', {
    broadcastOption: (event, data) => {
      return ipcRenderer.sendSync(event, data)
    },

    contributors: (event, data) => {
      return ipcRenderer.sendSync(event, data)
    }
  }
)
