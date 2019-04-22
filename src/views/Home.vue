<template>
  <div class="home">
    {{ userInfo.name }}
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'home',
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
