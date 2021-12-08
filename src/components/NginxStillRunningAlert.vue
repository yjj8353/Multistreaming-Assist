<template>
  <q-dialog v-model="openNginxStillRunningAlert">
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

<script>
export default {
  name: 'NginxStillRunningAlert',
  
  methods: {
    ok() {
      try {
        window.nginx.stop()
      } catch(err) {
        console.error(err)
      } finally {
        window.app.close()
      }
    },

    cancle() {
      this.openNginxStillRunningAlert = false
    }
  }
}
</script>
