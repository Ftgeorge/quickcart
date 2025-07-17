import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ProductProvider, useProductContext } from '../components/ProductContext';

const ProductUploadScreen = () => {
  const { products, addProduct, removeProduct, isLimitReached } = useProductContext();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

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

  const handleAddProduct = () => {
    if (!name || !photo || !price) {
      Alert.alert('Please fill all fields and select a photo.');
      return;
    }
    const success = addProduct({ name, photo, price: parseFloat(price) });
    if (!success) {
      Alert.alert('Product limit reached (5 products max).');
    } else {
      setName('');
      setPrice('');
      setPhoto(null);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-2">Upload Products</Text>
      {isLimitReached && (
        <Text className="text-red-500 mb-2">Product limit reached (5 products max).</Text>
      )}
      <TextInput
        className="border p-2 mb-2 rounded"
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        editable={!isLimitReached}
      />
      <TextInput
        className="border p-2 mb-2 rounded"
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        editable={!isLimitReached}
      />
      <TouchableOpacity
        className="bg-gray-200 p-2 mb-2 rounded items-center"
        onPress={pickImage}
        disabled={isLimitReached}
      >
        <Text>{photo ? 'Change Photo' : 'Pick a Photo'}</Text>
      </TouchableOpacity>
      {photo && (
        <Image source={{ uri: photo }} style={{ width: 100, height: 100, marginBottom: 8 }} />
      )}
      <Button title="Add Product" onPress={handleAddProduct} disabled={isLimitReached} />
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        className="mt-4"
        renderItem={({ item }) => (
          <View className="flex-row items-center mb-2 border-b pb-2">
            <Image source={{ uri: item.photo }} style={{ width: 50, height: 50, marginRight: 8 }} />
            <View className="flex-1">
              <Text className="font-semibold">{item.name}</Text>
              <Text>${item.price.toFixed(2)}</Text>
            </View>
            <Button title="Remove" onPress={() => removeProduct(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default function App() {
  return (
    <ProductProvider>
      <ProductUploadScreen />
    </ProductProvider>
  );
} 