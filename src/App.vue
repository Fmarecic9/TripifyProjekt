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
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
        console.log(user.email + "is logged in");
      } else {
        alert("No one is logged in");
      }
    });
  }
};


</script>
