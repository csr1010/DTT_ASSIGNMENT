<script>
import { ref, defineComponent, onMounted, computed } from "vue";
import { useHouseStore } from "../../stores/houseStore";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useHouseStore();
    const fileInput = ref(null);

    const route = useRoute();
    const router = useRouter();

    const houseId = route.params.houseId;

    const updatedHouse = computed(() => {
      return store.houses.find((house) => house.id === parseInt(houseId));
    });

    console.log("house", updatedHouse);
    console.log("houses", store.houses);

    const houseInfo = {
      price: updatedHouse.value.price,
      bedrooms: updatedHouse.value.rooms.bedrooms,
      bathrooms: updatedHouse.value.rooms.bathrooms,
      size: updatedHouse.value.rooms.size,
      streetName: updatedHouse.value.location.street,
      houseNumber: updatedHouse.value.location.houseNumber,
      numberAddition: updatedHouse.value.location.houseNumberAddition,
      zip: updatedHouse.value.location.zip,
      city: updatedHouse.value.location.city,
      constructionYear: updatedHouse.value.constructionYear,
      hasGarage: updatedHouse.value.hasGarage,
      description: updatedHouse.value.description,
      image: updatedHouse.value.image,
    };

    console.log("house info", houseInfo);

    /* image */
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      console.log("file", file);
      if (file) {
        const data = new FormData();
        data.append("image", file);
        houseInfo.image = data;
        console.log("data:", data);
      }
    };

    const submitForm = () => {
      if (houseId) {
        store.editHouse(houseId, houseInfo);
      }
      router.push("/");
    };

    onMounted(async () => {
      store.fetchHouses();
    });

    return {
      store,
      houseInfo,
      submitForm,
      handleFileChange,
      fileInput,
    };
  },
});
</script>

<template>
  <main class="newHouse">
    <div class="house_container">
      <!-- form -->
      <form class="form" @submit="submitForm">
        <div>
          <h1>Edit Listing</h1>
        </div>

        <!-- street -->
        <div class="group">
          <label class="label">Street name*</label>
          <input
            v-model="houseInfo.streetName"
            name="street name"
            class="input"
            type="text"
            placeholder="street name"
            required
          />
        </div>

        <!-- house number -->
        <div class="group-row">
          <div class="control">
            <label class="label">House number*</label>
            <input
              v-model="houseInfo.houseNumber"
              name="House number"
              class="input"
              type="number"
              placeholder="House number"
              required
            />
          </div>

          <div class="control">
            <label class="label">Addition</label>
            <input
              v-model="houseInfo.numberAddition"
              name="addition"
              class="input"
              type="text"
              placeholder="eg. A"
            />
          </div>
        </div>

        <!-- postcode -->
        <div class="group">
          <label class="label">Postal code*</label>
          <input
            v-model="houseInfo.zip"
            name="zip"
            class="input"
            type="text"
            placeholder="eg. 1000 AA"
            required
          />
        </div>

        <!-- city -->
        <div class="group">
          <label class="label">City*</label>
          <input
            v-model="houseInfo.city"
            name="City"
            class="input"
            type="text"
            placeholder="City"
            required
          />
        </div>

        <!-- upload picture -->
        <div class="group">
          <label class="label">Upload picture (PNG or JPG)*</label>

          <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            accept="image/*"
            required
          />

          <img
            v-if="houseInfo.image"
            :src="houseInfo.image"
            alt="Uploaded Image"
          />
        </div>

        <!-- price -->
        <div class="group">
          <label class="label">Price*</label>
          <input
            v-model="houseInfo.price"
            name="Price"
            class="input"
            type="number"
            placeholder="150.00"
            required
          />
        </div>

        <!-- size and garage -->
        <div class="group-row">
          <div class="control">
            <label class="label">Size*</label>
            <input
              v-model="houseInfo.size"
              name="Size"
              class="input"
              type="number"
              placeholder="60m2"
              required
            />
          </div>

          <div class="control">
            <label class="label">Garage*</label>
            <select v-model="houseInfo.hasGarage" required>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <!-- bedrooms -->
        <div class="group-row">
          <div class="control">
            <label class="label">Bedrooms*</label>
            <input
              v-model="houseInfo.bedrooms"
              name="Bedrooms"
              class="input"
              type="number"
              required
              placeholder="Enter amount"
            />
          </div>

          <div class="control">
            <label class="label">Bathrooms*</label>
            <input
              v-model="houseInfo.bathrooms"
              name="Bathrooms"
              class="input"
              type="number"
              placeholder="Enter amount"
              required
            />
          </div>
        </div>

        <!-- construction date -->
        <div class="group">
          <label class="label">Construction date*</label>
          <input
            v-model="houseInfo.constructionYear"
            name="Construction date"
            class="input"
            type="number"
            placeholder="ex. 1990"
            required
          />
        </div>

        <!-- description -->
        <div class="group description">
          <label class="label">description*</label>
          <input
            v-model="houseInfo.description"
            name="description"
            class="input"
            type="text"
            placeholder="enter description"
            required
          />
        </div>

        <div class="createBtn">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </main>
</template>

<style>
.newHouse {
  position: relative;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.house_container {
  width: 100vw;
  min-height: 150vh;
  background: url("../../assets/images/background.png") no-repeat center;
  background-size: cover;
}

.form {
  position: relative;
  top: 5rem;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
}

.form input,
select {
  display: block;
  width: 350px;
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 10px 40px;
  font-size: 16px;
  color: #4a4b4c;
  border: none;
  border-radius: 5px;
}

.form label {
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 14px;
}

.form input::placeholder {
  color: #c3c3c3;
}

.group-row {
  display: flex;
  gap: 1rem;
}

.group-row input,
select {
  width: 130px;
}
.description input {
  height: 7rem;
}

.createBtn {
  width: 40%;
}

.createBtn button {
  padding: 15px 40px;
  float: right;
}

.group img {
  width: 15%;
}

/* smartphones, iPhone, portrait 480x320 phones */
@media (max-width: 641px) {
  .house_container {
    height: 140vh;
    background-size: contain;
    background-position: center bottom;
  }

  .form {
    display: flex;
    align-items: center;
  }

  .form input {
    width: 230px;
  }

  .group-row input,
  select {
    width: 70px;
  }
}

/* tablet, landscape iPad, lo-res laptops ands desktops */
@media (max-width: 1200px) {
  .form {
    max-width: 600px;
  }
}
</style>
