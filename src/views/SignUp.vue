<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div class="field">
          <label class="label is-medium">Name</label>
          <div class="control has-icons-left">
            <input class="input is-medium" type="text" v-model="name" placeholder="John">
            <span class="icon is-small is-left">
              <font-awesome-icon icon="user" />
            </span>
          </div>
        </div>

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
          <button class="button is-primary" @click="signUp">Sign Up</button>
        </div>

        <div class="content is-small">
          <br>
          <p>Or go back to <router-link to="login">login</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'signUp',
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            const firestore = firebase.firestore();
            const docPath = firestore.doc('/users/' + user.user.uid);

            docPath.set({
              name: this.name
            }).then(() => {
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