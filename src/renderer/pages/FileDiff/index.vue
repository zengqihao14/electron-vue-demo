<template lang="pug">
	.transition-container
		h1.title SpreadSheet
		div.input-container
			file-input(
				:file="file1"
				:xlsx="file1xlsx"
				:setFile="setFile1"
				:unsetFile="unsetFile1"
			)
			spread-sheet(
				v-if="file1xlsx"
				:file="file1"
				:xlsx="file1xlsx"
			)
			span.breakline
			file-input(
				:file="file2"
				:xlsx="file2xlsx"
				:setFile="setFile2"
				:unsetFile="unsetFile2"
			)
			spread-sheet(
				v-if="file2xlsx"
				:file="file2"
				:xlsx="file2xlsx"
			)
		div.spreadsheet-display-contatiner#spreadsheet1
</template>

<script>
  import FileInput from '@/pages/FileDiff/components/FileInput'
  import SpreadSheet from '@/pages/FileDiff/components/SpreadSheet'

  export default {
    name: 'file-diff',
    data() {
      return {
        isMultiple: false,
        counter: 0,
        file1: null,
        file2: null,
        file1xlsx: null,
        file2xlsx: null,
        isFile1Dropping: false,
        isFile2Dropping: false
      }
    },
    components: {
      FileInput,
      SpreadSheet
    },
    methods: {
	    setFile1(FileList, xlsx) {
		    if (FileList && xlsx) {
          this.file1 = FileList
          this.file1xlsx = xlsx
		    }
	    },
      setFile2(FileList, xlsx) {
        if (FileList && xlsx) {
          this.file2 = FileList
          this.file2xlsx = xlsx
        }
      },
      unsetFile1() {
        this.file1 = null
        this.file1xlsx = null
      },
      unsetFile2() {
        this.file2 = null
        this.file2xlsx = null
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
