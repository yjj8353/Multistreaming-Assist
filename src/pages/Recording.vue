<template>
  <q-page class="q-pa-md" style="background-color: white;">
    
    <div class="row">
      <div class="col-11">
        <!-- setRecordingDir는 잘못 적은게 아니므로 수정하지 말 것. -->
        <q-input label="녹화 경로"
                 v-model="recordingDir"
                 @input="setRecordingDir"
                 :change="changeRecordingDir"
        />
      </div>

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

<script>
import app from 'electron'

// vuex
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'RecordingPage',

  computed: {
    ...mapGetters('dir', {
      getRecordingDir: 'recordingDir'
    }),

    ...mapGetters('toggleSwitch', {
      getRecordOn: 'recordOn'
    }),

    recordingDir: {
      get() { return this.getRecordingDir },
      set(value) { this.setRecordingDir(value) }
    },

    recordOn: {
      get() { return this.getRecordOn },
      set(value) { this.setRecordOn(value) }
    }
  },

  mounted() {
    this.originalRecordDir = this.recordingDir
  },

  data() {
    return {
      originalRecordDir: ''
    }
  },

  methods: {
    ...mapActions('dir', {
      setRecordingDir: 'recordingDir'
    }),

    ...mapActions('toggleSwitch', {
      setRecordOn: 'recordOn'
    }),

    recordingDirSelect() {
      const { dialog } = app.remote
      
      dialog.showOpenDialog({ 
        properties: ['openDirectory']
      }).then(result => {
        this.changeRecordingDir(result.filePaths)
      })
    },

    changeRecordingDir(value) {
      if(value.length === 0 && this.originalRecordDir !== '') {
        this.recordingDir = this.originalRecordDir
      } else {
        this.recordingDir = value
        this.originalRecordDir = value
      }
    }
  }
}
</script>
