import React, { useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';

const rotation = new Animated.Value(0);

const runAnimation = () => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(rotation, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: -1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]),
  ).start();
};

export const HelloWave: React.FC = () => {
  useEffect(() => {
    runAnimation();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-12deg', '12deg'],
  });

  return (
    <Animated.Text style={[styles.wave, { transform: [{ rotate }] }]}>👋</Animated.Text>
  );
};

const styles = StyleSheet.create({
  wave: {
    fontSize: 28,
  },
});
