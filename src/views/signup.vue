<template>
  <div class="signup">
  <h1>Create your account</h1>
  <div class="container">
      <div class="row mt-5">
        <div class="col-sm">
        </div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="emailField">Email address</label>
              <input type="email" v-model="username" class="form-control" id="emailField" aria-describedby="emailHelp" placeholder="Enter email">
              
            </div>
            <div class="form-group">
              <label for="passwordField">Password</label>
              <input type="password" v-model="password" class="form-control" id="passwordField" placeholder="Password">
            </div>
            <div class="form-group">
              <label for="confirmPasswordField">Confirm Password</label>
              <input type="password" v-model="passwordRepeat" class="form-control" id="confirmPasswordField" placeholder="Confirm password">
            </div>
            <button type="button" @click='signup' class="btn btn-primary mt-5">Submit</button>
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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


export default {
  name:"signup",
  data() {
      return{
        username:"",
        password:"",
        passwordRepeat:""

      }

  },
  methods: {
      signup(){
        if (this.password !== this.passwordRepeat){
            alert('The entered passwords do not match, try again!')
            return;
        }
        createUserWithEmailAndPassword(auth, this.username, this.password)
        .then(() => {
          console.log("Success, you are now signed in");
        })
        .catch((error) => { 
          console.error("Something went wrong", error);
        });
        console.log("Processing...") 
          }
      },  
// 
  }; 

</script>



