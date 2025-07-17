# QuickCart Mobile App

A modern Expo React Native app for uploading and managing up to 5 products locally, with a beautiful UI and smooth user experience.

## Features
- Upload up to 5 products (name, photo, price)
- Remove products
- Get notified when the product limit is reached (toast notification)
- Polished, modern UI with consistent spacing and color
- Custom animated splash screen (emerald background, pulsing QuickCart text)
- Light status bar and notification panel
- Navigation between Home (Product List) and Add Product screens (using expo-router)
- State management with [Zustand](https://github.com/pmndrs/zustand)

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npx expo start
   ```
3. The app will show a custom splash screen, then navigate to the Home screen.
4. Use the Home screen to view and remove products. Tap "Add Product" to upload a new product (name, photo, price). You will be notified if you reach the 5-product limit.

## Tech Stack
- React Native (Expo)
- expo-router for navigation
- Zustand for state management
- expo-image-picker for photo selection
- expo-linear-gradient for UI polish
- NativeWind/Tailwind for styling
- react-native-toast-message for notifications

## State Management with Zustand
All product state and actions are managed with Zustand. To extend the store (e.g., add persistence, async actions, or more product fields), edit `components/ProductContext.tsx` and use the [Zustand docs](https://docs.pmnd.rs/zustand/getting-started/introduction).

## Custom Splash Screen
- The splash screen uses an emerald background (`#06d6a0`) and a pulsing "QuickCart" text.
- After 2 seconds, the app navigates to the Home screen.

## Light Status Bar
- The status bar and notification panel are always light for a clean, modern look.

---

For more, see the code in the `app/` and `components/` directories.
