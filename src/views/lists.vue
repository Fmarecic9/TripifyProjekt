<template>
<br>
<br>
  <div class="lists">
    <div v-if="lists.length === 0">
      <p>No lists found.</p>
    </div>
    
    <div v-else class="lists-container">
      <div v-for="list in lists" :key="list.id" class="list-table">
        <h2>{{ list.listName }}</h2>
        <table class="scrolling">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody class="items-container">
            <tr v-for="item in list.items" :key="item.itemName" class="item-row">
              <td>{{ item.itemName }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.description }}</td>
            </tr>

          </tbody>
        </table>
          <router-link to="/edit"><button type="button" class="btn btn-primary" @click="editList">Edit</button></router-link>
      </div>
    </div>
  </div>
</template>
<style>
.scrolling{
    display: block;
  max-height: 300px;  
  overflow-y: auto; 
} 
.view {
  padding: 20px;
}

.lists-container {
  display: flex; 
  flex-wrap: wrap; 
  gap: 20px; 

}
.list-table {
  border: 3px solid #000000;
  background-color: lightgray;
  border-radius:15px;
  padding: 10px;
  width: 300; 
  max-height: 400px; 
  overflow: hidden; 
}

.list-table h2 {
  text-align: center;
}

.table-container {
  max-height: 300px; 
  overflow-y: auto; 

}

.list-table table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #000000;
  background-color:white;
}

.list-table th, .list-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;

}

.items-container {
  max-height: 200px; 
  overflow-y: auto; 

}
</style>
<script>
import { db } from '@/firebase';
import { getDocs, collection, query, where} from 'firebase/firestore';
import store from '@/store'

export default {
    name: 'view',
    data(){
        return{
          listName: '',
          items: {},
          lists: [],
        }
    },
  mounted(){
    console.log("im tryin bro")
    this.displayLists()

  },
  methods: {
  async displayLists(){
      const userEmail = store.currentUser
      
      const q = query(collection(db, "lists"),where("user", "==", userEmail));
      const querySnapshot = await getDocs(q)
      
      this.lists = [  ];

      querySnapshot.forEach(doc => {
        console.log(doc.id)
        console.log(doc.data())
        
        const data = doc.data()    // Spread the document data
        
        this.lists.push({
            id: doc.id,
            ...data, // Spread operator to include all fields (listName, items, etc.)
          });
        });
  
  }
},
  editList() {
      this.$router.push({ name: "edit" }); 
    },
}  
      
  
  


</script>
