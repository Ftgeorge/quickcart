import { Feather, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useProductStore } from '../components/ProductContext';

export default function AddProductScreen() {
  // Zustand store hooks for product actions and state
  const addProduct = useProductStore((state) => state.addProduct);
  const isLimitReached = useProductStore((state) => state.isLimitReached);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const router = useRouter();

  // Launch image picker for product photo
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    if (!name || !photo || !price) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please fill all fields and select a photo to continue.',
      });
      return;
    }
    const success = addProduct({ name, photo, price: parseFloat(price) });
    if (!success) {
      Toast.show({
        type: 'error',
        text1: 'Product Limit Reached',
        text2: 'You can only add up to 5 products. Please remove some products first.',
      });
    } else {
      setName('');
      setPrice('');
      setPhoto(null);
      router.replace('/home');
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F8FFE5]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View className="px-6 pt-10 pb-8">
          {/* Custom header with back button and centered title */}
          <View className="relative flex-row items-center justify-center my-8">
            <TouchableOpacity
              className="absolute left-0 p-2"
              onPress={() => router.replace('/home')}
              accessibilityLabel="Go back"
            >
              <Feather name="arrow-left" size={28} color="#06d6a0" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-800 text-center w-full">Add New Product</Text>
          </View>

          {/* Limit warning if product limit is reached */}
          {isLimitReached && (
            <View className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 mx-2">
              <View className="flex-row items-center">
                <View className="w-6 h-6 bg-red-500 rounded-full items-center justify-center mr-3">
                  <MaterialIcons name="error-outline" size={16} color="#fff" />
                </View>
                <Text className="text-red-700 font-semibold flex-1">
                  Product limit reached (5 products max)
                </Text>
              </View>
            </View>
          )}

          {/* Form container for product details */}
          <View className="bg-white rounded-3xl shadow-lg p-6 mx-2">
            {/* Photo upload section */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-3 text-lg">Product Photo</Text>
              <TouchableOpacity
                className={`border-2 border-dashed rounded-2xl p-6 items-center ${
                  photo 
                    ? 'border-[#06d6a0] bg-[#06d6a0]/5' 
                    : 'border-gray-300 bg-gray-50'
                } ${isLimitReached ? 'opacity-50' : ''}`}
                onPress={pickImage}
                disabled={isLimitReached}
              >
                {photo ? (
                  <View className="items-center">
                    <Image 
                      source={{ uri: photo }} 
                      style={{ 
                        width: 120, 
                        height: 120, 
                        borderRadius: 16,
                        marginBottom: 12
                      }} 
                    />
                    <View className="flex-row items-center">
                      <Feather name="image" size={18} color="#06d6a0" />
                      <Text className="text-[#06d6a0] font-semibold text-base ml-2">
                        Change Photo
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View className="items-center py-4">
                    <Feather name="image" size={48} color="#9ca3af" style={{ marginBottom: 12 }} />
                    <Text className="text-gray-600 font-semibold text-base">
                      Tap to select photo
                    </Text>
                    <Text className="text-gray-400 text-sm mt-1">
                      JPG, PNG supported
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Product name input */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-3 text-lg">Product Name</Text>
              <TextInput
                className={`border-2 border-gray-200 bg-gray-50 p-4 rounded-2xl text-base font-medium ${
                  isLimitReached ? 'opacity-50' : ''
                } ${name ? 'border-[#06d6a0] bg-[#06d6a0]/5' : ''}`}
                placeholder="Enter product name..."
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                editable={!isLimitReached}
                returnKeyType="next"
              />
            </View>

            {/* Price input */}
            <View className="mb-8">
              <Text className="text-gray-700 font-semibold mb-3 text-lg">Price</Text>
              <View className="relative">
                <TextInput
                  className={`border-2 border-gray-200 bg-gray-50 p-4 pl-12 rounded-2xl text-base font-medium ${
                    isLimitReached ? 'opacity-50' : ''
                  } ${price ? 'border-[#06d6a0] bg-[#06d6a0]/5' : ''}`}
                  placeholder="0.00"
                  placeholderTextColor="#9CA3AF"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                  editable={!isLimitReached}
                  returnKeyType="done"
                />
                <Text className="absolute left-4 top-4 text-gray-600 text-base font-semibold">
                  $
                </Text>
              </View>
            </View>

            {/* Add Product button */}
            <TouchableOpacity
              className={`rounded-2xl p-4 items-center mb-4 shadow-lg ${
                isLimitReached || !name || !price || !photo
                  ? 'bg-gray-300' 
                  : 'bg-[#06d6a0]'
              }`}
              onPress={handleAddProduct}
              disabled={isLimitReached || !name || !price || !photo}
            >
              <View className="flex-row items-center justify-center">
                <Feather name="plus-circle" size={18} color={isLimitReached || !name || !price || !photo ? '#6b7280' : '#fff'} />
                <Text className={`font-bold text-lg ml-2 ${
                  isLimitReached || !name || !price || !photo
                    ? 'text-gray-500' 
                    : 'text-white'
                }`}>
                  Add Product
                </Text>
              </View>
            </TouchableOpacity>

            {/* Cancel button: clears all fields */}
            <TouchableOpacity
              className="rounded-2xl p-4 items-center bg-gray-100 border border-gray-200"
              onPress={() => {
                setName('');
                setPrice('');
                setPhoto(null);
              }}
            >
              <View className="flex-row items-center justify-center">
                <Text className="text-gray-600 font-semibold text-base ml-2">
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Bottom spacing for scroll */}
          <View className="h-8" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}