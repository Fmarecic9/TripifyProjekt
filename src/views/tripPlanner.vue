<template>
  <div class="trip-planner">
    <div class="top-section">
      <weather-fetch @forecastInfo="setForecastDetails"/>
    </div>
    <div class="middle-section">
   <br>
    <div class="date-inputs">
        <h2>When are you going to travel</h2>
        <form @submit.prevent="onSubmit">
          <input
            v-model="startDate"
            placeholder="Start date (dd-mm-yyyy)"
            @blur="validateDate('startDate')"
          />
          <input
            v-model="endDate"
            placeholder="End date (dd-mm-yyyy)"
            @blur="validateDate('endDate')"
          />
          <button type="submit" >Ok</button>
        </form>
    </div>
    <br>
    </div>
    <div class="bottom-section">
        <h2>Availible lists</h2>
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
      selectedList: null,
      forecastInfo : null,
      startDate: '',
      endDate:'',
    };
  },
  methods: {
      onSubmit() {
      const validStartDate = this.convertToDateObject(this.startDate);
      const validEndDate = this.convertToDateObject(this.endDate);

      if (validStartDate && validEndDate) {
        console.log("Dates are valid:", validStartDate, validEndDate);
      } else {
        alert('Please enter dates in the correct format (dd-mm-yyyy).');
      }
    },
    validateDate(dateField) {
      const dateValue = this[dateField];
      const isValid = this.isValidDate(dateValue);
      if (!isValid) {
        alert('Please enter the date in the correct format (dd-mm-yyyy).');
      }
    },
    isValidDate(dateStr) {
      const regex = /^\d{2}-\d{2}-\d{4}$/;
      return regex.test(dateStr);
    },
    convertToDateObject(dateStr) {
      if (!this.isValidDate(dateStr)) return null;

      const [day, month, year] = dateStr.split('-');
     
      return new Date(year, month - 1, day);
    },
    setSelectedList(list) {
      this.selectedList = list;
    },
    setForecastDetails(forecast) {
      this.forecastInfo = forecast;
    },

    async createTrip() {
      if (!this.forecastInfo || !this.selectedList ) {
        alert("The forecast or list are missisng.");
        return;
      }
      console.log("Datumi", this.startDate, this.endDate)
      try {
        await addDoc(collection(db, "trips"), {
          destination: this.forecastInfo.city.name,
          country: this.forecastInfo.city.country,
          selectedList: this.selectedList,
          timestamp: new Date(),
          tripStart: this.startDate,
          tripEnd: this.endDate,
        });
        alert("Trip created successfully!");
        this.$router.push({name: "home"})
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
.date-inputs{
 display: inline-block;
  flex-direction: column;
  align-items: center;
  gap: 15px; 
}
.date-inputs input{
   width: 50%; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>