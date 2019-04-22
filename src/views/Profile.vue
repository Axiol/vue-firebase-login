<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h1 class="title">Update information</h1>
    
          <div class="field">
            <label class="label is-medium">Name</label>
            <div class="control has-icons-left">
              <input class="input is-medium" type="text" v-model="name" placeholder="John">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="user" />
              </span>
            </div>
          </div>

          <div class="control">
            <button class="button is-primary" @click="updateInfo">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  import Navbar from '@/components/layout/Navbar'

  export default {
    name: 'profile',
    components: {
      Navbar
    },
    data() {
      return {
        userInfo: '',
        name: ''
      };
    },
    methods: {
      updateInfo: function() {
        const firestore = firebase.firestore();
        const docPath = firestore.doc('/users/' + firebase.auth().currentUser.uid);

        docPath.set({
          name: this.name
        }).then(() => {
          alert('Update done');
        });
      }
    },
    created: function() {
      const firestore = firebase.firestore();
      const docPath = firestore.doc('/users/' + firebase.auth().currentUser.uid);

      docPath.get().then((doc) => {
        if (doc && doc.exists) {
          this.userInfo = doc.data();

          this.name = this.userInfo.name;
        }
      });
    }
  }
</script>
