# QuickCart Mobile App

This is a basic Expo React Native app for uploading and managing up to 5 products locally.

## Features
- Upload up to 5 products (name, photo, price)
- Get notified when the product limit is reached
- Remove products
- Polished, modern UI
- Navigation between Home (Product List) and Add Product screens (using expo-router)

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npx expo start
   ```
3. Use the Home screen to view and remove products. Tap "Add Product" to upload a new product (name, photo, price). You will be notified if you reach the 5-product limit.

## Tech Stack
- React Native (Expo)
- expo-router for navigation
- Context API for state management
- expo-image-picker for photo selection
- NativeWind/Tailwind for styling

---

For more, see the code in the `app/` and `components/` directories.
