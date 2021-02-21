import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { ToggleSwitchStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const toggleSwitchModule: Module<ToggleSwitchStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default toggleSwitchModule
