<template>
  <div id="app">
    <BackgroundImage :buttons_visible="photo_buttons_visible"></BackgroundImage>
    <TopBar></TopBar>
  </div>
</template>

<script>
import BackgroundImage from "./components/backgroundImage.vue";
import TopBar from "./components/topBar.vue";
export default {
  name: 'app',
  components: { BackgroundImage, TopBar},
	data: function () {
		return {
			photo_buttons_visible: true,
		}
	},
	created: function () {
		window.addEventListener('resize', this.handleResize)
		this.handleResize();
	},
	methods: {
		handleResize() {
			this.$store.commit('adjust_width_height', window.innerWidth, window.innerHeight);
		}
	}
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
