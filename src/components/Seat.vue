<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ seatData.name }} - {{ seatData.status }}
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        {{ seatData.desc }}
      </div>
    </div>
    <footer class="card-footer">
      <a @click="sitHere" class="card-footer-item">Sit here</a>
    </footer>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'seat',
    props: [
      'seat'
    ],
    data() {
      return {
        seatData: ''
      }
    },
    created: function() {
      this.seatData = this.seat.data();
    },
    methods: {
      sitHere: function() {
        const firestore = firebase.firestore();

        const docPath = firestore.doc('/seats/' + this.seat.id);

        docPath.update({
          status: 'occupied'
        }).then(() => {
          console.log('Done');
        });
      }
    }
  }
</script>

<style scoped>
  .card {
    margin:  0 15px;
    flex: 0 1 calc(20% - 30px);
  }

  .card:nth-child(5n + 1) {
    margin-left: 0;
    flex: 0 1 calc(20% - 15px);
  }

  .card:nth-child(5n + 5) {
    margin-right: 0;
    flex: 0 1 calc(20% - 15px);
  }
</style>
