import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../utils/Config';
import { colors, fontFamily, sizes } from '../utils/Theme';

const TrendingMoviesList = ({ data, setBackgroundImgIndex = () => { } }) => {

    const { navigate } = useNavigation();

    const onCardPress = (item) => {
        navigate('MovieDetailsScreen', { data: item });
    }

    const renderMovieCard = ({ item }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => onCardPress(item)}
        >
            <Image
                source={{ uri: image500(item.poster_path) }}
                style={{ width: sizes.width * 0.6, height: sizes.height * 0.45, borderRadius: 25 }}
            />
        </TouchableOpacity>
    )


    return (
        <View style={{ marginBottom: 32 }}>
            <Text style={{ color: colors.white, fontSize: 20, fontFamily: fontFamily['SF-Pro-Display-Regular'], marginBottom: 20, marginHorizontal: 16 }}>Trending</Text>
            <Carousel
                data={data}
                renderItem={renderMovieCard}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={sizes.width}
                itemWidth={sizes.width * 0.62}
                onScrollIndexChanged={(index) => { setBackgroundImgIndex(index) }}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    )
}

export default TrendingMoviesList;

const styles = StyleSheet.create({})