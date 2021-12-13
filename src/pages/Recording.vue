<template>
  <q-page class="q-pa-md" style="background-color: white;">
    
    <div class="row">
      <!-- 녹화 경로 입력 칸 -->
      <div class="col-11">
        <q-input label="녹화 경로"
                 readonly
                 v-model="recordingPath"
        />
      </div>

      <!-- 녹화 여부 토글 스위치 -->
      <div class="col-1" style="display: flex; align-items: center; justify-content: center;">
        <q-toggle v-model="recordingOn"
                  :disable="!recordingPath"
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
               @click="recordingPathSelect"
        />
      </div>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'Recoding',

  mounted() {
  },

  methods: {
    recordingPathSelect() {
      const result = this.openDialog()
      this.recordingPath = result
    }
  }
}
</script>