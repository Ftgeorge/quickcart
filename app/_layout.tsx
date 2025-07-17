import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import '../global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#F8FFE5" />
      <Stack
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        {/* Screens will be auto-registered by expo-router */}
      </Stack>
      <Toast />
    </>
  );
}
