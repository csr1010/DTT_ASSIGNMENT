<script>
import { RouterLink } from "vue-router";

export default {
  props: ["house"],
  components: { RouterLink },
};
</script>

<template>
  <div class="card">
    <!-- houseImg -->
    <RouterLink :to="`/${house.id}`">
      <div class="houseImg">
        <img :src="house.image" v-bind:alt="house" />
      </div>
    </RouterLink>

    <!-- houseinfo -->
    <div class="house_info">
      <div>
        <h2 class="street">{{ house.location.street }}</h2>
        <h4 class="price">€ {{ house.price }}</h4>
        <h5>{{ house.location.zip }} {{ house.location.city }}</h5>
      </div>

      <div class="roomInfo">
        <span>
          <img alt="" src="../assets/images/bed.png" />
          <h5>
            {{ house.rooms.bedrooms }}
          </h5>
        </span>
        <span>
          <img alt="" src="../assets/images/bath.png" />
          <h5>
            {{ house.rooms.bathrooms }}
          </h5>
        </span>
        <span>
          <img alt="" src="../assets/images/size.png" />
          <h5>{{ house.size }} m2</h5>
        </span>
      </div>
    </div>

    <!-- edit and delete -->
    <div class="options">
      <span class="edit">
        <RouterLink :to="`/edithouse/${house.id}`">
          <img src="../assets/images/edit.png" alt="edit " />
        </RouterLink>
      </span>

      <img src="../assets/images/delete.png" alt="delete " />
    </div>
  </div>
</template>

<style>
/* house list css */
.card {
  display: grid;
  grid-template-columns: 0.8fr 1fr 1fr;
  background-color: #ffffff;
  border-radius: 0.5rem;
  margin-bottom: 3rem;
}

.houseImg img {
  object-fit: contain;
  width: 17rem;
  height: 100%;
  border-radius: 0.5rem;
  margin: 1rem;
}

.roomInfo {
  position: relative;
  display: inline-block;
  bottom: 1.6rem;
}

.roomInfo h5 {
  display: inline-block;
  padding-right: 1rem;
}

.roomInfo img {
  display: inline-block;
  width: 1.5rem;
  padding-right: 0.8rem;
}

.options {
  position: relative;
  display: grid;
  justify-items: end;
  grid-template-columns: 12fr 1fr;
  margin-right: 1rem;
  top: 1rem;
}

.options img {
  width: 1rem;
  cursor: pointer;
}

/* media queries */
@media (max-width: 768px) {
  .houseImg img {
    width: 10rem;
    margin: 0rem;
  }

  .house_info {
    position: relative;
    left: 1.3rem;
  }

  .roomInfo img {
    width: 1rem;
  }

  .roomInfo {
    bottom: 1rem;
  }

  .roomInfo h5 {
    padding-right: 0.4rem;
  }

  .roomInfo img {
    padding-right: 0.2rem;
  }

  h3 {
    font-size: 12px;
  }

  h5 {
    font-size: 10px;
  }

  .options {
    margin-right: 0;
    top: 0;
  }
}

@media (max-width: 1100px) {
  .card {
    display: grid;
    grid-template-columns: 4fr 5fr 1fr;
    padding: 20px;
  }
}
</style>
