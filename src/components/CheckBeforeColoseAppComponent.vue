<template>
  <q-dialog v-model="alert">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">잠깐만요!</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        아직 nginx가 켜져있는거 같습니다만... 정말로 종료할까요?
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="물론이죠!" color="negative" @click="ok" />
        <q-btn label="잠깐만요!" color="primary" @click="cancle" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'

import { NginxMixin } from 'src/mixins/NiginxMixin'
import { StoreMixin } from 'src/mixins/StoreMixin'

@Component
export default class CheckBeforeCloseAppComponent extends mixins(NginxMixin, StoreMixin) {
  alert = true

  ok() {
    try {
      this.quitNginxProcess()
    } catch(err) {
      console.error(err)
    } finally {
      if(this.win !== null) {
        this.checkBeforeCloseThisApp = false
        this.win.close()
      }
    }
  }

  cancle() {
    console.log('잠깐!')
    this.checkBeforeCloseThisApp = false
  }
}
</script>
