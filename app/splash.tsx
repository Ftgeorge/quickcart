import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Animated, Easing, View } from 'react-native';

export default function Splash() {
  const router = useRouter();
  const scale = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.15,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      { iterations: 2 }
    ).start(() => {
      SplashScreen.hideAsync();
      router.replace('/home');
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#06d6a0', alignItems: 'center', justifyContent: 'center' }}>
      <Animated.Text
        style={{
          color: '#F8FFE5',
          fontSize: 40,
          fontWeight: 'bold',
          letterSpacing: 1,
          textAlign: 'center',
          transform: [{ scale }],
        }}
      >
        QuickCart
      </Animated.Text>
    </View>
  );
} 