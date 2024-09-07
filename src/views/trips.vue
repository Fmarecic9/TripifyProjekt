<template>
     <h2>You can see your trips here</h2>
    <div class="tripCreate">
        <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="itemName">Item Name</label>
              <input type="text" class="form-control" placeholder="Item" />
            </div>

            <div class="form-group">
              <label for="quantity">Quantity</label>
              <input  type="number" class="form-control" placeholder="Quantity" />
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea  class="form-control" placeholder="Description"></textarea>
            </div>    
        
            <br>
            <button type="button"  class="btn btn-primary">Add</button> 
            <button type="button"  class="btn btn-success">Finish</button>
     </form>
   </div>   
</template>



<style>

</style>



<script>

export default ({
    data() {
    return{
        


    } 
    },
})



</script>
