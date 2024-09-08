<template>
  <div>
    <div class="header-container">
    <router-link to="/"><button type="button" class="back-button" aria-label="Close">Back</button> </router-link>

  </div>
      

    <form @submit.prevent="fetchWeather">
      <input v-model="city" placeholder="Choose your destination" />
      <button type="submit" >Get Weather</button>
      <br>
    </form>
   
    <div v-if="weather">
      <h2>Weather in {{ weather.name }}, {{weather.sys.country}}</h2>
      <p>Temperature: {{ weather.main.temp }}°C</p>
      <p>Condition: {{ weather.weather[0].description }}</p>
   
    </div>
  </div>
  <button @click="confirmWeather()">Confirm</button>
   
</template>
<style>
.header-container {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  padding: 10px 20px; 
}
.header-container h1 {
  margin: 0 auto; 
  text-align: center;
  flex-grow: 1; 
}


</style>

<script>
import { getWeather } from '@/openWeather';

export default {
  data() {
    return {
      city: '',
      weather: null,
    };
  },
  methods: {
    async fetchWeather() {
      try {
        this.weather = await getWeather(this.city);
      } catch (e) {
            console.error("Could not fetch weather", e)
      } 
    },

    confirmWeather(t) {
      this.$emit('weatherSelected', this.weather);
    },

    }
}


</script>
