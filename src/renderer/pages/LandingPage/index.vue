<template lang="pug">
	.transition-container
		h1.title Landing Page
		button(@click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')") Read the Docs
		button(@click="open('/subpage')") SubPage
</template>

<script>
  export default {
    name: 'landing-page',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>
