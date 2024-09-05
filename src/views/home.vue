<template>
  <div class="home">
  <h1>Welcome {{dajmiUsera()}}!</h1>

  
  </div>
</template>
<script>
import { db } from '@/firebase'
import { collection, query, where} from 'firebase/firestore'
import store from '@/store'

export default {
  data(){
    return {
      listName:"",
      lists: [],
    }

  },
  methods: {
  dajmiUsera(){
    return store.currentUser
  },

  }
}

</script>
