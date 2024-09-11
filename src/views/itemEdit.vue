<template>
    <div class="itemEdit">
        <h1>Editing item</h1>
    </div>
  <div>
    
    <form @submit.prevent="saveChanges">
        <div class="item-editing">
          <h2 class="table-header">
            <router-link to="edit"><button type="button" class="cancel-button" aria-label="Close" @click="cancelItemEdit()">Cancel</button> </router-link>
          <span> Edit item</span>
          <button type="button"  class="btn-close" aria-label="Close" @click="deleteItem(itemName)"></button> 
          </h2>
            <div class="form-group">
              <label for="itemName">Item Name</label>
              <input type="text" v-model="editedItemName" class="form-control" placeholder="Item" />
            </div>

            <div class="form-group">
              <label for="quantity">Quantity</label>
              <input type="number" v-model="editedQuantity" class="form-control" placeholder="Quantity" />
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea v-model="editedDescription" class="form-control"  placeholder="Description"></textarea>
            </div>    
            <button type="button" @click="saveChanges()" class="btn btn-success">Save changes</button>
            
            
        </div>   
    </form>
  </div>

</template>




<script>
import {getDoc, doc, updateDoc, deleteField} from 'firebase/firestore'
import {db} from '@/firebase';



export default {
    props: ['itemName', 'quantity', 'description' ],
    data(){
    return{
        editedItemName: this.itemName,
        editedQuantity: this.quantity,
        editedDescription: this.description ||'',    
        }
    },
   computed: {
    listId() {
      return this.$route.query.listId;
    },
    },
    methods: {
    async saveChanges() {
    try{
        console.log("listid", this.listId)
    if (this.editedQuantity < 1)  { 
        alert("Item quantity cannot be 0!")
        return;
        }
 
    const listRef = doc(db, 'lists', this.listId);
    const listDoc = await getDoc(listRef);

    const listData = listDoc.data();

    const updatedItems = listData.items.map(item =>
          item.itemName === this.itemName
            ? {
                ...item,
                itemName: this.editedItemName,
                quantity: this.editedQuantity,
                description: this.editedDescription || '',
              }
            : item
        );
        await updateDoc(listRef, { items: updatedItems });
        this.$router.push({ name: 'edit' });
  
      
        }catch(e){
            console.error('Error updating item...', e)
            this.$router.push({ name: 'edit' });
        }
        
        
    },
    async deleteItem(itemName){
    const userConfirm = confirm("Are sure you want to delete this item?")
    if (userConfirm){
    try{
    const listRef = doc(db, 'lists', this.listId);
    const listDoc = await getDoc(listRef);

    const listData = listDoc.data();

    const remainingItems = listData.items.filter(item => item.itemName !== itemName);

    await updateDoc(listRef, { items: remainingItems });
    this.$router.push({ name: 'edit' });
    }
    catch(e){
      console.error("Could not delete item")
       this.$router.push({ name: 'edit' });
    }
    }
    else{
      alert("Item delete cancelled")
    }

    },
    cancelItemEdit(){
        console.log("Cancelling...")
        this.$router.push({name:'edit'})
    }
},
};

</script>
<style>
.item-editing {
  margin: auto;
  width:40%;
  border: 3px solid #000000;
  border-radius: 15px;
  background-color: lightgray;
}
.table-header{
  display: flex;
  
  align-items: center; 


}
.cancel-button{
    background-color: grey;
    font-size: 70%;
    color: white;
    border-radius: 20px;
    border: none;
    background-color:#2dc9a5;
}
.cancel-button:hover{
    background-color: #1b9f80;
}

</style>