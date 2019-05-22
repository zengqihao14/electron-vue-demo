<template lang="pug">
	md-drawer.global-side-menu(:md-active.sync="showNavigation" md-swipeable)
		md-toolbar(class="md-transparent" md-elevation="0")
			h2.md-title App Demo
		md-list
			md-list-item.global-side-menu-item
				md-button.global-side-menu-button(@click="goTo('/')") Top
			md-list-item.global-side-menu-item
				md-button.global-side-menu-button(@click="goTo('/db-demo')") DB DEMO
</template>

<script>
  export default {
    name: 'global-side-menu',
    computed: {
      showNavigation: {
        get: function() {
          return this.$store.state.global.showNavigation
        },
        set: function() {
          return this.$store.dispatch('global/toggleNavi')
        }
      }
    },
    methods: {
      async goTo(path) {
        await this.$root.$router.push(path)
        this.$store.dispatch('global/toggleNavi')
      }
    }
  }
</script>

<style lang="sass">
	.global-side-menu
		width: 230px
		max-width: calc(100vw - 125px)
		z-index: 12

		&-item
			padding: 0
			.md-list-item-content
				padding: 0
		&-button
			width: 100%
			margin: 0
			.md-ripple
				padding: 0 15px
				justify-content: flex-start
</style>
