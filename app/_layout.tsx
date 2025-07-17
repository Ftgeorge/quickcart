import { Text, View } from 'react-native';
import 'react-native-reanimated';
import { ProductProvider } from '../components/ProductContext';
import '../global.css';

export default function RootLayout() {

  return (
    <ProductProvider>
      <View className='bg-white flex-1 items-center justify-center w-full h-full'>
        <Text className='text-red-600'>Hey, what's up</Text>
      </View>
    </ProductProvider>
  );
}
