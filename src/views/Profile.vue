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
            <button class="button is-primary" v-bind:class="{ 'is-loading': isLoading }" @click="updateInfo">Update</button>
          </div>

          <transition name="fade">
            <div v-show="succesAlert" class="notification is-primary">
              The update is a success
            </div>
          </transition>
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
        name: '',
        isLoading: false,
        succesAlert: false,
      };
    },
    methods: {
      updateInfo: function() {
        this.isLoading = true;

        const firestore = firebase.firestore();
        const docPath = firestore.doc('/users/' + firebase.auth().currentUser.uid);

        docPath.update({
          name: this.name
        }).then(() => {
          this.isLoading = false;
          this.succesAlert = true;
          setTimeout(() => { this.succesAlert = false; }, 3000);
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

<style scoped>
  .control {
    margin-bottom: 0.75rem;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
