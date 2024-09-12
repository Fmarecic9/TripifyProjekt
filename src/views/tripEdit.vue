<template>
  <div class="tripEdit">
    <div class="title-container">
      <button type="button" class="batun" aria-label="Close" @click="tripsBack()">Back</button>
      <h2>Edit your current trips</h2>  
    </div>    
    <div class="trips-editing">    
  <div v-if="trips.length === 0">
        <p>No trips found.</p>
      </div>
      <div v-else class="trip-location">
    
        <div v-for="trip in trips" :key="trip.id" class="trip-table">
          <table class="scrolling">
            <div class="header-container">
            <h2>Trip to: {{ trip.destination }}, {{ trip.country }}</h2>
            <button type="button" class="btn-close" aria-label="Close" @click="deleteTrip(trip.id)"></button> 
            </div>
            <thead>
              <tr>
                <th>Start date/end date</th>
                <td>{{trip.tripStart}}-{{trip.tripEnd}} </td>
              </tr>
            </thead>
            <div class="table-bodies">
            <tbody class="trip-stuff">
              <tr>
                <th>Item list: "{{trip.selectedList.listName}}"</th>
                <td>
                       <ul class="list-items">
                    <li v-for="item in trip.selectedList.items" :key="item.itemName">
                       {{ item.itemName }} - {{ item.quantity }} - {{item.description}}   <button class="edit-trip-entry" @click="editEntry(item, trip.selectedList.id, trip.id)">Edit</button>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
            </div>
          </table>
        </div>
      </div>
    </div>
  </div>
</template> 
  


<script>
import {db} from '@/firebase'
import {getDocs, query, where, collection, doc, deleteDoc } from 'firebase/firestore'
import store from '@/store'

export default {
    data() {
    return {
        trips:[ ],
        }   
    },
    mounted() {
        this.displayTrips();
    },
    methods: {
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
            timestamp: timestamp,
            tripStart: data.tripStart,
            tripEnd: data.tripEnd,
            });
            })
        }catch(e){
        console.error("error fetching trips ", e)
        }

    },
    editEntry(entry, tripListId, tripId){
      if(tripListId){
      this.$router.push({name:"tripEditEntry" ,
      params: {itemName: entry.itemName, quantity: entry.quantity, description: entry.description},  
      query:{listId: tripListId, tripId: tripId}
      })
      
      }
      else {

      }
    },
    async deleteTrip(tripId){
    const userConfirm = confirm("Are sure you want to delete this trip?")

        if(userConfirm){
            console.log(tripId, " -id")
            try {
                await deleteDoc(doc(db, "trips", tripId));
                this.trips = this.trips.filter(trip => trip.id !== tripId);
            } catch (e) {
            console.error("Error deleting list: ",tripId, e);
            }
        }
        else{ 
            alert("Trip deletion cancelled");
        }
    },
    tripsBack(){
        this.$router.push({name: 'home'})
    }
    },
}
</script>
<style scoped>


.tripEdit {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  gap: 20px;
}

.trips-editing {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
}

.scrolling {
  display: block;
  max-height: 300px;
  overflow-y: auto;
  border: 3px solid #000000;
  background-color: lightgray;
  border-radius: 15px;
  padding: 10px;
  width: 650px; 
  margin: 0 auto; /* Center the table horizontally */
  table-layout: fixed;
}

th, td {
  padding: 10px;
  width: 50%;
  text-align: left;
}

th:first-child {
  text-align: left;
}

th:last-child, td:last-child {
  text-align: right;
}

.trip-table {
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center; /* Center the table container */
}

.trip-stuff {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: white;
  max-height: 100px;
  overflow-y: auto;
}

.list-items {
  list-style: none;
  text-align: right;
}

.edit-trip-entry {
  font-size: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background-color: black;
}

.batun {
  background-color: grey;
  font-size: 150%;
  color: white;
  border-radius: 20px;
  border: none;
  background-color: #2dc9a5;
}

.batun:hover {
  background-color: #1b9f80;
}


</style>
