<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="alert">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">저런...</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          어째서인지 Nginx가 꺼져있는거 같은데, 재기동 할까요?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="물론이죠!" color="negative" @click="ok" />
          <q-btn label="처음 상태로 되돌려주세요!" color="primary" @click="cancle" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'

import { NginxMixin } from 'src/mixins/NiginxMixin'
import { StoreMixin } from 'src/mixins/StoreMixin'

@Component
export default class NginxStatusCheckComponent extends mixins(NginxMixin, StoreMixin) {
  alert = true

  ok() {
    this.startNginxProcess()
    this.nginxIsNotWorking = true
  }

  cancle() {
    this.nginxStatus = false
    this.nginxIsNotWorking = true
  }
}
</script>
