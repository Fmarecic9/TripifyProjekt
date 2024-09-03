<template>
<div>
    <h1>Welcome!</h1>
    <h2>Login or signup here</h2>
    <div class="container">
      <div class="row">
        <div class="col-sm">
        </div>
        <div class="col-sm">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" v-model="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <button type="button" @click="login" class="btn btn-primary mt-5">Submit</button>
          </form>
        </div>
        <div class="col-sm">
        </div>
      </div>
    </div>

  </div>


</template>
<script>
import { auth } from '@/firebase.js';
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth'


export default{
    name: "login",
    data(){
      return {
        username:'',
        password:''
      }
    },

    methods: {
      login(){
      signInWithEmailAndPassword(auth, this.username, this.password)
      .then(()=>{
        console.log("Welcome back ", this.username)
        this.$router.replace({name: "home"});

      })
      .catch((error)=>{
        console.error("Username or password is inccorect ", error)
      });
      console.log("Logging in...")
      }
}
};

</script>