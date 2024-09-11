<template>
        <form @submit.prevent="saveChanges">
        <div class="tripList-editing">
          <h2 class="table-header">
            <router-link to="tripEdit"><button type="button" class="cancel-trip-edit" aria-label="Close" @click="tripEditBack">Cancel</button> </router-link>
          <span> Edit item</span>
          <button type="button"  class="btn-close" aria-label="Close" @click="deleteTripEntry(itemName)"></button> 
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
            <button type="submit" class="btn btn-success">Save changes</button>
            
            
        </div>   
    </form>
</template>


<script>
import {db} from '@/firebase'
import { doc, updateDoc, getDoc} from 'firebase/firestore'

export default {
    props: ['itemName', 'quantity', 'description' ],
    data() {
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
    tripId(){
        return this.$route.query.tripId
    }
    },
    methods: {
    tripEditBack(){
        this.$router.push({name:'tripEdit'})
    },
    async deleteTripEntry(itemName) {
    const userConfirm = confirm("Are you sure you want to delete this item?");
    if (userConfirm) {
        try {
        const listRef = doc(db, 'trips', this.tripId);
        const listDoc = await getDoc(listRef);

        const listData = listDoc.data();
        const selectedList = listData.selectedList;
        const remainingItems = selectedList.items.filter(item => item.itemName !== itemName);

        await updateDoc(listRef, { 'selectedList.items': remainingItems });

        this.$router.push({ name: 'tripEdit' });
        } catch (e) {
        console.error("Could not delete item", e);
        this.$router.push({ name: 'tripEdit' });
        }
    } else {
        alert("Item deletion cancelled");
    }
    },
    // -------------------------------------------------------------------------------------------


    async saveChanges(){
        try{
        if (this.editedQuantity < 1)  { 
        alert("Item quantity cannot be 0!")
        return;
        }
 
        const listRef = doc(db, 'trips', this.tripId);
        const listDoc = await getDoc(listRef);
        const listData = listDoc.data();
        
        const listInfo = listData.selectedList;
        const updatedItems = listInfo.items.map(item =>
          item.itemName === this.itemName
            ? {
                ...item,
                itemName: this.editedItemName,
                quantity: this.editedQuantity,
                description: this.editedDescription || '',
              }
            : item
        );
        await updateDoc(listRef, {'selectedList.items' : updatedItems });
        this.$router.push({ name: 'tripEdit' });
        }
        catch (e){
            console.error('Error updating item...', e)
            this.$router.push({ name: 'tripEdit' });
        }

    }
    }
}
</script>

<style scoped>
.tripList-editing {
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
.cancel-trip-edit{
    background-color: grey;
    font-size: 70%;
    color: white;
    border-radius: 20px;
    border: none;
    background-color:#2dc9a5;
}
.cancel-trip-edit:hover{
    background-color: #1b9f80;
}


</style>
