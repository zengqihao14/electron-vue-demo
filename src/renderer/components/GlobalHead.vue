<template lang="pug">
	.global-header
		md-toolbar.md-primary
			md-button.md-icon-button(@click="toggleNavi")
				menu-icon.menu-icon
			h1.title App Demo
</template>

<script>
	import MenuIcon from 'vue-material-design-icons/Menu.vue'
  import { mapActions } from 'vuex'

  export default {
    name: 'global-head',
	  components: {
      MenuIcon
	  },
	  methods: {
      ...mapActions({
        toggleNavi: 'global/toggleNavi'
      })
	  }
  }
</script>

<style lang="sass">
	.global-header
		position: relative
		top: 0
		left: 0
		right: 0
		width: 100%
		z-index: 12

		.title
			font-size: 18px
			font-weight: bold
			color: #FFF
		.head-link
			font-size: 14px
			font-weight: bold
			color: #FFF
		.menu-icon
			font-size: 18px
</style>
