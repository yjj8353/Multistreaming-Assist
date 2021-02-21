export interface NginxStateInterface {
  nginxStatus: boolean
  nginxIsNotWorking: boolean
  checkBeforeCloseThisApp: boolean
}

const state: NginxStateInterface = {
  nginxStatus: false,
  nginxIsNotWorking: true,
  checkBeforeCloseThisApp: false
}

export default state
