<template>
  <div class="home">
    <h1>Welcome {{ dajmiUsera() }}!</h1>

    <div class="trips">
      <div v-if="trips.length === 0">
        <p>No trips found.</p>
      </div>

      <div v-else class="trip-location">
        <h3>Here are your current trips</h3>
        <div v-for="trip in trips" :key="trip.id" class="trip-table">
          <h2>Trip to: {{ trip.destination }}, {{ trip.country }}</h2>
          <table class="scrolling">
            <thead>
              <tr>
                <th>Weather Info</th>
                <th>Item list</th>
              </tr>
            </thead>
            <tbody class="trips-container">
              <tr>
                <td>
                  <p>{{ trip.temperature}}°C</p>
                  <p>{{ trip.weatherCondition }}</p>
                </td>
                <td>
                  <ul class="list-items">
                    <li v-for="item in trip.selectedList.items" :key="item.itemName">
                      {{ item.itemName }} - {{ item.quantity }} - {{item.description}}
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from '@/firebase'
import { collection, query, where, getDocs} from 'firebase/firestore'
import store from '@/store'

export default {
  data(){
    return {
      trips: [],
    }

  },
  mounted() {
    this.displayTrips();
  },
  methods: {
  dajmiUsera(){
    return store.currentUser
  },
  async displayTrips(){
     try{
     const userEmail = store.currentUser
      
      const q = query(collection(db, "trips"),where("selectedList.user", "==", userEmail));
      const querySnapshot = await getDocs(q)
      
      this.trips = [  ];

      querySnapshot.forEach(doc => {
        const data = doc.data()    
        
        this.trips.push({
          id: doc.id,
          destination: data.destination,
          country: data.country,
          temperature: data.temperature,
          weatherCondition: data.weatherCondition,
          selectedList: data.selectedList
          });
        })
     }catch(e){
      console.error("error fetching trips ", e)
     }

  }
}
}
</script>

<style>

.list-items {
  list-style: none;
  padding-left: 0; 
  text-align: center; 
}

.trip-location {
  width: 80%; 
  margin: 0 auto; 
  text-align: center; 
}

.trips-container {
  display: flex;
  flex-direction: column; 
  gap: 20px;
  align-items: center; 
  justify-content: center; 
}

.trip-table {
  border: 3px solid #000000;
  background-color: lightgray;
  border-radius: 15px;
  padding: 10px;
  width: 200%; 
  max-width: 600px; 
  max-height: 400px;
  overflow: hidden;
  margin: 20px auto; 
}

.trip-table h2 {
  text-align: center;
}

.table-container {
  max-height: 300px;
  overflow-y: auto;
}

.trips-container {
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border-collapse: collapse;
  border: 2px solid #000000;
  width: 100%;
  margin: 0 auto;
}

</style>