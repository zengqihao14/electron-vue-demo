<template lang="pug">
	.global-header
		router-link.head-link(to="/") LandingPage
		router-link.head-link(to="/subpage") SubPage
</template>

<script>
  export default {
    name: 'global-head'
  }
</script>

<style lang="sass">
	.global-header
		position: fixed
		top: 0
		left: 0
		right: 0
		height: 32px
		width: 100%
		background-color: #333
		z-index: 12

		.head-link
			font-size: 14px
			font-weight: bold
			color: #FFF
</style>
