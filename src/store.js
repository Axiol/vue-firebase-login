import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: ''
  },
  mutations: {
    SET_USER: (state, user) => {
      state.userInfo = user;
    }
  },
  actions: {
    setUser: (context, id) => {
      return new Promise((resolve, reject) => {
        const firestore = firebase.firestore();
        const docPath = firestore.doc('/users/' + id);

        docPath.get().then((doc) => {
          if (doc && doc.exists) {
            context.commit('SET_USER', doc.data());
            resolve();
          }
        });
      });
    },
    updateUser: (context, payload) => {
      return new Promise((resolve, reject) => {
        const firestore = firebase.firestore();
        const docPath = firestore.doc('/users/' + payload.id);

        docPath.update(payload.user).then(() => {
          context.commit('SET_USER', payload.user);
          resolve();
        });
      });
    }
  },
  getters: {

  }
});