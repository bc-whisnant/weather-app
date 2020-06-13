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
            <base-button @click="testing" color="secondary">Search</base-button>
          </v-card-actions>
        </v-card>
      </v-col>
      {{ form.query }}
    </v-row>
  </v-container>
</template>

<script>
import BaseInput from "./BaseComponents/BaseInput";
import BaseButton from "./BaseComponents/BaseButton";

export default {
  name: "WeatherContainer",
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      form: {
        query: ''
      }
    }
  },
  methods: {
    testing() {
      console.log('testing')
    }
  }
};
</script>

<style scoped>
.weather-container {
  max-width: 500px;
  margin: 0 auto;
}
</style>
