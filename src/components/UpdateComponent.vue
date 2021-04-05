<template>
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
</template>

<script lang="ts">
import fs from 'fs'
import path from 'path'

import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'

import { shell } from 'electron'
import { ConfigMixin } from 'src/mixins/ConfigMixin'

@Component
export default class UpdateComponent extends mixins(ConfigMixin) {
  seamless = true
  screwYouUpdate = false

  async openUpdatePage() {
    await shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/releases/latest')
    this.dontPopupUpdateMessage = this.screwYouUpdate
    this.seamless = false

    const broadcastOption = this.makeBroadcastOptionJsonString()
    fs.writeFileSync(path.join(this.nginxConfDir, 'broadcastOption.json'), broadcastOption)
  }

  closeUpdatePopup() {
    this.dontPopupUpdateMessage = this.screwYouUpdate
    this.seamless = false

    const broadcastOption = this.makeBroadcastOptionJsonString()
    fs.writeFileSync(path.join(this.nginxConfDir, 'broadcastOption.json'), broadcastOption)
  }
}
</script>
