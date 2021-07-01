import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Card from '../components/Card'

const GameOverScreen = props => {
    const [isPortrait, setIsPortrait] = useState(true)

    const onPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width
    }
    const stateProtrait = () => setIsPortrait(onPortrait())
    useEffect(() => {
        console.log(isPortrait)
        Dimensions.addEventListener('change', stateProtrait)
        return () => {
            Dimensions.removeEventListener('change', stateProtrait)
        }
    })
    return (
        <View style={ isPortrait ? styles.screen : styles.screenLandsScape}>
            <Image style={ isPortrait ? styles.image: styles.imageId} source={require('../assets/images/descarga.png')} />
            <Card style = {styles.resultContainer}>
                <Text>Intentos: {props.rounds}</Text>
                <Text>El numero era: {props.choice}</Text>
            </Card>
            <Button title='NUEVO JUEGO' onPress={props.onRestart} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenLandsScape: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultContainer: {
        marginBottom: 30,
        padding: 20,
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    image: {
        width: '80%',
        height: 100,
    },
    imageId : {
        width: '30%',
        height: 120,
    }

})
export default GameOverScreen
