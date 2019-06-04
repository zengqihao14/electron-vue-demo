<template lang="pug">
	.transition-container
		h1.title File Diff
		div.input-container(ref="fileInput")
			md-field.input-field
				md-file.input-file(
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
  import J from 'j'
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
	      const file = J.readFile(this.files[0].path)
      },

      selectedFiles(files) {
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
	.input-container
		box-sizing: border-box
		margin: 12px auto
		padding: 12px
		width: 100%
		.input-field
			width: 100%
			.input-file
				box-sizing: border-box
				width: 100%
</style>
