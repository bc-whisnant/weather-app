<template>
  <v-container class="weather-container">
    <v-row align-center justify-center>
      <v-col cols="12">
        <v-card ref="form" flat>
          <v-card-text>
            <BaseInput v-model="form.query" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <base-button @click="searchWeather" color="secondary"
              >Search</base-button
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-if="submitted" cols="12">
        <v-card flat>
          <v-card-title class="headline"></v-card-title>
          <div class="information">
            <p> In {{ name }} the weather is described as {{ description }}. The current temperature is {{ currentTemp }} degrees.</p>
            <p>The max today was {{ maxTemp }} and the min was {{ minTemp }}. It feels like it is {{feelsLike }} degrees.</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseInput from "./BaseComponents/BaseInput";
import BaseButton from "./BaseComponents/BaseButton";
import axios from "axios";

export default {
  name: "WeatherContainer",
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      form: {
        query: "",
      },
      API_KEY: "731509ea59cc8fb073325761658c3185",

      currentTemp: "",
      humidity: "",
      feelsLike: "",
      maxTemp: "",
      minTemp: "",
      name: "",
      description: "",
      submitted: false,
    };
  },
  methods: {
    testing() {
      console.log("testing");
    },
    searchWeather() {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.form.query}&units=imperial&apikey=${this.API_KEY}`
        )
        .then((response) => {
          const {
            temp,
            humidity,
            feels_like,
            temp_max,
            temp_min,
          } = response.data.main;
          const { description } = response.data.weather[0];
          this.submitted = true;
          this.name = response.data.name;
          this.currentTemp = temp;
          this.humidity = humidity;
          this.feelsLike = feels_like;
          this.maxTemp = temp_max;
          this.minTemp = temp_min;
          this.description = description;
        });
    },
  },
};
</script>

<style scoped>
.weather-container {
  max-width: 65%;
  margin: 0 auto;
}

.information {
  text-align: center;
}

@media screen and (max-width: 700px) {
  .weather-container {
    max-width: 80%;
    margin: 0 auto;
  }
}
</style>
