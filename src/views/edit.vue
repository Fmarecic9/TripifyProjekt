<template>
    <div class="edit">
        <h1>Edit the lists </h1>
      <div v-if="lists.length === 0">
        <p>No lists found.</p>
      </div>
      <div v-else class="lists-container" >
      <div v-for="list in lists" :key="list.id" class="list-table">
         <h2 class="table-header">
          <router-link to="lists"><button type="button" class="batun" aria-label="Close" @click="editBack()">Back</button> </router-link>
          <span>{{ list.listName }} </span>
          <button type="button" class="btn-close" aria-label="Close" @click="deleteList(list.id)"></button> 
        </h2>
        <table class="scrolling">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="(item) in list.items " :key="item.itemName">
              <td >{{ item.itemName }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.description }}</td>

              <td>
                <button >Edit</button>
            
              </td>
            </tr>
          </tbody>
        </table>
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
.batun{
  font-size: 70%;
  border-radius: 20px;
  border: none;
  color:white;
  background-color:#2dc9a5;
}
.batun:hover{
  background-color: #1b9f80;
}
.table-header{  
  display: flex;
  justify-content: space-between; /* Distribute items with space between */
  align-items: center; /* Align items vertically in the center */

}

</style>


<script>
import { db } from '@/firebase';
import { doc, getDocs, collection, query, where, deleteDoc} from 'firebase/firestore';
import store from '@/store'

export default {
    name: 'editLists',
    data(){
        return{
          listName: '',
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
  
    },
 
    async deleteList(listId) {
      const userConfirm = confirm("Are sure you want to delete this list?")

    if(userConfirm){
    try {
      await deleteDoc(doc(db, "lists", listId));
    this.lists = this.lists.filter(list => list.id !== listId);
  
    alert("List deleted successfully!");
  } catch (e) {
    console.error("Error deleting list: ",listId, e);
  }
    }else{
      alert("List deletion cancelled");

    }
    },
    editBack(){
      this.$router.push({ name: "lists" }); 
    },
  },
 
  }

 
  
  

</script>