import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { DirStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const dirModule: Module<DirStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default dirModule
