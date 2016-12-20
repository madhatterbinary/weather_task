import axios from 'axios';

const API_KEY = 'afb4aa2829ed23b6f97521c190f0dfb0';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?&units=metric&appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city}`;
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
