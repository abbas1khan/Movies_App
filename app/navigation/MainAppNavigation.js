import React, { useEffect } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import PersonDetailsScreen from '../screens/PersonDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import { colors, isAndroid } from '../utils/Theme';
import { changeNavigationColor } from '../utils/Helper';

const Stack = createStackNavigator();

const MainAppNavigation = () => {
    useEffect(() => {
        changeNavigationColor(colors.primary)
    }, [])
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                ...(isAndroid && { ...TransitionPresets.SlideFromRightIOS })
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} />
            <Stack.Screen name="PersonDetailsScreen" component={PersonDetailsScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    )
}

export default MainAppNavigation