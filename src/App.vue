<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/create">Create</router-link> |
    <router-link to="/edit">Edit</router-link> |
    <router-link to="/view">View</router-link> 
    <br>
    <router-link to="/login">Login</router-link> |
    <router-link to="/signup">Sign up</router-link>
  </nav> 
  <router-view/>

  <button type="button" class="logout" @click="logout">Logout</button>
</template>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #2dc9a5;
    }
  }
}
</style>
<script>

import { auth } from '@/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';


export default {
  data() {
    return {
      currentUser: null
    };
  },
  created() { 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user; 
        console.log(user.email + " is logged in");
      } else {
        console.log("No one is logged in");
      }
    });
  },
  checkUser(){
      onAuthStateChanged(auth, (user) => {
      if (currentUser != null) {
        this.$router.push({ name: 'home' });
      } else {
        this.$router.push({ name: 'login' });
      }
    });   // trenutno samo ideja 
  },
  methods:{
  logout(){
      signOut(auth)
        .then(() => {
          console.log("User has been logged out");
          this.$router.push({name:"login"})
        })
        .catch((error) => {
          console.error("User is not logged in ", error);
        });
    }

    }
  };


</script>
