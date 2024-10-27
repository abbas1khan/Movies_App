import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../utils/Config';
import MoviesLists from '../components/MoviesList';
import { StyleSheet } from 'react-native';
import { colors, fontFamily, sizes } from '../utils/Theme';
import Loader from '../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';

const PersonDetailsScreen = ({ route }) => {

    const { data } = route.params;

    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);


    const getPersonDetailsData = async id => {
        const data = await fetchPersonDetails(id);
        if (data) {
            setPerson(data);
        }
    }

    const getPersonMoviesMovies = async id => {
        const data = await fetchPersonMovies(id);
        if (data && data.cast) {
            setPersonMovies(data.cast);
        }
        setLoading(false);
    }


    useEffect(() => {
        setLoading(true);
        getPersonDetailsData(data.id);
        getPersonMoviesMovies(data.id);
    }, [data]);


    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.primary }} style={{ backgroundColor: colors.primary, paddingBottom: 20 }}>
            <SafeAreaView style={{ flex: 1 }}>
                {/* back button */}
                <View style={{ marginHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color={colors.white} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPressIn={() => toggleFavourite(!isFavourite)}
                    >
                        <HeartIcon size="35" color={isFavourite ? 'red' : colors.white} />
                    </TouchableOpacity>
                </View>

                {/* person details */}
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <View>
                            <View
                                style={{
                                    alignSelf: 'center',
                                    shadowColor: 'gray',
                                    shadowRadius: 40,
                                    shadowOffset: { width: 0, height: 5 },
                                    shadowOpacity: 1,
                                }}
                            >
                                <View style={{ height: sizes.width / 1.27, width: sizes.width / 1.27, borderRadius: sizes.width / 1.25, overflow: 'hidden', borderWidth: 2, borderColor: colors.neutral500 }}>
                                    <Image
                                        source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                                        style={{ flex: 1 }}
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: 24 }}>
                                <Text style={{ fontSize: 28, color: colors.white, fontFamily: fontFamily['SF-Pro-Display-Bold'], textAlign: 'center' }}>
                                    {person?.name}
                                </Text>
                                <Text style={{ color: colors.neutral500, textAlign: 'center', fontFamily: fontFamily['SF-Pro-Display-Regular'], }}>
                                    {person?.place_of_birth}
                                </Text>
                            </View>

                            <View style={{ marginHorizontal: 16, padding: 16, marginTop: 24, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.neutral700, alignItems: 'center', borderRadius: 120 }}>
                                <View style={styles.personDetailsView}>
                                    <Text style={styles.personDetailsTopText}>
                                        Gender
                                    </Text>
                                    <Text style={styles.personDetailsBtmText}>
                                        {person?.gender == 1 ? 'Female' : 'Male'}
                                    </Text>
                                </View>
                                <View style={styles.personDetailsView}>
                                    <Text style={styles.personDetailsTopText}>
                                        Birthday
                                    </Text>
                                    <Text style={styles.personDetailsBtmText}>
                                        {person?.birthday}
                                    </Text>
                                </View>
                                <View style={styles.personDetailsView}>
                                    <Text style={styles.personDetailsTopText}>
                                        known for
                                    </Text>
                                    <Text style={styles.personDetailsBtmText}>
                                        {person?.known_for_department}
                                    </Text>
                                </View>
                                <View style={{ paddingHorizontal: 8, alignItems: 'center', }}>
                                    <Text style={styles.personDetailsTopText}>
                                        Popularity
                                    </Text>
                                    <Text style={styles.personDetailsBtmText}>
                                        {person?.popularity?.toFixed(2)} %
                                    </Text>
                                </View>
                            </View>

                            <View style={{ marginVertical: 24, marginHorizontal: 16 }}>
                                <Text style={{ fontSize: 18, color: colors.white, fontFamily: fontFamily['SF-Pro-Display-Regular'] }}>
                                    Biography
                                </Text>
                                <Text style={{ color: colors.neutral400, fontFamily: fontFamily['SF-Pro-Display-Regular'] }} className="text-neutral-400 tracking-wide">
                                    {person?.biography ? person.biography : 'N/A'}
                                </Text>
                            </View>

                            {/* person movies */}
                            {person?.id && personMovies.length > 0 ? <MoviesLists title="Movies" hideSeeAll={true} data={personMovies} /> : <></>}

                        </View>
                    )
                }
            </SafeAreaView>
        </ScrollView>
    )
}

export default PersonDetailsScreen

const styles = StyleSheet.create({
    personDetailsView: {
        borderRightWidth: 2,
        borderColor: colors.neutral400,
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    personDetailsTopText: {
        color: colors.white,
        fontSize: sizes.width / 27.6,
        fontFamily: fontFamily['SF-Pro-Display-Semibold']
    },
    personDetailsBtmText: {
        fontSize: sizes.width / 27.6,
        color: colors.neutral300,
        fontFamily: fontFamily['SF-Pro-Display-Regular'],
    },
})