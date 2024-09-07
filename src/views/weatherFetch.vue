<template>
  <div>
    <form @submit.prevent="fetchWeather">
      <input v-model="city" placeholder="Where are you visiting" />
      <button type="submit" >Get Weather</button>
    </form>
    <div v-if="weather">
      <h2>Weather in {{ weather.name }}, {{weather.sys.country}}</h2>
      <p>Temperature: {{ weather.main.temp }}°C</p>
      <p>Condition: {{ weather.weather[0].description }}</p>
      <h3>Everything: {{weather}}</h3>
    </div>
  </div>
</template>

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
  },
};
</script>
