<template>
  <div class="container p-4 text-center">
    <h1 style="margin-top:4%; color:black; text-weight:600;">Current Weather</h1>
    <form class="d-flex search-form" @submit.prevent="getWeatherData">
      <input class="form-control me-2" type="text" placeholder="Search City" v-model="input" />
      <button type="submit" class="btn btn-primary" @click.prevent="getWeatherData">Search</button>
    </form>
    <div class="content__wrapper" v-if="weatherLocation">
      <h1 class="text-center mt-5 mb-4" style="color:black; margin-top:5%">Current Weather in {{ weatherLocation }}</h1>
      <button class="btn btn-info" @click.prevent="toggleTemperature('celcius')">Celcius</button>
      <button class="btn btn-info" @click.prevent="toggleTemperature('fahrenheit')">Fahrenheit</button>
      <button class="btn btn-info" @click.prevent="toggleTemperature('kelvin')">Kelvin</button>
      <div class="row">
        <div class="col-lg-4 offset-lg-4">
          <div class="weather__card-wrapper">
            <p>Today's Weather is {{ currWeather }}</p>
            <p v-if="isCelcius">Temp: {{ temperature }}°C</p>
            <p v-else-if="isFahrenheit">Temp: {{ temperature }}°F</p>
            <p v-else-if="isKelvin">Temp: {{ temperature }}K</p>
            <p>Visibility: {{ visibility }} metres</p>
            <p>Wind Speed: {{ wSpeed }}m/s</p>
          </div>
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
      currWeather: "",
      weatherLocation: "",
      temperature: 0,
      visibility: 0,
      wSpeed: 0,
      input: "",
      isCelcius: true,
      isFahrenheit: false,
      isKelvin: false,
      isFound: true
    };
  },
  methods: {
    async getWeatherData() {
      try {
        this.weatherLocation = "";
        this.currWeather = "";
        this.temperature = 0;
        this.visibility = 0;
        this.wSpeed = 0;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.input}&appid=${API_KEY}`);

        if (!response.ok) {
          this.isFound = false;
          this.$refs.inputform.value = "";
          throw new Error("Failed to fetch data");
        } else {
          this.isFound = true;
        }

        const data = await response.json();

        this.weatherLocation = data["name"];
        this.currWeather = data["weather"][0]["main"];
        this.temperature = (data["main"]["temp"] - 273.15).toFixed(1);
        this.visibility = data["visibility"];
        this.wSpeed = data["wind"]["speed"];

        return data["main"]["temp"];
      } catch (err) {
        console.error(err.message);
      }
    },
    async toggleTemperature(temp) {
      const currTemp = await this.getWeatherData();

      switch (temp) {
        case "celcius":
          this.isCelcius = true;
          this.isFahrenheit = false;
          this.isKelvin = false;
          this.temperature = (currTemp - 273.15).toFixed(1);
          break;
        case "fahrenheit":
          this.isFahrenheit = true;
          this.isCelcius = false;
          this.isKelvin = false;
          this.temperature = (((currTemp - 273.15) * 9) / 5 + 32).toFixed(1);
          break;
        case "kelvin":
          this.isKelvin = true;
          this.isFahrenheit = false;
          this.isCelcius = false;
          this.temperature = currTemp.toFixed(1);
          break;
      }
    }
  }
};
</script>

<style>
.col-lg-4{
  color: black;
}
.btn{
  padding: 3px 3px;
}
</style>
