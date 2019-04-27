<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <div class="seats">
        <seat v-for="seat in seats" :key="seat.id" :seat="seat"></seat>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  import Navbar from '@/components/layout/Navbar'
  import Seat from '@/components/Seat'

  export default {
    name: 'home',
    components: {
      Navbar,
      Seat
    },
    data() {
      return {
        seats: ''
      }
    },
    created: function() {
      const firestore = firebase.firestore();
      const docPath = firestore.collection('/seats');

      docPath.get().then((collectionSnapshot) => {
        this.seats = collectionSnapshot.docs;
      });
    }
  }
</script>

<style scoped>
  .seats {
    display: flex;
  }
</style>
