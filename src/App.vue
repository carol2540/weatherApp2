<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/home">Weather App</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/current-weather">Current Weather</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/today-forecast">Today Weather</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/hourly-forecast">Hourly Weather</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about-us" >About Us</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&display=swap");

* {
  font-family: "Readex Pro", sans-serif;
}


</style>
