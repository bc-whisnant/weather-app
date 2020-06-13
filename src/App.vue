<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-toolbar-title>Get the Forecast</v-toolbar-title>
     <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-cloud</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <WeatherContainer/>
    </v-main>
  </v-app>
</template>

<script>
import WeatherContainer from './components/WeatherContainer'
export default {
  
  name: 'App',

  components: {
    WeatherContainer,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
 * {
   font-family: 'Roboto Condensed', sans-serif;
 }
 h3,
 h4 {
   font-weight: 400;
 }
</style>
