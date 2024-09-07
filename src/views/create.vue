<template>
  <h2>Create your item list</h2>
  <div class="create">

  <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="nameList">List name</label>
            <input type="text" v-model="listName" class="form-control" id="listName" aria-describedby="emailHelp" placeholder="Name of your list">
            </div>

        <div class="itemSelection">
          <h3>Add items</h3>
          
            <div class="form-group">
              <label for="itemName">Item Name</label>
              <input v-model="newItem.itemName" type="text" class="form-control" placeholder="Item" />
            </div>

            <div class="form-group">
              <label for="quantity">Quantity</label>
              <input v-model="newItem.quantity" type="number" class="form-control" placeholder="Quantity" />
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea v-model="newItem.description" class="form-control" placeholder="Description"></textarea>
            </div>    
            
            
        </div>   
            <br>
            <button type="button" @click='addItem' class="btn btn-primary">Add</button> 
            <button type="button"  @click='saveList' class="btn btn-success">Finish</button>
 
          </form>
  </div>
</template>
<style>
.create {
  margin: auto;
  width:40%;
  border: 3px solid #000000;
  border-radius: 15px;
  background-color: lightgray;
}

</style>

<script>
import { db } from '@/firebase'
import { collection, addDoc} from 'firebase/firestore'
import store from '@/store'


export default {
  data() {
    return {
      listName: '',
      newItem: {itemName: '', quantity: 1, description: ''},
      items: []
      
    }
  },
  methods: {

    addItem(){
      if (this.newItem.quantity < 1 || !this.newItem.itemName || !this.newItem.description || !this.listName) {
        alert("You can not leave empty fields")
        return
      } 
      this.items.push({ ...this.newItem });
      
      this.newItem.itemName = '';
      this.newItem.quantity = 1; 
      this.newItem.description = '';
    },
     async saveList() {
      if (this.newItem.quantity < 1 || !this.newItem.itemName || !this.newItem.description || !this.listName){
        alert("You can not leave empty fields")
        return
      }
      
      try {
        // Save the list and items to Firestore
        await addDoc(collection(db, "lists"), {
          listName: this.listName,
          items: this.items,
          user: store.currentUser
        }); 
        this.listName = '';
        this.items = [];
      } catch (e) {
        console.error("Could not add doc to database ", e);
      }
    }
    }
}



</script>
