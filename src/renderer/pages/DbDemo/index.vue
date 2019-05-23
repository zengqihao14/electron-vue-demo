<template lang="pug">
	.transition-container
		h1.title DB Demo
		div.button-wrapper
			md-button.md-raised(@click="getUsers") get users
			md-button.md-raised(@click="cleanUsers") clean users
			md-button.md-raised(@click="saveToXLS") Export to XLS
		user-table(
			:users="users"
			:addUser="addUser"
			:updateUser="updateUser"
			:deleteUser="deleteUser"
		)
</template>

<script>
	import fs from 'fs'
	import uuidv1 from 'uuid/v1'
	import json2xls from 'json2xls'
	import UserTable from '@/pages/DbDemo/components/UserTable'

  export default {
    name: 'db-demo',
    data() {
      return {
        users: []
      }
    },
	  components: {
      UserTable
	  },
    methods: {
      getUsers() {
        this.users = this.$root.$db.read().get('users').value()
      },
      async addUser(data) {
        await this.$root.$db.read()
	        .get('users')
	        .push({
		        id: uuidv1(),
		        ...data
	        })
	        .write()
        this.getUsers()
      },
      async updateUser(id, data) {
        await this.$root.$db.read()
          .get('users')
          .find({ id })
          .assign({
            ...data
          })
          .write()
        this.getUsers()
      },
      async deleteUser(id) {
        console.log('delete id:', id)
        await this.$root.$db.read()
	        .get('users')
          .remove({ id })
	        .write()
        this.getUsers()
      },
      async cleanUsers() {
        await this.$root.$db.read().set('users', []).write()
	      this.getUsers()
			},
			saveToXLS() {
				const xls = json2xls(this.users);
        fs.writeFileSync('data.xlsx', xls, 'binary');
			}
    },
	  beforeMount() {
      this.getUsers()
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
