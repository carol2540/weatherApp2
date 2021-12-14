<template>
  <div class="container p-4 text-center">
    <h1 style="margin-top:4%; color:black; text-weight:600;">Today's Weather</h1>
    <form class="d-flex search-form" @submit.prevent="getCoords">
      <input class="form-control me-2" type="text" placeholder="Search City" v-model="input" />
      <button type="submit" class="btn btn-primary" @click.prevent="getCoords">Search</button>
    </form>
    <div class="content__wrapper" v-if="weatherLocation">
      <h1 class="text-center mt-5 mb-4" style="color:white; margin-top:5%">Today's Weather Forecast in {{ weatherLocation }}</h1>
      <div class="row">
        <div class="col-lg-3" v-for="(w, i) in forecastTime" :key="i">
          <p>{{ w }}</p>
          <p>{{ temperature[i] }}°C</p>
        </div>
      </div>
    </div>
    <div v-if="!isFound">
      Oops... Something went wrong! <br />
      Weather or Location is not Found!
    </div>
  </div>
</template>

<script>
import { API_KEY } from "../config.json";

export default {
  data() {
    return {
      input: "",
      forecastTime: ["Morning", "Day", "Afternoon", "Evening"],
      temperature: [],
      weatherLocation: "",
      isFound: true
    };
  },
  methods: {
    async getWeatherData(lat, lon) {
      try {
        const singleChar = this.input.charAt(0).toUpperCase();

        const request = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,current,minutely&appid=${API_KEY}`
        );

        this.weatherCondition = [];
        this.temperature = [];
        this.weatherLocation = singleChar.concat(this.input.slice(1));

        const data = await request.json();

        this.temperature.push((data["daily"][0]["feels_like"]["morn"] - 273.15).toFixed(1));
        this.temperature.push((data["daily"][0]["feels_like"]["day"] - 273.15).toFixed(1));
        this.temperature.push((data["daily"][0]["feels_like"]["eve"] - 273.15).toFixed(1));
        this.temperature.push((data["daily"][0]["feels_like"]["night"] - 273.15).toFixed(1));
      } catch (error) {
        console.error(error);
      }
    },
    async getCoords() {
      try {
        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.input}&appid=${API_KEY}`);
        const data = await request.json();

        if (!request.ok) {
          this.isFound = false;
          throw new Error("Failed to fetch data from API");
        } else {
          this.isFound = true;
        }

        this.getWeatherData(data["coord"]["lat"], data["coord"]["lon"]);
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};
</script>
<style>
.col-lg-3 p{
  color: white;
}
.search-form{
  margin-top: 3%;
}
.content__wrapper{
  margin-top: 8%;
}
.form-control{
  width: 35% !important;
}
.d-flex{
  margin-left: 33%;
}
</style>
