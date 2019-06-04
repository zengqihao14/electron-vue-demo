<template lang="pug">
	.transition-container
		h1.title File Diff
		div.input-container(ref="fileInput")
			label Image
			md-field
				md-file(
					:value="filename"
					@md-change="selectedFiles"
					:multiple="isMultiple"
				)
				span.hint(ref="hint") You can drop image files into this component.
				.drop-notice(v-if="isDropping")
					.drop-bg
					.drop-hint Drop here
</template>

<script>
  import { ipcRenderer } from 'electron'
  import fs from 'fs'
  import uuidv1 from 'uuid/v1'
  import json2xls from 'json2xls'
  import { fileListToArray } from '@/utils/index.js'

  export default {
    name: 'file-diff',
    data() {
      return {
        isMultiple: false,
        counter: 0,
        isDropping: false,
        files: []
      }
    },
    computed: {
      filename() {
        return this.files.map(file => file.name).join(', ')
      }
    },
    components: {},
    methods: {
      bindFileDropping() {
        const fileEl = this.$refs.fileInput
	      console.log('fileEl', fileEl)
        fileEl.addEventListener('drop', this.droppingHandler)
        fileEl.addEventListener('dragleave', this.droppingHandler)
        fileEl.addEventListener('dragenter', this.droppingHandler)
        fileEl.addEventListener('dragover', this.droppingHandler)
      },
      droppingHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        if (event.target === this.$refs.hint) return
        if (event.type === 'dragenter') this.counter++
        if (['dragleave', 'drop'].includes(event.type)) this.counter--
        this.isDropping = this.counter > 0
        if (event.type !== 'drop') return
        if (event.dataTransfer.files.length === 0) return
        this.files = fileListToArray(event.dataTransfer.files)
        if (!this.isMultiple) this.files.splice(1)
      },

      selectedFiles(files) {
        console.log('files', files)
        this.files = fileListToArray(files)
      }
    },
	  mounted() {
      this.bindFileDropping()
    }
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
