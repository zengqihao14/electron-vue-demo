<template lang="pug">
	.transition-container
		h1.title Landing Page
</template>

<script>
  export default {
    name: 'landing-page',
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>
