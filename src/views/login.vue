<template>
  <div class="login">
    <h1>Login page</h1>
   <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary mt-5">Submit</button>
      </form>
    </div>


</template>




<style>
.login
{
width: 35%;
margin: auto;


}

</style>

<script>

</script>