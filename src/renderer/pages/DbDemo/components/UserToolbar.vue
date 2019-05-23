<template lang="pug">
	.user-toolbar-wrapper
		.user-toolbar--row
			md-field.user-toolbar-field
				label Name
				md-input(v-model="userData.name")
			md-field.user-toolbar-field
				label(for="gender") Gender
				md-select(v-model="userData.gender" name="gender" id="gender")
					md-option(value="male") Male
					md-option(value="female") Female
			md-field.user-toolbar-field
				label Age
				md-input(v-model="userData.age" type="number")
			md-button.md-raised(@click="newUser") ADD
		.user-toolbar--row
			md-field.user-toolbar-field
				label Tel
				md-input(v-model="userData.tel" type="number")
			md-field.user-toolbar-field
				label Email
				md-input(v-model="userData.email")
			md-field.user-toolbar-field
				label Address
				md-input(v-model="userData.address")
</template>

<script>
	import { EMPTY_USER_DATA } from '@/constant/DB/user'

  export default {
    name: 'user-toolbar',
	  data() {
      return {
        userData: EMPTY_USER_DATA
      }
	  },
    props: {
      addUser: Function
    },
    methods: {
      newUser() {
        this.addUser(this.userData)
      }
    }
  }
</script>

<style lang="sass">
	.user-toolbar
		&-wrapper
			display: flex
			flex-direction: column
			width: 100%
			padding: 8px
			margin: 15px 0
			border: 1px solid rgba(0, 0, 0, .15)
			border-radius: 3px
		&--row
			display: inline-flex
			width: 100%
		&-field
			margin: 2px 10px 15px
			label
				font-size: 10px
			input
				font-size: 10px !important
</style>

