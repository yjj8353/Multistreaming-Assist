<template>
  <div class="row">
    <div class="q-pa-md col-6">
      <q-card class="bg-blue-4 text-white">
        <q-card-section>
          <div class="text-h4 text-weight-bold">{{ feedbackTitle }}</div>
        </q-card-section>

        <q-separator inset />

        <!-- 기여자 리스트 -->
        <q-card-section id="html-feedback">
          <div v-html="feedbackList"></div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md col-6">
      <q-card class="bg-blue-4 text-white">
        <q-card-section>
          <div class="text-h4 text-weight-bold">{{ sponsorTitle }}</div>
        </q-card-section>

        <q-separator inset />

        <!-- 후원자 리스트 -->
        <q-card-section id="html-sponsor">
          <div v-html="sponsorList"></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import cheerio from "cheerio";
import { ConfigMixin } from "src/mixins/config";

const options = {
  prefix: "",
};

export default {
  name: "ContributorsPage",

  mixins: [ConfigMixin],

  data() {
    return {
      feedbackTitle: "",
      feedbackList: "",
      sponsorTitle: "",
      sponsorList: "",
    };
  },

  mounted() {
    this.getMarkdown();
  },

  methods: {
    goToBack() {
      this.$router.go(-1);
    },

    async getMarkdown() {
      const data = await this.readContributors();
      const marked_ = marked.use(mangle());
      marked_.use(gfmHeadingId(options));
      this.contributors = marked_.parse(data);

      const $ = cheerio.load(this.contributors);
      this.feedbackTitle = $("h2#피드백").text();
      const feedbackList = $("p").html().split("<br>");
      feedbackList.forEach(
        (feedback) =>
          (this.feedbackList =
            this.feedbackList + "<p><b>" + feedback + "</b></p>")
      );

      this.sponsorTitle = $("h2#후원자").text();
      const sponsorList = $("p:last").html().split("<br>");
      sponsorList.forEach(
        (sponsor) =>
          (this.sponsorList =
            this.sponsorList + "<p><b>" + sponsor + "</b></p>")
      );
    },
  },
};
</script>
