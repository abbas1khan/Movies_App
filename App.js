import 'react-native-gesture-handler';
import { StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainAppNavigation from './app/navigation/MainAppNavigation';
import { useFonts } from 'expo-font';
import { colors } from './app/utils/Theme';


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
  })

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={colors.transparent} barStyle='light-content' />
      <SafeAreaProvider>
        <NavigationContainer>
          <MainAppNavigation />
        </NavigationContainer>
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
