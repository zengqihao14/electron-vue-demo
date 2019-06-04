<template lang="pug">
	.transition-container
		h1.title File Diff
</template>

<script>
  import { ipcRenderer } from 'electron'
  import fs from 'fs'
  import uuidv1 from 'uuid/v1'
  import json2xls from 'json2xls'

  export default {
    name: 'file-diff',
    data() {
      return {
        users: []
      }
    },
    components: {},
    methods: {}
  }
</script>

<style lang="sass">
	.title
		font-size: 20px
		font-weight: bold
		.button-wrapper
			display: inline-flex
			margin: 15px 0 0
</style>
