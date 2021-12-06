<template>
  <q-layout class="shadow-2 rounded-borders">
    <Header />
    <q-page-container>
      <Body />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from './layouts/Header.vue'
import Body from './layouts/Body.vue'
export default {
  name: 'App',

  components: {
    Header,
    Body
  }
}
</script>