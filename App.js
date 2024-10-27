import 'react-native-gesture-handler';
import { StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainAppNavigation from './app/navigation/MainAppNavigation';
import { useFonts } from 'expo-font';
import { store } from './app/redux/store';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { colors } from './app/utils/Theme';

let persister = persistStore(store)

export default function App() {

  const [loaded] = useFonts({
    'SF-Pro-Display-Black': require('./app/assets/fonts/SF-Pro-Display-Black.ttf'),
    'SF-Pro-Display-Bold': require('./app/assets/fonts/SF-Pro-Display-Bold.ttf'),
    'SF-Pro-Display-Heavy': require('./app/assets/fonts/SF-Pro-Display-Heavy.ttf'),
    'SF-Pro-Display-Light': require('./app/assets/fonts/SF-Pro-Display-Light.ttf'),
    'SF-Pro-Display-Medium': require('./app/assets/fonts/SF-Pro-Display-Medium.ttf'),
    'SF-Pro-Display-Regular': require('./app/assets/fonts/SF-Pro-Display-Regular.ttf'),
    'SF-Pro-Display-Semibold': require('./app/assets/fonts/SF-Pro-Display-Semibold.ttf'),
    'SF-Pro-Display-Thin': require('./app/assets/fonts/SF-Pro-Display-Thin.ttf'),
    'SF-Pro-Display-Ultralight': require('./app/assets/fonts/SF-Pro-Display-Ultralight.ttf'),
    'sf-pro-text-bold': require('./app/assets/fonts/sf-pro-text-bold.ttf'),
    'sf-pro-text-heavy': require('./app/assets/fonts/sf-pro-text-heavy.ttf'),
    'sf-pro-text-light': require('./app/assets/fonts/sf-pro-text-light.ttf'),
    'sf-pro-text-medium': require('./app/assets/fonts/sf-pro-text-medium.ttf'),
    'sf-pro-text-semibol': require('./app/assets/fonts/sf-pro-text-semibold.ttf'),


    'Montserrat-Black': require('./app/assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-BlackItalic': require('./app/assets/fonts/Montserrat-BlackItalic.ttf'),
    'Montserrat-Bold': require('./app/assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-BoldItalic': require('./app/assets/fonts/Montserrat-BoldItalic.ttf'),
    'Montserrat-ExtraBold': require('./app/assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-ExtraBoldItalic': require('./app/assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
    'Montserrat-ExtraLight': require('./app/assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat-ExtraLightItalic': require('./app/assets/fonts/Montserrat-ExtraLightItalic.ttf'),
    'Montserrat-Italic': require('./app/assets/fonts/Montserrat-Italic.ttf'),
    'Montserrat-Light': require('./app/assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-LightItalic': require('./app/assets/fonts/Montserrat-LightItalic.ttf'),
    'Montserrat-Medium': require('./app/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-MediumItalic': require('./app/assets/fonts/Montserrat-MediumItalic.ttf'),
    'Montserrat-Regular': require('./app/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./app/assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-SemiBoldItalic': require('./app/assets/fonts/Montserrat-SemiBoldItalic.ttf'),
    'Montserrat-Thin': require('./app/assets/fonts/Montserrat-Thin.ttf'),
    'Montserrat-ThinItalic': require('./app/assets/fonts/Montserrat-ThinItalic.ttf'),
  })

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={colors.transparent} barStyle='light-content' />
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            <NavigationContainer>
              <MainAppNavigation />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
