import { StyleSheet, Text, View } from 'react-native'

import React from 'react'

const Card = (props) => {
    return (
        <View style={{...styles.cardContainer, ...props.style}}>
            {props.children}
        </View>
    )
}
const styles = StyleSheet.create({
    cardContainer: {
        shadowColor: 'black',
        shadowOffset:
        {
            width:0,
            height:2
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    }
})

export default Card
