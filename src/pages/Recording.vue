<template>
  <q-page class="q-pa-md" style="background-color: white;">
    
    <div class="row">
      <!-- 녹화 경로 입력 칸 -->
      <div class="col-11">
        <!-- setRecordingDir는 잘못 적은게 아니므로 수정하지 말 것. -->
        <q-input label="녹화 경로"
                 v-model="recordingDir"
                 @input="setRecordingDir"
                 :change="changeRecordingDir"
        />
      </div>

      <!-- 녹화 여부 토글 스위치 -->
      <div class="col-1" style="display: flex; align-items: center; justify-content: center;">
        <q-toggle v-model="recordOn"
                  :disable="!recordingDir"
                  size="md"
        />
      </div>
    </div>

    <p></p>

    <div class="row">
      <div class="q-pl-md col">
        <q-btn size="lg"
               class="float-right bg-grey-5"
               label="경로 설정"
               @click="recordingDirSelect"
        />
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import app from 'electron'

import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'

import { StoreMixin } from 'src/mixins/StoreMixin'

@Component
export default class RecordingPage extends mixins(StoreMixin) {
  // data
  originalRecordDir = ''

  // mounted
  mounted() {
    this.originalRecordDir = this.recordingDir
  }

  // methods
  recordingDirSelect() {
    const { dialog } = app.remote
    
    dialog.showOpenDialog({ 
      properties: ['openDirectory']
    }).then(result => {
      this.changeRecordingDir(result.filePaths)
    }).catch(error => {
      console.error(error)
    })
  }

  changeRecordingDir(value: string[]) {
    if(value.length === 0 && this.originalRecordDir !== '') {
      this.recordingDir = this.originalRecordDir
    } else {
      this.recordingDir = value[0]
      this.originalRecordDir = value[0]
    }
  }
}
</script>
