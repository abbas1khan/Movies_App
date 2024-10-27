import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fontFamily, sizes } from '../utils/Theme';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500, imageOrg } from '../utils/Config';
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import CastsList from '../components/CastsList';
import MoviesLists from '../components/MoviesList';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MovieDetailsScreen = ({ route }) => {

    const { data } = route.params;


    const navigation = useNavigation();
    const [moviesListData, setMoviesListData] = useState({});
    const [castsData, setCastsData] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading, setLoading] = useState(false);


    const safeAreaInsets = useSafeAreaInsets()


    const getMovieDetials = async id => {
        const dataa = await fetchMovieDetails(id);
        if (dataa) {
            setMoviesListData({ ...data, ...dataa });
        }
    }
    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        if (data && data.cast) {
            setCastsData(data.cast);
        }
    }
    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        if (data && data.results) {
            setSimilarMovies(data.results);
        }
    }

    useEffect(() => {
        setLoading(true);
        getMovieDetials(data.id);
        getMovieCredits(data.id);
        getSimilarMovies(data.id);
    }, [data]);


    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.primary }} style={{ backgroundColor: colors.primary }}>
            <View style={styles.mainContainerView}>

                {/* Top Nav Bar */}
                <View style={{ width: sizes.width, position: 'absolute', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, justifyContent: 'space-between', top: safeAreaInsets.top + 6, alignSelf: 'center', zIndex: 1 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.secondary, padding: 4, borderRadius: 8 }}
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPressIn={() => toggleFavourite(!isFavourite)}
                    >
                        <HeartIcon size="35" color={isFavourite ? 'red' : 'white'} />
                    </TouchableOpacity>
                </View>

                {/* Movie Image with gradient */}
                <View>
                    <Image
                        source={{ uri: imageOrg(data.poster_path) || fallbackMoviePoster }}
                        style={{ width: sizes.width, height: sizes.height * 0.65 }}
                    />
                    <LinearGradient
                        colors={[colors.transparent, colors.darkgray2, colors.primary]}
                        style={{ width: sizes.width, height: sizes.height * 0.3, position: 'absolute', bottom: 0, alignSelf: 'center', zIndex: 1 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    />
                </View>

                {/* movie details */}
                <View style={{ marginTop: -(sizes.height * 0.09), zIndex: 1 }}>

                    {/* title */}
                    <Text style={{ color: colors.white, fontSize: 28, fontFamily: fontFamily['SF-Pro-Display-Bold'], textAlign: 'center', letterSpacing: 0.2 }}>
                        {data?.title}
                    </Text>

                    {/* status, release year, runtime */}
                    {data?.id ?
                        <Text style={{ color: colors.neutral400, fontFamily: fontFamily['SF-Pro-Display-Semibold'], textAlign: 'center', marginVertical: 8 }}>
                            {data?.release_date || 'N/A'}
                        </Text>
                        : null
                    }

                    {/* description */}
                    <Text style={{ color: colors.neutral400, marginHorizontal: 16, fontFamily: fontFamily['SF-Pro-Display-Regular'], letterSpacing: 0.05 }}>
                        {data?.overview}
                    </Text>

                    {/* CastsList */}
                    {data?.id && castsData.length > 0 && <CastsList data={castsData} />}

                    {/* MoviesLists */}
                    {data?.id && similarMovies.length > 0 && <MoviesLists title='Similar Movies' data={similarMovies} hideSeeAll={true} />}

                </View>
            </View>
        </ScrollView>
    )
}

export default MovieDetailsScreen

const styles = StyleSheet.create({
    mainContainerView: {
        flex: 1,
        backgroundColor: colors.primary,
    },
})