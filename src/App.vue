<template>
<div id="App">
  <keep-alive exclude="Detail"><router-view /></keep-alive>
  <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar.vue'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import url('./assets/css/base.css');

</style>
