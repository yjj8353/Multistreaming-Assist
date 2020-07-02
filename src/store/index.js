import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

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
      // example
    },
    state: {
      
      // nginx가 켜져있으면 true, 꺼져있으면 false
      nginxStatus: false,

      // build 완료된 결과물은 끝에 "\\resources\\app.asar"가 추가 경로로 붙으므로 지워야 함
      dir: __dirname.replace("\\resources\\app.asar", "")
    },
    mutations: {
      
      // nginxStatus 변수에 변경 사항을 적용하기 위한 메소드
      setNginxStatus: function (state, data) {
        state.nginxStatus = data
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
