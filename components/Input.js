import { StyleSheet, Text, TextInput, View } from 'react-native'

import React from 'react'

const Input = ({ style= {}, ...props}) => {
    return (
    <TextInput 
        style={{...styles.input , ...style}} 
        {...props} 
    />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10,
    }
})
export default Input
