<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid navbar-container">
      <a class="navbar-brand logo" >Tripify</a>

      <div v-if="currentUser != null" class="nav-container">
        <ul class="nav nav-tabs">
             <li class="nav-item">
            <router-link to="/getWeather" class="nav-link">WeatherTest</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/lists" class="nav-link">Lists</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login">
              <button type="button" class="btn btn-secondary btn-sm" @click="logout" v-if="currentUser != null">Logout</button>
            </router-link>
          </li>
        </ul>
      </div>

      <div v-else class="nav-container">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">Sign up</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
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
.container-fluid{
background-color: #36454F	 !important;

}

.navbar bg-body-tertiary{
background: #36454F	 !important;
height: 200%;
}

.navbar-brand{
color: white;
}
.navbar-brand:hover{
  color:#2dc9a5;
}


.nav nav-tabs{
background-color: #36454F	 !important;

}
.navbar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  font-size: 2rem; 
  margin-bottom: 20px; 
}

.nav-container {
  display: flex;
  justify-content: center;
}

.nav-tabs {
  display: flex;
  gap: 15px;
  list-style: none;
  padding: 0;
}

.nav-link {
  color: #ffffff; 
  text-decoration: none;
}
.nav-link:hover{
  color:#2dc9a5;

}
.nav-link:active, .nav-link:focus{
  color: #2dc9a5
}
button.btn.btn-secondary.btn-sm {
  margin-left: auto; 
  background-color: #2dc9a5;;
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
   // 
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
