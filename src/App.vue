<template>
  <nav class = "navigacija">
    <ul class = "links">
    <li v-if="this.currentUser != null">
    <router-link to="/">Home</router-link> | |
    <router-link to="/create">Create</router-link> | | 
    <router-link to="/edit">Edit</router-link> | | 
    <router-link to="/view">View</router-link>  
    </li>
 
    <li v-if="this.currentUser == null">
    <router-link to="/login">Login</router-link> | |
    <router-link to="/signup">Sign up</router-link>     
    </li>
    <router-link to="/login"><button type="button" class="btn btn-secondary btn-sm" @click="logout" v-if="this.currentUser != null">Logout</button></router-link> 
  </ul>
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
.links{
list-style-type:none;

}
</style>
<script>

import { auth } from '@/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import store from '@/store.js'

export default {
  data() {
    return {
      currentUser: null,
      store,
    };
  },
  created() { 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user.email; 
        store.currentUser = user.email;
        console.log(user.email + " is logged in"); 
        this.$router.push({ name: 'home' });
      } else {
        this.currentUser = null;
        console.log("No one is logged in");
        this.$router.push({ name: 'login' });
      }
    });
  },

  methods:{
  logout(){
      signOut(auth)
        .then(() => {
          console.log("User has been logged out");
          this.$router.push({name:'login'})
        })
        .catch((error) => {
          console.error("User is not logged in ", error);
        });
    }

    }
  };


</script>
