export interface NginxStateInterface {
  nginxStatus: boolean
  nginxIsNotWorking: boolean
}

const state: NginxStateInterface = {
  nginxStatus: false,
  nginxIsNotWorking: true
}

export default state
