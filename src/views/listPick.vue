<template>

  <div class="lists">
    <div v-if="lists.length === 0">
      <p>No lists found.</p>
    </div>
    <div v-else class="lists-container">
      <div v-for="list in lists" :key="list.id" class="list-table">
        <h2 class="table-header">
        
        <h2>{{ list.listName }}</h2>
        <button type="button"  @click="selectList(list)" class="btn btn-primary" aria-label="Select" >Select</button> 
        </h2>
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

      </div>
    </div>
  </div>
 
</template>



<script>
import { db } from '@/firebase';
import { getDocs, collection, query, where} from 'firebase/firestore';
import store from '@/store';


export default {
    data() {
        return{
          lists: [],

        }   
    },
    mounted(){
      this.displayLists()
    },
  methods: {
  async displayLists(){
      const userEmail = store.currentUser
      
      const q = query(collection(db, "lists"),where("user", "==", userEmail));
      const querySnapshot = await getDocs(q)
      
      this.lists = [  ];

      querySnapshot.forEach(doc => {
 
        
        const data = doc.data()    
        
        this.lists.push({
            id: doc.id,
            ...data, 
          });

        });

  },
  selectList(list) {
      this.$emit('selectedList', list);
    },
}
}

</script>
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
.table-header{
  display: flex;
  align-items: center; 

}
.back-button{
 font-size: 150%;
  border-radius: 12px;
  border: none;
  color:white;
  background-color:#2dc9a5;
}
.back-button:hover{
    background-color: #1b9f80;
}

</style>
