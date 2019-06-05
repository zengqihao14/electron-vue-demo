<template lang="pug">
	section.spreadsheet-wrapper
		md-button.md-raised.save-btn(@click="saveToXLS") Export
		.spreadsheet-contents(
			v-html="htmlXLSX"
			ref="htmlContents"
		)
</template>

<script>
  import { ipcRenderer } from 'electron'
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
      },
      saveToXLS() {
        ipcRenderer.send('open-directory-dialog', ['openDirectory', 'createDirectory', 'promptToCreate'])
        ipcRenderer.on('selectedPath', this.handleDirectoryFetched)
      },
      handleDirectoryFetched(e, path) {
        if (path === null) {
          console.log('请选择一个文件/文件夹')
        } else {
          ipcRenderer.send('open-savefile-dialog', {
            defaultPath: path
          })
          ipcRenderer.on('selectedItem', this.handleSaveFile)
        }
      },
      handleSaveFile(e, fullpath) {
        if (fullpath) {
          const htmlContents = this.$refs.htmlContents
          const wb = XLSX.utils.table_to_book(htmlContents);
          XLSX.writeFile(wb, `${fullpath}.xlsx`);
        }
      },
      handleHTMLContentsChange() {
        const htmlContents = this.$refs.htmlContents
        // const xtension = 'xls|xlsx|xlsm|xlsb|xml|csv|txt|dif|sylk|slk|prn|ods|fods|htm|html'.split('|')
        const wb = XLSX.utils.table_to_book(htmlContents);
      },
	    setHandleHTMLContentsChange() {
        const htmlContents = this.$refs.htmlContents
        htmlContents.addEventListener('DOMSubtreeModified', this.handleHTMLContentsChange);
	    },
      unsetHandleHTMLContentsChange() {
        const htmlContents = this.$refs.htmlContents
        htmlContents.removeEventListener('DOMSubtreeModified', this.handleHTMLContentsChange);
      }
    },
    mounted() {
	    this.sheetToHtml()
			this.setHandleHTMLContentsChange()
    },
	  beforeDestroy() {
      this.unsetHandleHTMLContentsChange()
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

			.save-btn
				position: relative

		&-contents
			overflow: scroll
			min-width: 1280px
			table
				position: relative
				width: 100%
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
