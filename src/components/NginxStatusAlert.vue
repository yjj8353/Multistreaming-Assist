<template>
  <q-dialog v-model="isOpenNginxStatusAlert">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">저런...</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        어째서인지 Nginx가 꺼져있는거 같은데, 재기동 할까요?
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="물론이죠!" color="negative" @click="ok" />
        <q-btn
          label="처음 상태로 되돌려주세요!"
          color="primary"
          @click="cancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { StoreMixin } from "src/mixins/store";
import { NginxMixin } from "src/mixins/nginx";

export default {
  name: "NginxStatusAlert",

  mixins: [StoreMixin, NginxMixin],

  methods: {
    ok() {
      this.startNginxProcess();
      this.closeNginxStatusAlert();
    },

    cancel() {
      this.nginxOff();
      this.closeNginxStatusAlert();
    },
  },
};
</script>
