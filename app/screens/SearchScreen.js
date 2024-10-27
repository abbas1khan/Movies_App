import React, { useCallback, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185, image342, searchMovies } from '../utils/Config'
import { debounce } from 'lodash'
import Loader from '../components/Loader'
import { colors, fontFamily, sizes } from '../utils/Theme'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchScreen = () => {

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([])
    const [searchText, setSearchText] = useState('');

    const navigation = useNavigation();

    const renderMovieCard = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => navigation.push('MovieDetailsScreen', { data: item })}>
            <View style={{ width: sizes.width * 0.44, margin: 8 }}>
                <Image
                    source={{ uri: image342(item.poster_path) || fallbackMoviePoster }}
                    style={{ width: sizes.width * 0.44, height: sizes.height * 0.32, borderRadius: 20 }}
                />
                <Text numberOfLines={1} style={{ color: colors.lightGray5, marginLeft: 4, marginTop: 3, fontSize: 15, fontFamily: fontFamily['SF-Pro-Display-Regular'] }}>
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    )

    const handleSearch = search => {
        if (search && search.length) {
            setLoading(true);
            searchMovies({
                query: search,
                include_adult: false,
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false);
                if (data && data.results) setResults(data.results);
            })
        } else {
            setLoading(false);
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 1), []);


    const onClear = () => {
        if (searchText?.trim()?.length) {
            setSearchText("")
        } else {
            navigation.navigate("HomeScreen")
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.primary, }}>

            <SafeAreaView style={{ flex: 1 }}>
                {/* search input */}
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.neutral500, borderRadius: 80, marginHorizontal: 16, marginBottom: 10, marginTop: 8 }}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            value={searchText}
                            autoFocus
                            onChangeText={(text) => { setSearchText(text); handleTextDebounce(text) }}
                            placeholder="Search Movie"
                            placeholderTextColor={'lightgray'}
                            style={{ fontSize: 15, paddingLeft: 24, fontFamily: fontFamily['SF-Pro-Display-Medium'], color: colors.white, letterSpacing: 0.3, paddingRight: 5 }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={onClear}
                        style={{ backgroundColor: colors.neutral500, padding: 10, borderRadius: 50, margin: 4 }}
                    >
                        <XMarkIcon size="25" color={colors.white} />
                    </TouchableOpacity>
                </View>

                {/* search results */}
                {
                    loading ?
                        <Loader />
                        :
                        results.length > 0 ?
                            <View style={{ paddingBottom: 72 }}>
                                <FlatList
                                    data={results}
                                    numColumns={2}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index}
                                    ListHeaderComponent={
                                        <Text style={{ color: colors.white, marginLeft: 10, fontFamily: fontFamily['SF-Pro-Display-Semibold'], letterSpacing: 0.5, marginBottom: 5, marginTop: 10 }}>
                                            Results({results.length})
                                        </Text>
                                    }
                                    renderItem={renderMovieCard}
                                    style={{ alignSelf: 'center' }}
                                />
                            </View>
                            :
                            <View>
                                <Image
                                    source={require('../assets/SearchScreen.png')}
                                    style={{ width: sizes.width + 40, height: sizes.width + 40, alignSelf: 'center', }}
                                />
                            </View>
                }
            </SafeAreaView>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({})