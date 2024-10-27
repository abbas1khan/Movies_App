import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fallbackPersonImage, image185 } from '../utils/Config';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { colors, fontFamily } from '../utils/Theme';


const CastsList = ({ data }) => {

    const navigation = useNavigation();

    const renderPersonCard = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            onPress={() => navigation.push('PersonDetailsScreen', { data: item })}
            style={{ width: 80, alignItems: 'center', marginRight: 16 }}
        >
            <View style={{ height: 80, width: 80, borderRadius: 80, borderWidth: 2, borderColor: colors.neutral500, alignItems: 'center', overflow: 'hidden' }}>
                <Image
                    style={{ width: 80, height: 96, borderRadius: 16 }}
                    source={{ uri: image185(item?.profile_path) || fallbackPersonImage }}
                />
            </View>

            <Text numberOfLines={1} style={{ fontSize: 12, color: colors.white, fontFamily: fontFamily['SF-Pro-Display-Regular'], marginTop: 4 }}>
                {item?.character}
            </Text>

            <View style={{}}>
                <Text numberOfLines={1} style={{ fontSize: 12, color: colors.neutral400, fontFamily: fontFamily['SF-Pro-Display-Regular'], }}>
                    {item?.original_name.length > 10 ? item.original_name.slice(0, 10) + '...' : item?.original_name}
                </Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ marginVertical: 24 }}>
            <Text style={{ fontSize: 18, color: colors.white, fontFamily: fontFamily['SF-Pro-Display-Regular'], marginHorizontal: 16, marginBottom: 20 }}>
                Top Cast
            </Text>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                renderItem={renderPersonCard}
                style={{ paddingHorizontal: 16 }}
            />
        </View>
    )
}

export default CastsList

const styles = StyleSheet.create({})