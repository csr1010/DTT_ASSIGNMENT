import { defineStore } from "pinia";
import axios from "axios";
import { apiUrl, API_KEY } from "../config/constants";

export const useHouseStore = defineStore("houses", {
  state: () => ({
    houses: [],
    currentHouse: null,
  }),

  getters: {
    getHouses: (state) => {
      return state.houses;
    },
  },

  actions: {
    async fetchHouses() {
      try {
        const houses = await axios.get(`${apiUrl}/houses`, {
          headers: {
            "X-Api-Key": API_KEY,
          },
        });
        this.houses = houses.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async fetchHouse(id) {
      try {
        const houseDetail = await axios.get(`${apiUrl}/houses/${id}`, {
          headers: {
            "X-Api-Key": API_KEY,
          },
        });
        this.currentHouse = houseDetail.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async addHouse(newHouse) {
      console.log("new house action", newHouse);
      try {
        const house = await axios.post(`${apiUrl}/houses`, newHouse, {
          headers: {
            "X-Api-Key": API_KEY,
          },
        });
        console.log("yup created", house.data);
        if (house.data.id) {
          const newId = house.data.id;
          const image = newHouse.image;
          console.log("newId:", newId);
          console.log("Img", newHouse.image);
          const uploadImgRes = await axios.post(
            `${apiUrl}/houses/${newId}/upload`,
            image,
            {
              headers: {
                "X-Api-Key": API_KEY,
              },
            }
          );
          console.log("uploadImgRes", uploadImgRes.data);
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async editHouse(id, updatedHouse) {
      console.log("edit house", id, updatedHouse);
      try {
        const response = await axios.post(
          `${apiUrl}/houses/${id}`,
          updatedHouse,
          {
            headers: {
              "X-Api-Key": API_KEY,
            },
          }
        );
        console.log(response);
      } catch (e) {
        console.log(e.message);
      }
    },

    async deleteHouse(houseId) {
      console.log("house id action", houseId);
      try {
        const house = await axios.delete(`${apiUrl}/houses/${houseId}`, {
          headers: {
            "X-Api-Key": API_KEY,
          },
        });
        console.log("response", house);
        console.log("House deleted?", houseId);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
