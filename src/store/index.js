import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import component_control from './component_control'
import key from './key'
import nginx from './nginx'
import option from './option'
import path from './path'
import toggle_switch from './toggle_switch'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function(/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      component_control,
      key,
      nginx,
      option,
      path,
      toggle_switch
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
