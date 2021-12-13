<template>
  <div class="row">
    <div class="q-pa-md col-6">
      <q-card class="bg-blue-4 text-white">
        <q-card-section>
          <div class="text-h4 text-weight-bold"> {{ feedbackTitle }} </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section v-html="feedbackList">
          
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md col-6">
      <q-card class="bg-blue-4 text-white">
        <q-card-section>
          <div class="text-h4 text-weight-bold"> {{ sponsorTitle }} </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section v-html="sponsorList">
          
        </q-card-section>
      </q-card>
    </div>
    <!--<button @click="goToBack">X</button>-->
  </div>
</template>

<script>
import { marked } from 'marked'
import cheerio from 'cheerio'

export default {
  name: 'Contributors',

  data() {
    return {
      feedbackTitle: '',
      feedbackList: '',
      sponsorTitle: '',
      sponsorList: ''
    }
  },

  mounted() {
    this.getMarkdown()
  },

  methods: {
    goToBack() {
      this.$router.go(-1)
    },

    getMarkdown() {
      const data = this.readContributors()
      this.contributors = marked(data)

      const $ = cheerio.load(this.contributors)
      this.feedbackTitle = $('h2#피드백').text()
      const feedbackList = $('p').html().split('<br>')
            feedbackList.forEach(feedback => this.feedbackList = this.feedbackList + '<p><b>' + feedback + '</b></p>')

      this.sponsorTitle = $('h2#후원자').text()
      const sponsorList = $('p:last').html().split('<br>')
            sponsorList.forEach(sponsor => this.sponsorList = this.sponsorList + '<p><b>' + sponsor + '</b></p>')
    }
  }
}
</script>
