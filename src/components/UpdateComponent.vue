<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="seamless" seamless position="bottom">
      <q-card style="width: 400px">
        <q-card-section class="row items-center no-wrap text-weight-bold">
          업데이트가 있습니다, 다운로드 하시겠습니까?
        </q-card-section>
        <q-separator />
        <q-card-section class="row no-wrap">
          <q-checkbox v-model="screwYouUpdate" label="앞으로 업데이트 알림을 보지 않습니다" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="귀찮아요" color="negative" @click="closeUpdatePopup" />
          <q-btn label="할게요" color="primary" @click="openUpdatePage" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// electron
import { shell } from 'electron'

import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import { FunctionMixin } from '../mixins/FunctionMixin'

export default {
  name: 'UpdatePopup',

  mixins: [FunctionMixin],

  computed: {
    ...mapGetters('option', {
      getUpdatePopup: 'updatePopup'
    }),

    updatePopup: {
      get() { return this.getUpdatePopup },
      set(value) { this.setUpdatePopup(value) }
    }
  },

  data () {
    return {
      seamless: true,
      screwYouUpdate: false
    }
  },

  methods: {
    ...mapActions('option', {
      setUpdatePopup: 'updatePopup'
    }),

    openUpdatePage() {
      shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/releases/latest')
      this.updatePopup = this.screwYouUpdate
      this.seamless = false
      this.makeRTMPJSON()
    },

    closeUpdatePopup() {
      this.updatePopup = this.screwYouUpdate
      this.seamless = false
      this.makeRTMPJSON()
    }
  }
}
</script>
