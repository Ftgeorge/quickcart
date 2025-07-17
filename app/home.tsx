import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useProductStore } from '../components/ProductContext';

export default function HomeScreen() {
  // Zustand store hooks for product state and actions
  const products = useProductStore((state) => state.products);
  const removeProduct = useProductStore((state) => state.removeProduct);
  const isLimitReached = useProductStore((state) => state.isLimitReached);
  const router = useRouter();

  // Empty state UI when there are no products
  const EmptyState = () => (
    <View className="items-center justify-center py-16">
      <View className="w-32 h-32 bg-gray-100 rounded-full items-center justify-center mb-6 shadow-sm">
        <Feather name="box" size={64} color="#06d6a0" />
      </View>
      <Text className="text-2xl font-bold text-gray-700 mb-3">No Products Yet</Text>
      <Text className="text-gray-500 text-center text-base px-8 leading-6">
        Start building your product catalog by adding your first item
      </Text>
    </View>
  );

  // Card for displaying a single product
  const ProductCard = ({ item }: { item: any }) => (
    <View className="bg-white rounded-3xl shadow-md p-5 mb-4 mx-6">
      <View className="flex-row items-center">
        <View className="relative">
          <Image 
            source={{ uri: item.photo }} 
            style={{ 
              width: 80, 
              height: 80, 
              borderRadius: 20,
              backgroundColor: '#f3f4f6'
            }} 
          />
          {/* Checkmark icon overlay */}
          <View className="absolute -top-2 -right-2 w-6 h-6 bg-[#06d6a0] rounded-full items-center justify-center">
            <Feather name="check" size={16} color="#fff" />
          </View>
        </View>
        <View className="flex-1 ml-4">
          <Text className="font-bold text-lg text-gray-800 mb-1" numberOfLines={1}>
            {item.name}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold text-[#06d6a0]">
              ${item.price.toFixed(2)}
            </Text>
          </View>
        </View>
        {/* Remove product button */}
        <TouchableOpacity
          className="bg-red-50 border border-red-200 rounded-2xl px-4 py-2 ml-3"
          onPress={() => removeProduct(item.id)}
        >
          <View className="flex-row items-center">
            <MaterialIcons name="delete-outline" size={18} color="#ef4444" />
            <Text className="text-red-600 font-semibold text-xs ml-1">Remove</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#F8FFE5]">
      <View className="relative">
        <View className="px-6 pt-20 pb-2">
          {/* App title and header */}
          <Text className='text-3xl text-[#06d6a0] font-bold'>QuickCart</Text>
          <View className="items-center mb-8 mt-4">
            <View className="w-20 h-20 bg-[#06d6a0] rounded-full items-center justify-center mb-4 shadow-md">
              <Ionicons name="pricetags-outline" size={40} color="#fff" />
            </View>
            <Text className="text-3xl font-bold text-gray-800 mb-2">Your Products</Text>
            <Text className="text-gray-600 text-center text-base">
              {products.length > 0
                ? `${products.length} product${products.length === 1 ? '' : 's'} in your catalog`
                : 'Build your product catalog'
              }
            </Text>
          </View>
          {/* Stats cards for product count and value */}
          {products.length > 0 && (
            <View className="flex-row mb-6 mx-2">
              <View className="flex-1 bg-white rounded-2xl p-4 mr-2 shadow-sm">
                <Text className="text-gray-500 text-sm font-medium">Total Products</Text>
                <Text className="text-2xl font-bold text-[#06d6a0]">{products.length}</Text>
              </View>
              <View className="flex-1 bg-white rounded-2xl p-4 ml-2 shadow-sm">
                <Text className="text-gray-500 text-sm font-medium">Total Value</Text>
                <Text className="text-2xl font-bold text-[#06d6a0]">
                  ${products.reduce((sum, product) => sum + product.price, 0).toFixed(2)}
                </Text>
              </View>
            </View>
          )}
          {/* Add Product Button: disables if limit reached, shows toast */}
          <TouchableOpacity
            className="bg-[#06d6a0] rounded-2xl p-4 items-center mb-6 mx-2 shadow-md"
            onPress={() => {
              if (isLimitReached) {
                Toast.show({
                  type: 'error',
                  text1: 'Product Limit Reached',
                  text2: 'You can only add up to 5 products. Please remove some products first.',
                });
              } else {
                router.push('/add-product');
              }
            }}
          >
            <Text className="text-white font-bold text-lg">
              Add New Product
            </Text>
          </TouchableOpacity>
        </View>
        {/* Fade gradient at the bottom for visual polish */}
        <LinearGradient
          colors={['rgba(248, 255, 229, 0)', 'rgba(248, 255, 229, 0.8)', 'rgba(248, 255, 229, 1)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            pointerEvents: 'none'
          }}
        />
      </View>
      {/* Product List */}
      <View className="flex-1">
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 20 }}
          ListEmptyComponent={<EmptyState />}
          renderItem={({ item }) => <ProductCard item={item} />}
        />
      </View>
    </View>
  );
}