import { Notify } from 'quasar'

export const QuasarMixin = {
  name: 'QuasarMixin',

  methods: {
    notify(type, message) {
      Notify.create({
        type: type,
        message: message
      })
    }
  }
}
