import { WeatherData, WeatherType } from '@/interfaces';

/**
 * @link https://openweathermap.org/weather-conditions
 */
export const getWeather = (data: WeatherData): WeatherType => {
  const weatherMapping = {
    cloud: 0,
    sunny: 0,
    snow: 0,
    thunderstorm: 0,
  };
  for (const weather of data.weather) {
    if (weather.id > 800) {
      weatherMapping.cloud += 1;
      continue;
    }

    if (weather.id === 800) {
      weatherMapping.sunny += 1;
      continue;
    }

    if (weather.id >= 600) {
      weatherMapping.snow += 1;
      continue;
    }

    if (weather.id >= 200) {
      weatherMapping.thunderstorm += 1;
      continue;
    }
  }

  let weatherType = '';
  let maxOccurencesWeather = 0;
  for (const [weather, count] of Object.entries(weatherMapping)) {
    if (!weatherType) {
      weatherType = weather;
    }

    if (count > maxOccurencesWeather) {
      weatherType = weather;
      maxOccurencesWeather = count;
    }
  }

  return weatherType as WeatherType;
};

export const getSunRiseProgress = (data: WeatherData) => {
  const timeOffset = data.timezone * 1000;
  const sunriseTime = data.sys.sunrise * 1000 + timeOffset;
  const sunsetTime = data.sys.sunset * 1000 + timeOffset;
  const currentTime = Date.now() + timeOffset;
  const progress = (currentTime - sunriseTime) / (sunsetTime - sunriseTime);
  
  return progress;
};
