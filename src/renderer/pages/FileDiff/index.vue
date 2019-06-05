<template lang="pug">
	.transition-container
		h1.title File Diff
		div.input-container
			md-field.input-field(ref="fileInputLeft")
				md-file.input-file(
					:value="filename1"
					:multiple="isMultiple"
				)
				span.hint(
					v-if="!file1 && !isFile1Dropping"
					ref="hint1"
				) You can drop files into this component.
				.drop-notice(v-if="!file1 && isFile1Dropping")
					.drop-bg
					.drop-hint Drop here
			span.breakline
			md-field.input-field(ref="fileInputRight")
				md-file.input-file(
					:value="filename2"
					:multiple="isMultiple"
				)
				span.hint(
					v-if="!file2 && !isFile2Dropping"
					ref="hint2"
				) You can drop files into this component.
				.drop-notice(v-if="!file2 && isFile2Dropping")
					.drop-bg
					.drop-hint Drop here
		div.spreadsheet-display-contatiner#spreadsheet1
</template>

<script>
  import { fileListToArray } from '@/utils/index.js'

  export default {
    name: 'file-diff',
    data() {
      return {
        isMultiple: false,
        counter: 0,
        file1: null,
        file2: null,
        isFile1Dropping: false,
        isFile2Dropping: false
      }
    },
    computed: {
      filename1() {
        return this.file1 ? this.file1.name : ''
      },
      filename2() {
        return this.file2 ? this.file2.name : ''
      }
    },
    components: {},
    methods: {
      bindFileDropping() {
        const fileElLeft = this.$refs.fileInputLeft.$el
        fileElLeft.addEventListener('drop', this.droppingFile1Handler)
        fileElLeft.addEventListener('dragleave', this.droppingFile1Handler)
        fileElLeft.addEventListener('dragenter', this.droppingFile1Handler)
        fileElLeft.addEventListener('dragover', this.droppingFile1Handler)

        const fileElRight = this.$refs.fileInputRight.$el
        fileElRight.addEventListener('drop', this.droppingFile2Handler)
        fileElRight.addEventListener('dragleave', this.droppingFile2Handler)
        fileElRight.addEventListener('dragenter', this.droppingFile2Handler)
        fileElRight.addEventListener('dragover', this.droppingFile2Handler)
      },
      droppingFile1Handler(event) {
        event.preventDefault()
        event.stopPropagation()
        if (event.target === this.$refs.hint1) return
        if (event.type === 'dragenter') this.counter++
        if (['dragleave', 'drop'].includes(event.type)) this.counter--
        this.isFile1Dropping = this.counter > 0
        if (event.type !== 'drop') return
        if (event.dataTransfer.files.length === 0) return
        this.file1 = fileListToArray(event.dataTransfer.files)
        if (!this.isMultiple) {
          this.file1 = this.file1[0]
        }
      },
      droppingFile2Handler(event) {
        event.preventDefault()
        event.stopPropagation()
        if (event.target === this.$refs.hint2) return
        if (event.type === 'dragenter') this.counter++
        if (['dragleave', 'drop'].includes(event.type)) this.counter--
        this.isFile2Dropping = this.counter > 0
        if (event.type !== 'drop') return
        if (event.dataTransfer.files.length === 0) return
        this.file2 = fileListToArray(event.dataTransfer.files)
        if (!this.isMultiple) {
          this.file2 = this.file2[0]
        }
        // const file = J.readFile(this.files[0].path)
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
		margin: 10px auto 0
		padding: 10px
		width: 100%
		display: flex
		flex-direction: column
		justify-content: flex-start
		.input-field
			display: block
			width: 100%
			height: calc((100vh - 64px - 40px - 32px - 20px - 20px) / 2)
			min-height: 320px
			padding: 10px
			box-sizing: border-box
			border: 2px dotted rgba(0, 0, 0, .2)
			border-radius: 10px
			margin: 0
			overflow: scroll
			&::before,
			&::after
				display: none
			.input-file
				box-sizing: border-box
				width: 100%
				overflow: hidden
				i
					display: none
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
					-webkit-text-fill-color: #8B0000 !important
				input
					width: auto
			.hint,
			.drop-notice
				position: absolute
				box-sizing: border-box
				top: 50%
				left: 50%
				width: auto
				height: auto
				transform: translate(-50%, -50%)
				text-align: center
				padding: 15px
				color: #777
	.spreadsheet-display-contatiner
		display: block
		width: 100%
		margin: 15px 0
	.breakline
		height: 1px
		width: 100%
		background-color: rgba(0, 0, 0, .5)
		margin: 18px 0 19px
</style>
