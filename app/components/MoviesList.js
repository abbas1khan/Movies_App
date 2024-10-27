import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185, image342 } from '../utils/Config';
import { colors, fontFamily, sizes } from '../utils/Theme';
import { FlatList } from 'react-native';

const MoviesLists = ({ title, hideSeeAll, data }) => {

    const navigation = useNavigation();

    const renderMovieCard = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => navigation.push('MovieDetailsScreen', { data: item })}
        >
            <View style={{ width: sizes.width * 0.33, paddingVertical: 4, marginRight: 16, }}>
                <Image
                    source={{ uri: image342(item.poster_path) || fallbackMoviePoster }}
                    style={{ width: sizes.width * 0.33, height: sizes.height * 0.22, borderRadius: 20 }}
                />
                <Text
                    numberOfLines={1}
                    style={{ color: colors.neutral300, marginTop: 2, marginLeft: 4, fontFamily: fontFamily['SF-Pro-Display-Regular'], }}
                >
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ marginBottom: 32, width: '100%' }}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                }}
            >
                <Text
                    style={{ color: colors.white, fontFamily: fontFamily['SF-Pro-Display-Regular'], fontSize: 18 }}
                >{title}</Text>
                {!hideSeeAll ?
                    <TouchableOpacity activeOpacity={1}>
                        <Text style={{ color: colors.secondary, fontSize: 15, fontFamily: fontFamily['SF-Pro-Display-Regular'], }}>See All</Text>
                    </TouchableOpacity>
                    : <></>
                }
            </View>

            <FlatList
                data={data}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                renderItem={renderMovieCard}
                style={{ paddingHorizontal: 16, marginTop: 8 }}
            />
        </View>
    )
}

export default MoviesLists

const styles = StyleSheet.create({})