import { Text, View } from 'react-native';
import 'react-native-reanimated';
import '../global.css';

export default function RootLayout() {

  return (
    <>
      <View className='bg-white flex-1 items-center justify-center w-full h-full'>
        <Text className='text-red-600'>Hey, what's up</Text>
      </View>
    </>
  );
}
