import { store } from 'quasar/wrappers'
import Vuex from 'vuex'

// store의 모듈과 인터페이스를 여기서 import 한다.
import dir from './dir'
import { DirStateInterface } from './dir/state'

import keys from './keys'
import { KeyStateInterface } from './keys/state'

import nginx from './nginx'
import { NginxStateInterface } from './nginx/state'

import option from './option'
import { OptionStateInterface } from './option/state'

import toggleSwitch from './toggleSwitch'
import { ToggleSwitchStateInterface } from './toggleSwitch/state'

// 추가적인 store가 추가된다면 아래와 같이 추가할것.
// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// RootInterface
export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  dir: DirStateInterface
  keys: KeyStateInterface
  nginx: NginxStateInterface
  option: OptionStateInterface
  toggleSwitch: ToggleSwitchStateInterface
}

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      // 위에서 선언한 모듈을 여기에 적는다
      dir,
      keys,
      nginx,
      option,
      toggleSwitch
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  })

  return Store
})
