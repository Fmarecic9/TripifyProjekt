<template>
  <div>
    <div class="header-container">
    <router-link to="/"><button type="button" class="back-button" aria-label="back">Back</button> </router-link>
    <h2>Where and when are you travelling?</h2>
  </div>
  
    
    <form @submit.prevent="getForecast">
      <div class = "weather-inputs">
        <input v-model="city" placeholder="Choose your destination" />
      <button type="submit" >Get Weather</button>
      </div>
    </form>

   <div class="weather-info">
    <div v-if="weather" class="weather-current">
      <table class="current-w">
        <thead>
        <th><h2>Current weather: {{ weather.name }}, {{weather.sys.country}}</h2></th>
        </thead>
        <tbody>
        <tr>  
        <td><p>Temperature: {{ weather.main.temp }}°C</p>
        <p>Condition: {{ weather.weather[0].description }}</p></td>
        </tr>
        </tbody>
      </table>
    </div>
  <div class="forecast-bottom">
     <button @click="isExpanded = !isExpanded">
          {{ isExpanded ? 'Hide Forecast' : 'Show Forecast' }} 
        </button>
    <div v-if="isExpanded" class="forecast-table">
    <div v-if="forecast" class="forecast-table">
    <table class="weather-5-days">
        <thead>
          <th><h2>5-day forecast: {{ forecast.city.name }}, {{forecast.city.country}}</h2></th>
        </thead>
        <tbody>
          <tr v-for="(entry,index) in forecast.list" :key="index">  
          <td><p>Date: {{ formatDateTime(entry.dt_txt).date }}°C</p>
          <p>Time: {{ formatDateTime(entry.dt_txt).time }}</p></td>
          <td>{{ entry.main.temp }}°C</td>
          <td>{{ entry.weather[0].description }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>

   </div>
  <button @click="confirmForecast()">Confirm</button>
</div>
</template>


<script>
import { getWeather, getFiveDayForecast } from '@/openWeather';

export default {
  data() {
    return {
      city: '',
      weather: null,
      forecast: null,
      isExpanded: false,
    };
  },
  methods: {

     async getForecast(){  
        try{
          console.log(this.forecast)
          this.forecast = await getFiveDayForecast(this.city)
          this.weather = await getWeather(this.city);
        }
        catch(e){
          console.error("Could not obtain forecast")
        }
 },
    confirmForecast() {
      this.$emit('forecastInfo', this.forecast);
    },
    formatDateTime(dt_txt) {
      const [date, time] = dt_txt.split(' ');
      return { date, time };
  },

    }
}


</script>


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
.weather-inputs {
  display: inline-block;
  flex-direction: column;
  align-items: center;
  gap: 15px; 
}


.weather-inputs input {
  width: 50%; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.weather-inputs button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #2dc9a5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.weather-inputs button:hover {
  background-color: #28b18e;
}

.weather-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px; 
}
.weather-5-days {
  width: 100%;
  border-collapse: collapse;
}

.weather-5-days th, .weather-5-days td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
}

.weather-5-days thead {
  background-color: #f4f4f4;
}

.weather-5-days tbody {
  display: table;
  width: 100%;
}

.weather-5-days td {
  vertical-align: top;
}

.weather-5-days .forecast-entry {
  border-bottom: 1px solid #eee;
  padding: 0.5rem;
}
.forecast-table {
  margin-top: 20px;
}

button {
  margin: 10px 0;
  padding: 5px 15px;
  background-color: #2dc9a5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #26b28c;
}

</style>
