import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AppText = ({ children, style }) => {
    return (
        <Text style={style}>
            {children}
        </Text>
    )
}

export default AppText

const styles = StyleSheet.create({})