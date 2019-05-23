<template lang="pug">
	.table
		md-table(
			v-model="users"
			md-sort="id"
			md-sort-order="asc"
			md-card
		)
			md-table-toolbar
				h1.table-title Users
				user-toolbar(:addUser="addUser")
			md-table-row(slot="md-table-row" slot-scope="{ item }")
				md-table-cell(md-label="ID" md-sort-by="id") {{item.id}}
				md-table-cell(
					md-label="NAME"
					md-sort-by="name"
				)
					input(
						v-if="currentEditId === item.id && currentEditKey === 'name'"
						:value="item.name"
						name="name"
						type="input"
						@blur="unsetEdit"
					)
					span(
						v-else
						@click="setEdit(item.id, 'name')"
					) {{item.name || '      '}}
				md-table-cell(md-label="GENDER" md-sort-by="gender") {{item.gender}}
				md-table-cell(md-label="AGE" md-sort-by="age" md-numeric) {{item.age}}
				md-table-cell(md-label="EMAIL" md-sort-by="email") {{item.email}}
				md-table-cell(md-label="TEL" md-sort-by="tel" md-numeric) {{item.tel}}
				md-table-cell(md-label="ADDRESS" md-sort-by="address") {{item.address}}
				md-table-cell(md-label="OPERATE")
					md-button.md-raised.md-primary(@click="deleteUser(item.id)") Delete
</template>

<script>
	import UserToolbar from '@/pages/DbDemo/components/UserToolbar'

  export default {
    name: 'user-table',
	  data() {
      return {
        currentEditId: null,
        currentEditKey: null,
        currentEditData: null
      }
	  },
    props: {
      users: Array,
      addUser: Function,
      updateUser: Function,
      deleteUser: Function
    },
	  components: {
      UserToolbar
	  },
	  methods: {
      setEdit(id, key) {
        this.currentEditId = id
	      this.currentEditKey = key
	      console.log('setEdit(id, key)', id, key)
      },
      unsetEdit(e) {
        const val = e.target.value
	      this.updateUser(this.currentEditId, {
	        [this.currentEditKey]: val
	      })
        this.currentEditId = null
        this.currentEditKey = null
	      this.currentEditData = null
      }
	  }
  }
</script>

<style lang="sass">
	.table-title
		font-size: 18px
		font-weight: bold
		padding: 15px 0 0
	.table
		width: 100%
		padding: 0
		margin: 15px 0
		tr,
		th,
		td
			word-break: break-word
			line-break: anywhere
			overflow-wrap: break-word
		.md-table-cell
			input
				min-width: auto
				width: 100% !important
				padding: 0
				margin: 0
				font-size: 13px
				border: none
</style>

