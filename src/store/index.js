import Vue from 'vue'
import Vuex from 'vuex'

// store의 모듈들을 여기서 import 한다
import toggleSwitch from './toggleSwitch'
import nginx from './nginx'
import keys from './keys'
import dir  from './dir'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      
      // 위에서 선언한 모듈을 여기에 적는다
      toggleSwitch,
      nginx,
      keys,
      dir
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  // if(process.env.DEV && module.hot) {
  //   module.hot.accept(['./nginx'], () => {
  //     const newNginx = require('./nginx').default
  //     Store.hotUpdate({ modules: { nginx: newNginx } })
  //   })
  // }

  return Store
}
