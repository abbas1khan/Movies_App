import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies, image500 } from '../utils/Config'
import { colors, fontFamily, sizes } from '../utils/Theme'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TrendingMoviesList from '../components/TrendingMoviesList'
import MoviesLists from '../components/MoviesList'
import Loader from '../components/Loader'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {

    const { navigate } = useNavigation()

    const [loading, setLoading] = useState(true)
    const [trendingData, setTrendingData] = useState([])
    const [upcomingData, setUpcomingData] = useState([])
    const [topRatedData, setTopRatedData] = useState([])
    const [backgroundImgIndex, setBackgroundImgIndex] = useState(1)

    const getTrendingMoviesData = async () => {
        const data = await fetchTrendingMovies()
        if (data && data.results) setTrendingData(data.results);
    }

    const getUpcomingMoviesData = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) setUpcomingData(data.results);
    }

    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results) setTopRatedData(data.results);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true)
        getTrendingMoviesData()
        getUpcomingMoviesData()
        getTopRatedMovies()
    }, [])

    return (
        <View style={styles.mainContainerView}>

            {/* {trendingData?.length > 0 ?
                <ImageBackground
                    source={{ uri: image500(trendingData[backgroundImgIndex]?.poster_path) }}
                    style={{ width: sizes.width, height: "100%", opacity: 0.3, position: 'absolute', alignSelf: 'center' }}
                    blurRadius={5}
                >
                </ImageBackground>
                : <></>
            } */}

            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {/* Header bar of icons and logo */}
                    <View style={styles.HeaderBarView}>
                        <Bars3CenterLeftIcon size={30} strokeWidth={2} color={colors.white} />
                        <Text style={{ fontSize: 28, color: colors.white, fontFamily: fontFamily['SF-Pro-Display-Semibold'] }}>
                            <Text style={{ color: colors.secondary }}>M</Text>ovies
                        </Text>
                        <TouchableOpacity
                            hitSlop={{ top: 15, right: 15, left: 15, bottom: 15 }}
                            onPress={() => navigate('SearchScreen')}>
                            <MagnifyingGlassIcon size={26} strokeWidth={2} color="white" />
                        </TouchableOpacity>
                    </View>

                    {loading ?
                        <Loader />
                        :
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

                            {trendingData.length > 0 && <TrendingMoviesList data={trendingData} />}

                            {upcomingData.length > 0 && <MoviesLists data={upcomingData} title="Upcoming" />}

                            {topRatedData.length > 0 && <MoviesLists data={topRatedData} title="Top Rated" />}

                        </ScrollView>
                    }
                </View>
            </SafeAreaView>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainerView: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    HeaderBarView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
        paddingTop: 5,
    },
})
