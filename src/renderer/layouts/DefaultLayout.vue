<template lang="pug">
	.wrapper
		global-head
		.main-container
			router-view
</template>

<script>
	import GlobalHead from '@/components/GlobalHead'

	export default {
	  name: 'default-layout',
	  components: {
	    GlobalHead
	  }
	}
</script>

<style lang="sass">
	.wrapper
		position: relative
		padding: 0
		margin: 0
	.main-container
		position: relative
		padding: 32px 0 0
		margin: 0
</style>

