<template>
  <div class="sign-up">
    <p>Let's create a new account</p>
    <input type="text" v-model="name" placeholder="Name"><br>
    <input type="email" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp">Sign Up</button>
    <span>or go back to <router-link to="login">login</router-link>.</span>
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