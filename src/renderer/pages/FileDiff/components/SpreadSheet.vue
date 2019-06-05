<template lang="pug">
	section.spreadsheet-wrapper
		.spreadsheet-contents(v-html="htmlXLSX")
</template>

<script>
  import XLSX from 'xlsx'

  export default {
    name: 'file-spreadsheet',
    data() {
      return {
        htmlXLSX: null
      }
    },
    props: {
      file: null,
      xlsx: null
    },
    computed: {
    },
    components: {
    },
    methods: {
      sheetToHtml() {
        if (this.xlsx) {
          try {
            this.htmlXLSX = XLSX.utils.sheet_to_html(this.xlsx.Sheets[this.xlsx.SheetNames[0]], { editable: true })
          } catch (e) {
            console.log(e)
          }
        }
      }
    },
    mounted() {
	    this.sheetToHtml()
    }
  }
</script>

<style lang="sass">
	.spreadsheet
		&-wrapper
			position: relative
			display: block
			box-sizing: border-box
			width: 100%
			height: 350px
			overflow: scroll
			margin: 10px 0
		&-contents
			overflow: scroll
			min-width: 1280px
			table
				position: relative
				tbody
					position: relative
					width: auto
					overflow: scroll
				tr
					position: relative
					background-color: rgba(0, 0, 0, 0)
					font-size: 11px
					font-weight: normal
					&:first-child
						background-color: rgba(0, 0, 0, .7)
						border: 1px solid rgba(0, 0, 0, .7)
						color: #FFF
						font-weight: bold
						position: sticky
						top: 0
					td
						position: relative
						padding: 1px 5px
						border: 1px solid rgba(0, 0, 0, .15)
						cursor: pointer
						transition: background-color .36s ease
						&:hover
							background-color: rgba(50, 130, 180, .1)
</style>
