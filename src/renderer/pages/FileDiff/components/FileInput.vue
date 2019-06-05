<template lang="pug">
	md-field.input-field(
		ref="fileInput"
		:class="file ? 'hasImported' : ''"
	)
		md-file.input-file(
			:value="filename"
			:multiple="isMultiple"
			:placeholder="!isFileDropping ? 'You can drop files into this component.' : 'Drop here'"
			@md-change="handleOnChange"
		)
		button.cancel-button(
			v-if="file"
			@click="unsetFile"
		)
			cancel-icon.cancel-icon
</template>

<script>
  import CancelIcon from 'vue-material-design-icons/Cancel.vue'
  import { fileListToArray } from '@/utils/index.js'

  export default {
    name: 'file-input',
    data() {
      return {
        isMultiple: false,
        counter: 0,
        isFileDropping: false
      }
    },
	  props: {
      file: null,
      setFile: Function,
      unsetFile: Function
	  },
    computed: {
      filename() {
        return this.file ? this.file.name : ''
      }
    },
    components: {
      CancelIcon
    },
    methods: {
      bindFileDropping() {
        const fileEl = this.$refs.fileInput.$el
        fileEl.addEventListener('drop', this.droppingFileHandler)
        fileEl.addEventListener('dragleave', this.droppingFileHandler)
        fileEl.addEventListener('dragenter', this.droppingFileHandler)
        fileEl.addEventListener('dragover', this.droppingFileHandler)
      },
      droppingFileHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        if (event.type === 'dragenter') this.counter++
        if (['dragleave', 'drop'].includes(event.type)) this.counter--
        this.isFileDropping = this.counter > 0
        if (event.type !== 'drop') return
        if (event.dataTransfer.files.length === 0) return
        let files = fileListToArray(event.dataTransfer.files)
        if (!this.isMultiple) {
          files = files[0]
        }
        this.setFile(files)
        // const file = J.readFile(this.files[0].path)
      },
      handleOnChange(FileList) {
        if (FileList.length) {
          let files = FileList
          if (!this.isMultiple) {
            files = files[0]
          }
          this.setFile(files)
        }
      },
    },
    mounted() {
      this.bindFileDropping()
    }
  }
</script>

<style lang="sass">
	.input-field
		display: block
		width: 100%
		height: calc((100vh - 64px - 40px - 32px - 20px - 20px) / 2)
		min-height: 320px
		padding: 10px
		box-sizing: border-box
		border: 2px dotted rgba(0, 0, 0, .2)
		border-radius: 8px
		margin: 0
		overflow: scroll
		cursor: pointer
		transition: width .58s ease, height .38s ease
		&::before,
		&::after
			display: none
		.input-file
			box-sizing: border-box
			width: 100%
			overflow: hidden
			i
				display: none
			input
				cursor: pointer
				width: auto
			input.md-input
				box-sizing: border-box
				height: calc((100vh - 64px - 40px - 32px - 20px - 20px - 50px) / 2)
				min-height: 300px
				width: 100%
				padding: 0
				margin: 0
				text-align: center
				background-color: rgba(0, 0, 0, .03)
				border-radius: 5px
				text-overflow: ellipsis
				transition: width .58s ease, height .38s ease
	.input-field.hasImported
		width: 180px
		height: 30px
		min-height: auto
		padding: 5px 20px 5px 5px
		border-radius: 5px
		input.md-input
			height: 16px
			min-height: auto
			border-radius: 3px
			font-size: 11px
			font-weight: bold
			text-overflow: ellipsis
			text-align: left
			padding: 0 5px
		input
			font-size: 11px
			font-weight: bold
			text-overflow: ellipsis
			text-align: left
	.cancel-button
		cursor: pointer
		position: absolute
		top: 50%
		right: 2px
		transform: translateY(-50%)
		width: 18px
		height: 18px
		border: none
		margin: 0
		padding: 0
		background-color: transparent
		z-index: 100
		font-size: 14px
		text-align: center
		line-height: 18px
		transition: opacity .48s ease
		&:hover
			opacity: .6
</style>
