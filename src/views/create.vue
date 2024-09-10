<template>
    <div class="header-container">
      <router-link to="lists">
        <button type="button" class="batun" aria-label="Close" @click="createBack()">Back</button>
      </router-link>
      <h2>Create your item list</h2>
    </div>
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
      if (this.newItem.quantity < 1 || !this.listName){
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
        this.$router.push({name:'lists'})
      } catch (e) {
        console.error("Could not add doc to database ", e);
      }
    },
    createBack(){
      this.$router.push({ name: "lists" }); 
    },
    }
}



</script>
<style>
.create {
  margin: auto;
  width:40%;
  border: 3px solid #000000;
  border-radius: 15px;
  background-color: lightgray;
}
.header-container {
  display: flex;
  justify-content: center; 
  align-items: center; 
  padding: 10px 20px; 
} 
.header-container h2 {
  margin: 0 auto; 
  text-align: center;
  flex-grow: 1; 
}
.header-container batun {
  position: absolute;
  left: 0;
}
.batun{
  font-size: 150%;
  border-radius: 12px;
  border: none;
  color:white;
  background-color:#2dc9a5;
}
.batun:hover{
  background-color: #1b9f80;
}
</style>
