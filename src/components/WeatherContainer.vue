<template>
  <v-container class="weather-container">
    <v-row align-center justify-center>
      <v-col cols="12">
        <v-card ref="form" flat>
          <v-card-text>
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <v-form @submit.prevent="handleSubmit(onSubmit)">
                <validation-provider v-slot="{ errors }" name="weather-field" rules="required">
                   <BaseInputWithValidation v-model="form.query" :error-messages="errors" data-cy="weather-input"/>
                </validation-provider>
              </v-form>
            </ValidationObserver>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <base-button @click="searchWeatherAndValidate" color="secondary" data-cy="search-btn">
              Search
            </base-button
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-if="submitted" cols="12">
        <v-card flat>
          <v-card-title class="headline"></v-card-title>
          <div class="information" v-if="valid">
            <p> In {{ name }} the weather is described as {{ description }}. The current temperature is {{ currentTemp }} degrees.</p>
            <p>The max today was {{ maxTemp }} and the min was {{ minTemp }}. It feels like it is {{feelsLike }} degrees.</p>
          </div>
          <div class="information" v-else>
            <p>There are errors in the form</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { withValidation, ValidationObserver, ValidationProvider } from 'vee-validate'
import BaseInput from "./BaseComponents/BaseInput";
import BaseButton from "./BaseComponents/BaseButton";
import axios from "axios";

const BaseInputWithValidation = withValidation(BaseInput)

export default {
  name: "WeatherContainer",
  components: {
    ValidationObserver,
    ValidationProvider,
    BaseInputWithValidation,
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
      valid: false
    };
  },
  methods: {
    async searchWeatherAndValidate() {
      this.valid = await this.$refs.observer.validate()

      try {
        if (this.valid) {
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
      }
      this.submitted = true
      } catch(err) {
        console.log(err)
      }

      
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
