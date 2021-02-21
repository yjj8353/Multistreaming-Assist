/*
 * Quasar Plugin 관련 기능
 */

import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class QuasarMixin extends Vue {
  notify(type: string, message: string) {
    this.$q.notify({
      type: type,
      message: message
    })
  }
}
