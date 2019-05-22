<template lang="pug">
	.wrapper
		global-head
		global-side-menu
		.main-container
			router-view
</template>

<script>
	import GlobalHead from '@/components/GlobalHead'
  import GlobalSideMenu from '@/components/GlobalSideMenu'

	export default {
	  name: 'default-layout',
	  components: {
	    GlobalHead,
      GlobalSideMenu
	  }
	}
</script>

<style lang="sass">
	.wrapper
		position: relative
		padding: 0
		margin: 0
		min-height: 100vh
	.main-container
		position: relative
		padding: 0
		margin: 0
</style>

