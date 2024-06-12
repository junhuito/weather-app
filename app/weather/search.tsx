import { useCallback, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { WeatherCard } from '@/components/WeatherCard';
import { useLazyFetch } from '@/hooks/useFetchHooks';
import { WeatherData } from '@/interfaces';
import { GradientBackground } from '@/components/GradientBackground';
import { router } from 'expo-router';
import { SearchBar } from '@/components/SearchBar';
import { useSearchHistoryStore } from '@/provider';

export default function WeatherSearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundCity, setFoundCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { loading, fetchData } = useLazyFetch<WeatherData>(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.EXPO_PUBLIC_APP_KEY}`,
  );

  const { searchHistory, addSearchHistory } = useSearchHistoryStore();

  const queryCity = useCallback(async (city?: string) => {

    if (typeof city === 'undefined' || city === "") {
      return;
    }

    setErrorMessage('');
    setFoundCity('');
    setSearchTerm(city);

    const response = await fetchData({
      variables: { q: city }
    });
    if (response.cod === 200) {
      setFoundCity(city);
      addSearchHistory(city);
    } else {
      setErrorMessage(`City "${city}" is not found!`)
    }
  }, [addSearchHistory, fetchData]);

  return (
    <GradientBackground>
      <View className="space-y-5">
        <SearchBar onSubmit={(value) => queryCity(value)}/>

        <View className="flex-row flex-wrap">
          {searchHistory.map(city => (
            <Text
            key={city}
            onPress={() => queryCity(city)}
            className="text-white rounded-2xl p-2 border-gray-400 border mt-2 ml-2 first:ml-0"
          >
            {city}
          </Text>
          ))}
        </View>

        <View>
          {!!errorMessage && (
            <Text className="text-white text-lg text-center">
              {errorMessage}
            </Text>
          )}
          {loading && <ActivityIndicator size={'large'} color={'white'} />}
          {foundCity !== '' && (
            <WeatherCard
              city={foundCity}
              onTouchEnd={() =>
                router.navigate({
                  pathname: 'weather/detail/[city]',
                  params: { city: searchTerm },
                })
              }
            />
          )}
        </View>
      </View>
    </GradientBackground>
  );
}
