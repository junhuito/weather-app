import { Animated, Dimensions, GestureResponderEvent, StyleSheet, Text, View } from 'react-native';
import { useFetch } from '@/hooks/useFetchHooks';
import WeatherCardSvg from '../assets/images/weather-card.svg';
import WeatherCardBackdropSvg from '../assets/images/weather-card-backdrop.svg';
import { WeatherData, WeatherError } from '@/interfaces';
import { DateTime } from './DateTime';
import { WeatherIcon } from './WeatherIcon';

type WeatherCardProps = {
  city: string;
  onTouchEnd?: (event: GestureResponderEvent) => void;
};

export const WeatherCard = ({ city, onTouchEnd }: WeatherCardProps) => {

  const { data } = useFetch<WeatherData, WeatherError>(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.EXPO_PUBLIC_APP_KEY}`,
    {
      poll: 60 * 1000,
    },
  );

  return (
    <Animated.View
      style={{ height: 250 }}
      className="flex justify-center -mt-6 -mb-8 -ml-2"
      onTouchEnd={onTouchEnd}
    >
      <WeatherCardBackdropSvg
        width={Dimensions.get('screen').width - 40}
        style={style.weatherCardBackdropSvg}
      />
      <WeatherCardSvg
        width={Dimensions.get('screen').width - 60}
        style={style.weatherCardSvg}
      />
      <View className=" pl-8 pr-4">
        <View className="flex-row items-center justify-between -mb-6 -mt-10">
          <Text className="text-white text-4xl">{data?.main?.temp?.toFixed(0) ?? '-'}°</Text>
          <WeatherIcon data={data}/>
        </View>
        {!!data?.timezone && <DateTime offset={data.timezone * 1000}/>}
        <View className="flex-row justify-between">
          <Text className="text-white">{data?.name}</Text>
          <Text className="text-white mr-4">{data?.weather ? data.weather[0].description : ''}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  weatherCardBackdropSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  weatherCardSvg: {
    position: 'absolute',
    top: 6,
    left: 20,
  },
});
