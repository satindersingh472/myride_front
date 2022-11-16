<template>
  <v-app>
    <navigation-page></navigation-page>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavigationPage from './components/navigationPage.vue'
export default {
  name: 'App',
  components: {
    NavigationPage,
  },
}
</script>
<style lang="scss"></style>
