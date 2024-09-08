<template>
  <div class="trip-planner">
    <div class="top-section">
        <h2>What city do you plan on visiting?</h2>
      <weather-fetch @weatherSelected="setWeatherDetails" />
    </div>
    <div class="bottom-section">
      <list-pick @selectedList="setSelectedList" />
    </div>
    <button type="button" class="create-trip-button" @click="createTrip">
      Create Trip
    </button>
  </div>
</template>

<script>
import weatherFetch from './weatherFetch.vue'; 
import listPick from './listPick.vue';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase"; 

export default {
  components: {
    weatherFetch,
    listPick,
  },
  data() {
    return {
      weatherDetails: null,
      selectedList: null,
    };
  },
  methods: {
    setWeatherDetails(weather) {
      this.weatherDetails = weather;
      
    },
    setSelectedList(list) {
      this.selectedList = list;
    },
    async createTrip() {
      if (!this.weatherDetails || !this.selectedList) {
        alert("Please select both weather details and a list.");
        return;
      }

      try {
        await addDoc(collection(db, "trips"), {
          destination: this.weatherDetails.name,
          country: this.weatherDetails.sys.country,
          temperature: this.weatherDetails.main.temp,
          weatherCondition: this.weatherDetails.weather[0].description,
          selectedList: this.selectedList,
          timestamp: new Date(),
        });
        alert("Trip created successfully!");
      } catch (e) {
        console.error("Error creating trip: ", e);
        alert("Error creating trip.");
      }
    },
  },
};
</script>


<style scoped>
.trip-planner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-section,
.bottom-section {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.create-trip-button {
  background-color: #2dc9a5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-trip-button:hover {
  background-color: #1b9f80;
}
</style>