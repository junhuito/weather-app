import { FlatList } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { router } from 'expo-router';
import { WeatherCard } from '@/components/WeatherCard';
import { useCityStore } from '@/provider';

export default function HomeScreen() {
  const { cities } = useCityStore(state => state);

  return (
    <GradientBackground>
      <FlatList
        data={cities}
        renderItem={({ item }) => (
          <WeatherCard
            key={item}
            city={item}
            onTouchEnd={() =>
              router.push({
                pathname: 'weather/detail/[city]',
                params: { city: item },
              })
            }
          />
        )}
      />
    </GradientBackground>
  );
}
