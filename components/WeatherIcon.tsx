import { WeatherData } from '@/interfaces';
import { getWeather } from '@/utils/weather.util';
import RainSvg from '../assets/images/rain.svg';
import CloudySvg from '../assets/images/cloudy.svg';
import SunnySvg from '../assets/images/sunny.svg';
import SnowSvg from '../assets/images/snow.svg';

type WeatherIconProps = {
  data?: WeatherData;
  size?: number;
};

const WeatherIconMapping = {
  sunny: <SunnySvg width={160} height={140} />,
  cloud: <CloudySvg width={140} height={140} />,
  snow: <SnowSvg width={130} height={140} />,
  thunderstorm: <RainSvg width={140} height={140} />,
};

export const WeatherIcon = ({ data }: WeatherIconProps) => {
  return !!data?.weather && WeatherIconMapping[getWeather(data)];
};
