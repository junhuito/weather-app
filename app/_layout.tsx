import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerTintColor: 'white',
        headerLargeTitle: true,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Weather',
          headerRight: () => (
            <MaterialCommunityIcons
              name="magnify"
              size={30}
              color="white"
              onPress={() => router.push('weather/search')}
            />
          ),
        }}
      />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="weather" options={{ headerShown: false }} />
    </Stack>
  );
}
