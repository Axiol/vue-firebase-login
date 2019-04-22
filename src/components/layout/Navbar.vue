<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <img src="../../assets/logo.png" class="logo">

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/home" class="navbar-item">Home</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Hello {{ userInfo.name }}</a>

          <div class="navbar-dropdown is-right">
            <router-link to="/profile" class="navbar-item">My profile</router-link>
            <hr class="navbar-divider">
            <a @click="logout" class="navbar-item">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'navbar',
    data() {
      return {
        userInfo: '',
      };
    },
    methods: {
      logout: function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login');
        });
      }
    },
    created: function() {
      const firestore = firebase.firestore();
      const docPath = firestore.doc('/users/' + firebase.auth().currentUser.uid);

      docPath.get().then((doc) => {
        if (doc && doc.exists) {
          this.userInfo = doc.data();
        }
      });
    }
  }
</script>

<style scoped>
  .navbar {
    margin-bottom: 4rem;
  }

    .logo {
      max-height: 28px;
      margin: 0.75rem 0.5rem 0 0.5rem;
    }
</style>