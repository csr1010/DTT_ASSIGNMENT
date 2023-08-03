<script setup>
import { RouterLink } from "vue-router";
import { useRoute, useRouter } from "vue-router";
import { useHouseStore } from "../../stores/houseStore";
import { computed, onMounted } from "vue";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const store = useHouseStore();

const id = route.params.houseId;

/* delete house confirmation code */
const showConfirmation = ref(false);
const houseIdToDelete = ref(null);

const house = computed(() => {
  return store.getHouses.find((house) => house.id === parseInt(id));
});

/* delete house */
function onDelete(id) {
  console.log("id", id);
  houseIdToDelete.value = id;
  console.log("houseIdTODel", houseIdToDelete.value);
  showConfirmation.value = true;
}

const deleteHouse = () => {
  if (houseIdToDelete.value !== null) {
    store.deleteHouse(houseIdToDelete.value);
    houseIdToDelete.value = null;
    showConfirmation.value = false;
  }
  router.push({ path: "/" });
};

const cancelDelete = () => {
  houseIdToDelete.value = null;
  showConfirmation.value = false;
};

onMounted(async () => {
  await store.fetchHouses();
});
</script>

<template>
  <main class="houses">
    <div class="houseContainer">
      <div v-if="house" class="detailCard">
        <!-- house Img -->
        <div class="houseDetailImg">
          <img :src="house.image" v-bind:alt="house" />
        </div>

        <!-- houseinfo -->
        <div class="houseDetailInfo">
          <div class="house">
            <h1 class="street">{{ house.location.street }}</h1>

            <div class="options">
              <span>
                <RouterLink :to="`/edithouse/${house.id}`">
                  <img src="../../assets/images/edit.png" alt="edit " />
                </RouterLink>
              </span>

              <span>
                <img
                  src="../../assets/images/delete.png"
                  alt="delete"
                  @click="onDelete(house.id)"
                />

                <div v-if="!house.id">
                  <p>House not found</p>
                </div>

                <!-- Confirmation message -->
                <div v-if="showConfirmation" class="confirmation-message">
                  <h2>Delete Listing</h2>
                  <p>
                    Are you sure you want to delete this house?<br />
                    This action cannot be undone
                  </p>
                  <button @click="deleteHouse(house.id)">Yes, Delete</button>
                  <button @click="cancelDelete">Cancel</button>
                </div>
              </span>
            </div>
          </div>

          <div class="houseInfo">
            <span>
              <h4>
                <img src="../../assets/images/location.png" />{{
                  house.location.city
                }}
                {{ house.location.zip }}
              </h4>
            </span>
          </div>

          <div class="houseInfo">
            <span>
              <h5>
                <img alt="" src="../../assets/images/price.png" />
                {{ house.price }}
              </h5>
            </span>

            <span>
              <h5>
                <img alt="" src="../../assets/images/size.png" />
                {{ house.size }} m2
              </h5>
            </span>

            <span>
              <h5>
                <img alt="" src="../../assets/images/construction.png" />
                {{ house.constructionYear }}
              </h5>
            </span>
          </div>

          <div class="houseInfo roomInfo">
            <span>
              <h5>
                <img alt="" src="../../assets/images/bed.png" />
                {{ house.rooms.bedrooms }}
              </h5>
            </span>

            <span>
              <h5>
                <img alt="" src="../../assets/images/bath.png" />
                {{ house.rooms.bathrooms }}
              </h5>
            </span>

            <span>
              <h5>
                <img alt="" src="../../assets/images/garage.png" />
                {{ house.hasGarage }}
              </h5>
            </span>
          </div>

          <div class="text detailText">
            <p>
              {{ house.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.detailCard {
  position: relative;
  border: 0.1rem #ffffff solid;
  background-color: #ffffff;
  border-radius: 0.5rem;
  margin: 2rem;
  width: 60rem;
  height: auto;
}

.houseDetailImg img {
  width: 100%;
  object-fit: cover;
  height: 25vw;
}

.houseDetailInfo {
  margin-left: 2rem;
}

.houseInfo {
  position: relative;
  display: flex;
  gap: 2rem;
}

.houseInfo img {
  width: 1.2rem;
}

.options {
  cursor: pointer;
}

.confirmation-message {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1;
  right: 3rem;
  width: 60%;
  height: auto;
  background-color: white;
  align-items: center;
  border-radius: 0.5rem;
}

.confirmation-message button {
  padding: 1rem 7rem;
  margin-top: 1rem;
}

.detailText p {
  position: relative;
  bottom: 3rem;
}

@media (max-width: 641px) {
  .detailCard {
    width: 100%;
    height: auto;
  }

  .houseDetailImg img {
    width: 100%;

    object-fit: cover;
    height: 100vw;
  }

  .confirmation-message {
    right: 3rem;
    top: 13rem;
    width: 86%;
    height: 20rem;
    background-color: white;
    align-items: center;
    border-radius: 0.5rem;
  }

  .detailText p {
    position: relative;
    bottom: 0rem;
  }
}

/* tablet, landscape iPad, lo-res laptops ands desktops */
@media (max-width: 1200px) {
  .form {
    max-width: 600px;
  }
}
</style>
