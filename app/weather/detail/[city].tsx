import { DateTime } from '@/components/DateTime';
import { GradientBackground } from '@/components/GradientBackground';
import { WeatherIcon } from '@/components/WeatherIcon';
import { useFetch } from '@/hooks/useFetchHooks';
import { WeatherData, WeatherError } from '@/interfaces';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import WindSpeedoMeterSvg from '../../../assets/images/wind-speedometer.svg';
import PointerSvg from '../../../assets/images/pointer.svg';
import TemperatureSvg from '../../../assets/images/temperature-meter.svg';
import HumiditySvg from '../../../assets/images/humidity-meter.svg';
import Svg, {
  Circle,
  Defs,
  Stop,
  LinearGradient as LinearGradientSvg,
  Path,
} from 'react-native-svg';
import { useCityStore } from '@/provider';
import { getSunRiseProgress } from '@/utils/weather.util';

const MAX_TEMPERATURE = 40;

export default function WeatherDetailScreen() {
  const { city } = useLocalSearchParams();
  const navigation = useNavigation();

  const { cities, addCity } = useCityStore((state) => state);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTransparent: true,
      headerTintColor: '#fff',
      headerRight: () => {
        if (Array.isArray(city) || typeof city === 'undefined') {
          return null;
        }

        if (cities.includes(city)) {
          return null;
        }
        
        return (
          <MaterialCommunityIcons
            name='plus'
            size={30}
            color='white'
            onPress={() => {
              addCity(city);
              router.dismissAll();
            }}
          />
        );
      },
    });
  }, [city, cities, navigation, addCity]);

  const { data } = useFetch<WeatherData, WeatherError>(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.EXPO_PUBLIC_APP_KEY}`,
    {
      poll: 60 * 1000,
    }
  );

  return (
    <GradientBackground>
      <View className="items-center space-y-2">
        <WeatherIcon data={data} />
        <Text className="text-xl text-white mb-4">
          {data?.weather ? data.weather[0].description : ''}
        </Text>
        {!!data?.timezone && <DateTime offset={data.timezone * 1000} />}
        <Text className="text-4xl font-bold text-white mb-4">{data?.name}</Text>
        <View className="flex-1 flex-row flex-wrap">
          <View className="h-40 w-1/2 p-2">
            <LinearGradient
              colors={['rgba(255, 255, 255, .2)', 'rgba(97, 47, 171, .1)']}
              className="w-full h-full rounded-lg border-gray-600 border border-b-0 p-2"
            >
              <View className="flex-row space-x-2 items-center">
                <MaterialCommunityIcons
                  name="weather-windy"
                  size={25}
                  color="#FFF"
                />
                <Text className="text-white">WIND</Text>
              </View>
              <View className="relative flex-1 items-center justify-center">
                <WindSpeedoMeterSvg />
                <View
                  className="absolute"
                  style={{
                    transform: [{ rotateZ: `${data?.wind?.deg ?? 0}deg` }],
                  }}
                >
                  <PointerSvg
                    width={15}
                    height={15}
                    style={{
                      transform: [{ translateY: -32 }, { rotateZ: '-31deg' }],
                    }}
                  />
                </View>
                <View className="absolute">
                  <Text className="text-white text-lg text-center font-bold">
                    {(((data?.wind?.speed ?? 0) * 3600) / 1000).toFixed(1)}
                  </Text>
                  <Text className="-mt-2 text-center text-xs text-gray-400">
                    Km/h
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View className="h-40 w-1/2 p-2">
            <LinearGradient
              colors={['rgba(255, 255, 255, .2)', 'rgba(97, 47, 171, .1)']}
              className="w-full h-full rounded-lg border-gray-600 border border-b-0 p-2"
            >
              <View className="flex-row space-x-2 items-center">
                <MaterialCommunityIcons
                  name="thermometer-low"
                  size={25}
                  color="rgb(248 113 113)"
                />
                <Text className="text-white">FEELS LIKE</Text>
              </View>
              <View className="relative flex-1 items-center justify-center">
                <TemperatureSvg />
                <View className="absolute rotate-90">
                  <Svg width={75} height={75}>
                    <Defs>
                      <LinearGradientSvg
                        id="progress-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <Stop offset="0%" stopColor={'#50D6E3'} />
                        <Stop offset="100%" stopColor={'#AD0DFA'} />
                      </LinearGradientSvg>
                    </Defs>
                    <Circle
                      cx={37.5}
                      cy={37.5}
                      r={30}
                      stroke={'url(#progress-gradient)'}
                      strokeWidth={4}
                      fill="transparent"
                      strokeLinecap="round"
                      strokeDashoffset={(2 * Math.PI * 30) * (MAX_TEMPERATURE - (data?.main?.temp ?? 0)) / MAX_TEMPERATURE}
                      strokeDasharray={`${2 * Math.PI * 30} ${2 * Math.PI * 30}`}
                    />
                  </Svg>
                </View>
                <View className="absolute">
                  <Text className="text-white text-lg text-center font-bold">
                    {(data?.main?.temp ?? 0).toFixed(0)}°
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View className="h-40 w-1/2 p-2">
            <LinearGradient
              colors={['rgba(255, 255, 255, .2)', 'rgba(97, 47, 171, .1)']}
              className="w-full h-full rounded-lg border-gray-600 border border-b-0 p-2"
            >
              <View className="flex-row space-x-2 items-center">
                <Ionicons
                  name="water-outline"
                  size={25}
                  color="rgb(96 165 250)"
                />
                <Text className="text-white">HUMIDITY</Text>
              </View>
              <View className="relative flex-1 items-center justify-center">
                <HumiditySvg/>
                <View className="absolute rotate-90">
                  <Svg width={90} height={90}>
                    <Defs>
                      <LinearGradientSvg
                        id="progress-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <Stop offset="0%" stopColor='#50D6E3' />
                        <Stop offset="100%" stopColor='#AD0DFA' />
                      </LinearGradientSvg>
                    </Defs>
                    <Circle
                      cx={45}
                      cy={45}
                      r={40.5}
                      stroke='url(#progress-gradient)'
                      strokeWidth={10}
                      fill="transparent"
                      strokeLinecap="round"
                      strokeDashoffset={(2 * Math.PI * 40.5) * (100 - (data?.main?.humidity ?? 0)) / 100}
                      strokeDasharray={`${2 * Math.PI * 40.5} ${2 * Math.PI * 40.5}`}
                    />
                  </Svg>
                </View>
                <View className="absolute">
                  <Text className='text-white text-lg text-center font-bold'>{data?.main?.humidity}%</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View className="h-40 w-1/2 p-2">
            <LinearGradient
              colors={['rgba(255, 255, 255, .2)', 'rgba(97, 47, 171, .1)']}
              className="w-full h-full rounded-lg border-gray-600 border border-b-0 p-2"
            >
              <View className="flex-row space-x-2 items-center">
                <Ionicons name="sunny-sharp" size={25} color="yellow" />
                <Text className="text-white">SUNRISE</Text>
              </View>
              <View className="relative flex-1 items-center justify-center">
                <Svg height="90" width="90">
                  <Defs>
                    <LinearGradientSvg
                      id="sunrise-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <Stop offset="0%" stopColor='#AD0DFA' />
                      <Stop offset="10%" stopColor='#50D6E3' />
                      <Stop offset="90%" stopColor='#50D6E3' />
                      <Stop offset="100%" stopColor='#AD0DFA' />
                    </LinearGradientSvg>
                  </Defs>
                  <Path
                    d="M0,55 Q45, -35 90,55"
                    stroke="url(#sunrise-gradient)"
                    strokeWidth="2"
                    fill="transparent"
                  />
                  {!!data?.sys && <Circle
                    cx={getSunRiseProgress(data) * 90}
                    cy={(45 * (Math.sin(getSunRiseProgress(data) * Math.PI) * -1)) + 55} // Adjusted y-coordinate for proper movement
                    r={5}
                    fill="white"
                  />}
                </Svg>
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}
