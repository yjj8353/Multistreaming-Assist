<template>
  <q-page class="q-pa-md" style="background-color: white">
    <!-- TWITCH RTMP -->
    <div class="row">
      <!-- TWITCH RTMP KEY 입력 칸 -->
      <div class="col-11">
        <q-input
          label="TWITCH RTMP KEY"
          v-model="twitchKey"
          :type="twitchIsPwd ? 'password' : 'text'"
          @update:model-value="checkTwitchKeyEmpty"
        >
          <template v-slot:append>
            <q-icon
              :name="twitchIsPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="twitchIsPwd = !twitchIsPwd"
            />
          </template>
        </q-input>
      </div>

      <!-- TWITCH RTMP KEY 반영 토글 스위치 -->
      <div
        class="col-1"
        style="display: flex; align-items: center; justify-content: center"
      >
        <q-toggle v-model="isTwitchOn" :disable="!twitchKey" size="md" />
      </div>
    </div>

    <p></p>

    <!-- YOUTUBE RTMP -->
    <div class="row">
      <!-- YOUTUBE RTMP KEY 입력 칸 -->
      <div class="col-11">
        <q-input
          label="YOUTUBE RTMP KEY"
          v-model="youtubeKey"
          :type="youtubeIsPwd ? 'password' : 'text'"
          @update:model-value="checkYoutubeKeyEmpty"
        >
          <template v-slot:append>
            <q-icon
              :name="youtubeIsPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="youtubeIsPwd = !youtubeIsPwd"
            />
          </template>
        </q-input>
      </div>

      <!-- YOUTUBE RTMP KEY 반영 토글 스위치 -->
      <div
        class="col-1"
        style="display: flex; align-items: center; justify-content: center"
      >
        <q-toggle v-model="isYoutubeOn" :disable="!youtubeKey" size="md" />
      </div>
    </div>

    <p></p>

    <!-- additional RTMP -->
    <div class="row">
      <!-- 추가적인 RTMP URL 입력 칸 -->
      <div class="q-pr-md col">
        <q-input
          label="추가적인 RTMP URL"
          v-model="additionalRTMPUrl"
          type="text"
          @update:model-value="checkAdditionalRTMPUrlOrKeyEmpty"
        >
          <template v-slot:append> </template>
        </q-input>
      </div>

      <!-- 추가적은 RTMP KEY 입력 칸 -->
      <div class="q-pl-md col">
        <q-input
          label="추가적인 RTMP KEY"
          v-model="additionalRTMPKey"
          :type="additionalIsPwd ? 'password' : 'text'"
          @update:model-value="checkAdditionalRTMPUrlOrKeyEmpty"
        >
          <template v-slot:append>
            <q-icon
              :name="additionalIsPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="additionalIsPwd = !additionalIsPwd"
            />
          </template>
        </q-input>
      </div>

      <!-- 추가적인 RTMP URL 및 KEY 반영 토글 스위치 -->
      <div
        class="col-1"
        style="display: flex; align-items: center; justify-content: center"
      >
        <q-toggle
          size="md"
          v-model="isAdditionalOn"
          :disable="!additionalRTMPUrl && !additionalRTMPKey"
        />
      </div>
    </div>

    <p></p>

    <!-- NGINX 시작/종료 버튼 -->
    <div class="row">
      <div class="q-pl-md col">
        <q-btn
          size="lg"
          class="float-right"
          :color="isNginxRunning ? 'red' : 'primary'"
          :label="isNginxRunning ? 'Nginx 종료' : 'Nginx 시작'"
          @click="nginxSwitch"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { CheckMixin } from "src/mixins/check";
import { ConfigMixin } from "src/mixins/config";
import { StoreMixin } from "src/mixins/store";

export default {
  name: "StreamingPage",

  mixins: [CheckMixin, ConfigMixin, StoreMixin],

  data() {
    return {
      twitchIsPwd: true,
      youtubeIsPwd: true,
      additionalIsPwd: true,
    };
  },

  methods: {
    async nginxSwitch() {
      const result1 = await this.writeNginxConf();
      const result2 = await this.writeBroadcastOption();

      if (!result1 || !result2) {
        this.notify("negative", "옵션 파일을 생성하는데 실패했습니다");
        return;
      }

      if (!this.isNginxRunning) {
        this.startNginxProcess();
      } else {
        this.killNginxProcess();
      }
    },

    checkTwitchKeyEmpty() {
      const result = this.isTwitchKeyEmpty(this.twitchKey);

      if (result) {
        this.twitchOn = false;
      }
    },

    checkYoutubeKeyEmpty() {
      const result = this.isYoutubeKeyEmpty(this.youtubeKey);

      if (result) {
        this.youtubeOn = false;
      }
    },

    checkAdditionalRTMPUrlOrKeyEmpty() {
      const result1 = this.isAdditionalRTMPUrlEmpty(this.additionalRTMPUrl);
      const result2 = this.isAdditionalKeyEmpty(this.additionalRTMPKey);

      if (result1 && result2) {
        this.additionalOn = false;
      }
    },
  },
};
</script>
