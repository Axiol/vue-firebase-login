<template>
  <div>
    <h1 class="title">Log in</h1>
    
    <div class="field">
      <label class="label is-medium">E-mail address</label>
      <div class="control has-icons-left">
        <input class="input is-medium" type="email" v-model="email" placeholder="john.doe@email.net">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="envelope" />
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label is-medium">Password</label>
      <div class="control has-icons-left">
        <input class="input is-medium" type="password" v-model="password" placeholder="●●●●●●">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="key" />
        </span>
      </div>
    </div>

    <div class="control">
      <button class="button is-primary" @click="login">Connection</button>
    </div>

    <div class="content is-small">
      <br>
      <p>You don't have an account? You can <router-link to="/sign-up">create one</router-link></p>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { mapActions } from 'vuex'

  export default {
    name: 'loginForm',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      ...mapActions(['setUser']),
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.setUser(user.user.uid).then(() => {
              this.$router.replace('home');
            });
          },
          (err) => {
            alert('Oops. ' + err.message);
          }
        );
      }
    }
  }
</script>