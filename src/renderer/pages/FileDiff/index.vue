<template lang="pug">
	.transition-container
		h1.title File Diff
		div.input-container
			file-input(
				:file="file1"
				:setFile="setFile1"
				:unsetFile="unsetFile1"
			)
			span.breakline
			file-input(
				:file="file2"
				:setFile="setFile2"
				:unsetFile="unsetFile2"
			)
		div.spreadsheet-display-contatiner#spreadsheet1
</template>

<script>
  import FileInput from '@/pages/FileDiff/components/FileInput'
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
    components: {
      FileInput
    },
    methods: {
	    setFile1(FileList) {
        this.file1 = FileList
	    },
      setFile2(FileList) {
        this.file2 = FileList
      },
      unsetFile1() {
        this.file1 = null
      },
      unsetFile2() {
        this.file1 = null
      },
    },
	  mounted() {}
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
