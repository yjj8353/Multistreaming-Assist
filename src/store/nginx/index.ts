import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { NginxStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const nginxModule: Module<NginxStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default nginxModule
