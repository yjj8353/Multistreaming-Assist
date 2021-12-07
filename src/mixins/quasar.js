import { Notify } from 'quasar'

export const QuasarMixin = {
  name: 'QuasarMixin',

  methods: {
    notify(type, message) {
      Notify.create({
        /**********************
         * positive: 녹색
         * negative: 적색
         * warning : 황색
         * info    : 하늘색
         * ongoing : 짙은 회색
         **********************/
        type: type,
        message: message
      })
    }
  }
}
