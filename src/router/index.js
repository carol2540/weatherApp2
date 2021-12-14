import { createRouter, createWebHistory } from "vue-router";

import aboutus from"../components/aboutus.vue";
import Home from "../views/Home.vue";
import CurrentWeather from "../components/CurrentWeather.vue";
import HourlyForecast from "../components/HourlyForecast.vue";
import TodayForecast from "../components/TodayForecast.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    alias: ["/home", "/welcome"],
    component: Home
  },
  {
    path: "/current-weather",
    component: CurrentWeather
  },
  {
    path: "/hourly-forecast",
    component: HourlyForecast
  },
  {
    path: "/today-forecast",
    component: TodayForecast
  },
  {
    path: "/:notFound(.*)",
    component: NotFound
  },
  {
    path: "/about-us",
    component: aboutus
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
