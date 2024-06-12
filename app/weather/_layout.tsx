import { Stack } from 'expo-router';

export default function WeatherLayout() {
  return (
    <Stack screenOptions={{
      headerTintColor: 'white',
      headerLargeTitle: true,
      headerTransparent: true,
    }}>
      <Stack.Screen name="detail/[city]" />
      <Stack.Screen name="search" options={{ headerShown: true, headerTitle: 'Search', headerTransparent: true }} />
    </Stack>
  );
}
