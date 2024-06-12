import { Stack } from 'expo-router';
import { Text } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <GradientBackground>
        <Text className='text-2xl text-center m-auto text-white'>Page is not found!</Text>
      </GradientBackground>
    </>
  );
}
