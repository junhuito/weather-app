import React from 'react';
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const GradientBackground = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['rgba(46, 51, 90, 1)', 'rgba(28, 27, 51, 1)']}
        className="flex-1"
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <LinearGradient
          className="flex-1 px-5 pt-24 pb-10"
          colors={[
            'rgba(97, 47, 171, .2)',
            'rgba(97, 47, 171, .5)',
            'rgba(97, 47, 171, .5)',
            'rgba(97, 47, 171, .2)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          {children}
        </LinearGradient>
      </LinearGradient>
    </SafeAreaView>
  );
};
