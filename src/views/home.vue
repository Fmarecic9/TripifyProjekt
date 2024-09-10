<template>
  <div class="home">
    <h1>Welcome {{ dajmiUsera() }}!</h1>

    <div class="trips">
      <div v-if="trips.length === 0">
        <p>No trips found.</p>
      </div>

      <div v-else class="trip-location">
        <h3>Here are your current trips</h3>  <button type="button" @click="tripEdit" class="btn btn-primary" >Edit your trips</button>
        <div v-for="trip in trips" :key="trip.id" class="trip-table">
          <table class="scrolling">
            <h2>Trip to: {{ trip.destination }}, {{ trip.country }}</h2>
            <thead>
              <tr>
                <th>Start date/end date</th>
                <th>Item list: "{{trip.selectedList.listName}}"</th>
              </tr>
            </thead>
            <div class="table-bodies">
            <tbody class="trip-stuff">
              <tr>
                <td>
                  <p>startDate-endDate</p>
                </td>
              </tr>
    
               
                  
                  <ul class="list-items">
                    <li v-for="item in trip.selectedList.items" :key="item.itemName">
                       {{ item.itemName }} - {{ item.quantity }} - {{item.description}} 
                    </li>
                  </ul>
             
             
            </tbody>
            </div>
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
        const timestamp = data.timestamp?.toDate();
        this.trips.push({
          id: doc.id,
          destination: data.destination,
          country: data.country,
          selectedList: data.selectedList,
          timestamp: timestamp
          });
        })
     }catch(e){
      console.error("error fetching trips ", e)
     }

  },
  formatDate(date) {
      if (!date) return '';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    tripEdit(){
      this.$router.push({ name: 'tripEdit'})
    }
}
}
</script >
.trips{
  items-align

}

<style scoped>
.scrolling{
  display: block;
  max-height: 200px;  
  overflow-y: auto; 
  border: 3px solid #000000;
  background-color: lightgray;
  border-radius:15px;
  padding: 10px;
  width: 50%; 
 
} 
.trip-stuff {
  display: flex; 
  flex-wrap: wrap; 
  gap: 20px; 
  background-color:white;
  max-height: 100px; 
  overflow-y: auto; 
}
.list-items{
  list-style: none;
  text-align: right;
  right: 0;
}

</style>