<script>
import { RouterLink } from "vue-router";
import { onMounted, computed, ref, defineComponent } from "vue";
import { useHouseStore } from "../../stores/houseStore";
import House from "../../components/House.vue";

export default defineComponent({
  setup() {
    const store = useHouseStore();
    const searchQuery = ref("");
    let sortBy = "price";

    //Made By Actions
    const houses = computed(() => {
      return store.houses;
    });

    onMounted(() => {
      store.fetchHouses();
    });

    //search for city, street or zipcode
    const searchList = computed(() => {
      return houses.value.filter((house) => {
        return (
          house.location.zip
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1 ||
          house.location.city
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1 ||
          house.location.street
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
    });

    const sortByPrice = () => {
      sortBy = "price";
    };

    const sortBySize = () => {
      sortBy = "size";
    };

    const sortedHouses = computed(() => {
      //sorting part
      const compareByValue = (a, b) => b.price - a.price;
      const compareByLowValue = (a, b) => a.price - b.price;
      /* console.log("in block", sortBy); */

      return sortBy === "price" || sortBy === "size"
        ? [...houses.value].sort(compareByValue)
        : [...houses.value].sort(compareByLowValue);
    });

    return {
      houses,
      searchList,
      searchQuery,
      RouterLink,

      sortedHouses,
      sortByPrice,
      sortBySize,
      sortBy,
    };
  },

  //sending data to the child component
  components: {
    House,
  },
});
</script>

<template>
  <main class="houses">
    <div class="houseContainer">
      <span class="heading">
        <h1>Houses</h1>
      </span>

      <div class="btn">
        <RouterLink to="/newHouse">
          <button>+ CREATE NEW</button>
        </RouterLink>
      </div>

      <div class="search">
        <input type="text" v-model="searchQuery" placeholder="Search city..." />
        <img
          src="../../assets/images/clear.png"
          @click="searchQuery = ''"
          alt="no result found"
        />
      </div>

      <div class="btn sort">
        <button class="size" @click="sortBySize">Size</button>
        <button @click="sortByPrice">Price</button>
      </div>

      <!-- filtered houses -->
      <div v-if="searchQuery.length > 1">
        <div v-for="house in searchList" :key="house.id">
          <House :house="house" />
        </div>
      </div>

      <!-- sorted houses -->
      <div v-else="sortedHouses">
        <div v-for="house in sortedHouses" :key="house.id">
          <House :house="house" />
        </div>
      </div>

      <!-- not found houses -->
      <div class="item error" v-if="searchQuery && !searchList.length">
        <img src="../../assets/images/empty_houses.png" alt="no result found" />
        <p class="text">No result found. Please try another keyword</p>
      </div>
    </div>
  </main>
</template>

<style>
.houses {
  position: relative;
  top: 5rem;
}

.houseContainer {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
}

/* search  */
.search {
  position: relative;
  display: flex;
}

.search img {
  position: relative;
  width: 18px;
  right: 2rem;
  bottom: 1rem;
  object-fit: contain;
}

.search input {
  display: block;
  width: 350px;
  margin-bottom: 30px;
  padding: 10px 40px;
  background: #e8e8e8 url("../../assets/images/search.png") no-repeat 20px
    center;
  background-size: 15px 15px;
  font-size: 16px;
  color: #4a4b4c;
  border: none;
  border-radius: 5px;
}

.item {
  display: flex;
  flex-direction: column;
  height: 30rem;
  justify-content: center;
  align-items: center;
}

.error img {
  width: 50%;
  margin: 0 auto;
}

.btn button {
  position: relative;
  float: right;
}

button {
  bottom: 2rem;
  background-color: #eb5440;
  border: 1px solid #eb5440;
  border-radius: 6px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: "Montserrat";
  font-size: 15px;
  font-weight: 600;
  line-height: 10px;
  padding: 12px 10px;
  text-align: center;
}

button:hover {
  background-color: transparent;
  color: #eb5440;
}

.sort button {
  position: relative;
  width: 7rem;
}

.sort .size {
  background-color: #e8e8e8;
  border: 1px solid #e8e8e8;
}

@media (max-width: 768px) {
  .houseContainer {
    max-width: auto;
    align-items: center;
  }

  .search input {
    width: 250px;
  }

  .sort button {
    position: relative;
    width: 10rem;
    margin-top: 1.5rem;
  }

  .heading h2 {
    margin-bottom: 3rem;
  }

  .btn img {
    display: flex;
    width: 10%;
    float: right;
  }
}

/* tablet, landscape iPad, lo-res laptops ands desktops */
@media (max-width: 1100px) {
  .houseContainer {
    max-width: 900px;
  }
}
</style>
