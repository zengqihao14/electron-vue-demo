<template lang="pug">
	.transition-container
		h1.title Db Demo
		md-button(@click="getPosts") get posts
		md-button(@click="setPosts") set posts
		md-button(@click="cleanPosts") clean posts
		div {{posts}}
</template>

<script>
  export default {
    name: 'landing-page',
    data() {
      return {
        posts: []
      }
    },
    methods: {
      getPosts() {
        this.posts = this.$root.$db.read().get('posts').value()
      },
      async setPosts() {
        const newPosts = [...this.posts, {
          id: Math.random(),
          text: 'test'
        }]
        await this.$root.$db.read().set('posts', newPosts).write()
        this.getPosts()
      },
      async cleanPosts() {
        await this.$root.$db.read().set('posts', []).write()
	      this.getPosts()
			}
    },
  }
</script>

<style lang="sass">
	.title
		font-size: 20px
		font-weight: bold
</style>
