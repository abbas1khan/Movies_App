import React from 'react'
import { StyleSheet, View } from 'react-native'
import * as Progress from 'react-native-progress';
import { colors, sizes } from '../utils/Theme';

const Loader = () => {
    return (
        <View style={styles.containerView}>
            <Progress.CircleSnail thickness={12} size={160} color={colors.secondary} />
        </View>
    )
}

export default Loader;

const styles = StyleSheet.create({
    containerView: {
        width: sizes.width,
        height: sizes.height,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
})