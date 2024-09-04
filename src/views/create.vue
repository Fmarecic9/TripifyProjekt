<template>
  <h2>Create your packing list</h2>
  <div class="create" >
  <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="nameList">Name</label>
            <input type="text" v-model="listName" class="form-control" id="listName" aria-describedby="emailHelp" placeholder="Name of your list">
            </div>

        <div class="itemSelection">
          <h2>Add items</h2>
          
            <div class="form-group">
              <label for="itemName">Item Name</label>
              <input v-model="name" type="text" class="form-control" placeholder="Item" />
            </div>

            <div class="form-group">
              <label for="quantity">Quantity</label>
              <input v-model="quantity" type="number" class="form-control" placeholder="Quantity" />
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea v-model="description" class="form-control" placeholder="Description"></textarea>
            </div>    
            
            
        </div>   
            <br>
            <button type="button" @click='addItem' class="btn btn-primary">Add</button> 
            <button type="button"  class="btn btn-success">Finish</button>
          </form>
  </div>
</template>
<style>
.create {
  margin: auto;
  width:75%;

}

</style>

<script>
export default {
  data() {
    return {
      listName: '',
      name: '', 
      quantity: null, 
      description: '',
      items: [],
      
    }
  },
  methods: {
    addItem(){
      if (this.quantity < 1) {
        console.log("You can not add less than 1 item")
        return
      }
      console.log("You have added: ", this.name, this.quantity, this.description)
      this.items.push({
        name: this.name,
        quantity: this.quantity,
        description: this.description
      });
      this.name = '';
      this.quantity = null;
      this.description = '';
    }

  }
};

</script>

