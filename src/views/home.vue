<template>
  <div class="home">
  <h1>Welcome {{dajmiUsera()}}!</h1>
  <div v-if="lists.length === 0">
      <p>No lists found.</p>
  </div>
  <ul v-else>
      <li v-for="list in lists" :key="list.id">
        <h2>{{ list.listName }}</h2>
        <ul>
      <li v-for="item in lists" :key="item.lists">
        {{ item.itemName }} - {{ item.quantity }} - {{ item.description }}
      </li>
        </ul>
      </li>
  </ul>
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
  mounted(){
    console.log("im tryin bro")
 
  },
  methods: {
  dajmiUsera(){
    return store.currentUser
  },
  /*displayLists(){
    const user = store.currentUser
    const mail = user.email
      
      const q = query(collection(db, "lists"), where("email", "==", mail));
  
      const data = doc.data()
      
      this.lists.push({
          id: doc.id,



      })
        
        console.log(doc.id)
        console.log(doc.data)
  }
  }

*/
  }
}

</script>
