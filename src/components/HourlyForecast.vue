<template>
  <div class="container p-4 text-center">
    <h1 style="margin-top:4%; color:black; text-weight:600;">Hourly Weather</h1>
    <form class="d-flex search-form" @submit.prevent="getCoords">
      <input class="form-control me-2" type="text" placeholder="Search City" v-model="input" />
      <button type="submit" class="btn btn-primary" @click.prevent="getCoords">Search</button>
    </form>
    <div class="content__wrapper" v-if="weatherLocation">
      <h1 class="text-center mt-5 mb-4" style="color:white; margin-top:5%"> Hourly Weather Forecast in {{ weatherLocation }}</h1>
      <button class="btn btn-info" @click.prevent="showIcon">{{ isShowing ? "Hide Icons" : "Show Icons" }}</button>
      <div class="row">
        <div class="col-lg-3" v-for="(w, i) in weatherCondition" :key="i">
          <p>{{ w }}</p>
          <img v-if="isShowing" :src="weatherIcon[i]" alt="weather icon" />
          <p>{{ temperature[i] }}°C</p>
          <p>{{ forecastTime[i] }}</p>
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
import moment from "moment";

import { API_KEY } from "../config.json";

export default {
  data() {
    return {
      input: "",
      weatherCondition: [],
      forecastTime: [],
      temperature: [],
      weatherIcon: [],
      weatherLocation: "",
      isShowing: false,
      isFound: true
    };
  },
  methods: {
    async getWeatherData(lat, lon) {
      const singleChar = this.input.charAt(0).toUpperCase();

      this.weatherCondition = [];
      this.temperature = [];
      this.forecastTime = [];
      this.weatherLocation = singleChar.concat(this.input.slice(1));

      const request = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,current,minutely&appid=${API_KEY}`
      );
      const data = await request.json();

      for (let i = 1; i < 5; i++) {
        const date = moment(data["hourly"][i]["dt"] * 1000).format("HH:mm A");
        this.weatherCondition.push(data["hourly"][i]["weather"][0]["main"]);
        this.temperature.push((data["hourly"][i]["temp"] - 273.15).toFixed(1));
        this.forecastTime.push(date);
        this.weatherIcon.push(`http://openweathermap.org/img/wn/${data["hourly"][i]["weather"][0]["icon"]}@2x.png`);
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
    },
    showIcon() {
      this.isShowing = !this.isShowing;
    }
  }
};
</script>

<style></style>
