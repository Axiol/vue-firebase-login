<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{ userInfo.name }}
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
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
