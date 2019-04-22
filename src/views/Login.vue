<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <p class="has-text-centered"><img src="../assets/logo.png" alt="" class="logo"></p>
        <component v-bind:is="formType"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginForm from '@/components/login/LoginForm'
  import SignUpForm from '@/components/login/SignUpForm'

  export default {
    name: 'login',
    components: {
      LoginForm,
      SignUpForm
    },
    computed: {
      formType: function() {
        return this.$route.meta.formType;
      }
    }
  }
</script>

<style scoped>
  .logo {
    margin: 30px 0 20px 0;
  }
</style>
