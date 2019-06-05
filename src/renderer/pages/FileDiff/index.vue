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
			.breakline
				md-button.md-raised.diff-btn(@click="doDiff") Diff
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
  import XLSX from 'xlsx'
  import { diffJson, diffArrays } from 'diff'
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
      doDiff() {
				if (this.file1xlsx && this.file2xlsx) {
				  try {
            const file1Json = XLSX.utils.sheet_to_json(this.file1xlsx.Sheets[this.file1xlsx.SheetNames[0]], {header: 'A'})
            const file2Json = XLSX.utils.sheet_to_json(this.file2xlsx.Sheets[this.file2xlsx.SheetNames[0]], {header: 'A'})
            file1Json.forEach((row, idx) => {
              const diff = diffJson(row, file2Json[idx])
              console.log('diff', diff)
            })
				  } catch (e) {
					  console.log(e)
          }
				}
      }
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
		.diff-btn
			position: absolute
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
			height: 25px
			z-index: 10
			.md-button-content
				font-size: 12px
</style>
