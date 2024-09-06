<template>
    <div class="edit">
        <h1>Edit the lists </h1>
      <div v-if="lists.length === 0">
        <p>No lists found.</p>
      </div>
      <div v-else class="lists-container">
      <div v-for="list in lists" :key="list.id" class="list-table">
        <h2>{{ list.listName }} 
          <button type="button" class="btn-close" aria-label="Close" @click="deleteList(list.id)"></button> 
        </h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
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
      console.log("Deleting list with ID:", listId);
     try {
      await deleteDoc(doc(db, "lists", listId));
    this.lists = this.lists.filter(list => list.id !== listId);
  
    alert("List deleted successfully!");
  } catch (e) {
    console.error("Error deleting list: ",listId, e);
  }
    }
  }
}  
 
  
  

</script>