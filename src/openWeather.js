import axios from 'axios';


const api_key = 'f64c1ed92425123c71995ff6c8a412ed';
const base_url = 'https://api.openweathermap.org/data/2.5/weather';
const base_url2 = 'https://api.openweathermap.org/data/2.5/forecast';


export const getWeather = async (city) => {

    try {
      const response = await axios.get(base_url, {
        params: {
          q: city,
          appid: api_key,
          units: 'metric', 
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };
  
  export const getFiveDayForecast = async (city) => {
    try {
      const response = await axios.get(base_url2, {
        params: {
          q: city,
          appid: api_key,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      throw error;
    }
  };