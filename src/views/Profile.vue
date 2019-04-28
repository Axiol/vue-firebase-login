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
  import { mapState, mapActions } from 'vuex'

  import Navbar from '@/components/layout/Navbar'

  export default {
    name: 'profile',
    components: {
      Navbar
    },
    data() {
      return {
        name: '',
        isLoading: false,
        succesAlert: false,
      };
    },
    methods: {
      ...mapActions(['setUser', 'updateUser']),
      updateInfo: function() {
        this.isLoading = true;

        const user = {
          name: this.name
        }

        const payload = {
          id: firebase.auth().currentUser.uid,
          user: user
        };

        this.updateUser(payload).then(() => {
          this.isLoading = false;
          this.succesAlert = true;
          setTimeout(() => { this.succesAlert = false; }, 3000);
        });
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    created: function() {
      if(typeof userInfo == 'undefined') {
        this.setUser(firebase.auth().currentUser.uid).then(() => {
          this.name = this.userInfo.name;
        });
      } else {
        this.name = this.userInfo.name;
      }
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
