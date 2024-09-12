<template>
  <div class="home">
    <h1>Welcome {{ dajmiUsera() }}!</h1>
     <div class="trips">
      <div v-if="trips.length === 0">
        <p>No trips found.</p>
      </div>
      <div v-else class="trip-location">
        <h3>Here are your current trips</h3>  
        <button type="button" @click="tripEdit" class="btn btn-primary" >Edit your trips</button>
        <br>
        <br>
        <div v-for="trip in trips" :key="trip.id" class="trip-table">
          <table class="scrolling">
            <h2>Trip to: {{ trip.destination }}, {{ trip.country }}</h2>
            <thead>
              <tr>
                <th>Start date/end date</th>
                <td>
                {{trip.tripStart}}-{{trip.tripEnd}} 
                </td>
              </tr>
            </thead>
            <div class="table-bodies">
            <tbody class="trip-stuff">
              <tr>
                <th>Item list: "{{trip.selectedList.listName}}"</th>
                <td>
                    <ul class="list-items">
                    <li v-for="item in trip.selectedList.items" :key="item.itemName">
                      {{ item.itemName }} - {{ item.quantity }} - {{item.description}} 
                      <input type="checkbox" :checked="item.itemPacked" @change="toggleItemPacked(item, trip.selectedList.id, trip.id)">
                       <span v-if="item.itemPacked" class="packed-indicator">Packed</span>
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
import { db } from '@/firebase'
import { collection, query, where, getDocs, doc, updateDoc, getDoc} from 'firebase/firestore'
import store from '@/store'
import App from '@/App.vue'

export default {
  components: { App },
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
          timestamp: timestamp,
          tripStart: data.tripStart,
          tripEnd: data.tripEnd,
          });
        })
        
     }catch(e){
      console.error("error fetching trips ", e)
     }

  },
    async toggleItemPacked(item, listId, tripId) {
    try {
      const itemRef = doc(db, 'trips', tripId);
    
      const listDoc = await getDoc(itemRef);
      const listData = listDoc.data();
      const items = listData.selectedList

      const updatedItems = items.items.map(i => 
        i.itemName === item.itemName ? { ...i, itemPacked: !i.itemPacked } : i
      );

     
      await updateDoc(itemRef, { 'selectedList.items': updatedItems });

  } catch (e) {
    console.error('Error updating item packed status:', e);
  }
    },
    tripEdit(){
      this.$router.push({ name: 'tripEdit'})
    }
  }
}


</script >


<style scoped>
th,td{
  padding: 10px; 
  width: 50%;
}
th {
  padding: 0 20px; 
  text-align: left; 
}

th:first-child {
  text-align: left;
}

th:last-child {
  text-align: right;
}
th:last-child, td:last-child {
  text-align: right; 
}

.trips {
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.trip-table {
  margin-bottom: 30px;
  width: 100%;
}
.scrolling{
  display: block;
  max-height: 300px;  
  overflow-y: auto; 
  border: 3px solid #000000;
  background-color: lightgray;
  border-radius:15px;
  padding: 10px;
  width: 650px; 
  table-layout: fixed;

 
} 
.trip-stuff {
  display: flex; 
  flex-wrap: wrap; 
  gap: 20px; 
  background-color:white;
  max-height: 100px; 
  overflow-y: auto; 
  border: 2px, black;
  
}
.list-items{
  list-style: none;
  text-align: left;
}
.packed-indicator {
  font-size: 0.9em; 
  color: green; 
  margin-left: 5px;
  text-align:right;
}


</style>