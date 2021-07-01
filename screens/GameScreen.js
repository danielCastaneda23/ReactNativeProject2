import { Alert, Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Card from '../components/Card'
import Colors from '../constants/colors'
import NumberContainer from '../components/NumberContainer'
import { useRef } from 'react'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const random = Math.floor(Math.random() * (max - min) + min)
    if (random === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return random
    }
}

const GameScreen = ({ onEndGame, userOption, onGameOver }) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userOption))
    const [rounds, setRounds] = useState(0);
    const currenLow = useRef(1)
    const currentHigh = useRef(100)

    const handleEndGame = () => {
        onEndGame(0)
    }

    const handleNextGuess = direction => {
        if (
            (direction === 'lower' && currentGuess < userOption) ||
            (direction === 'greater' && currentGuess > userOption)
            ) {
            Alert.alert('No mientas', 'Tu sabes que no es verdad..!',
                [{
                    text: 'Disculpa',
                    style: 'cancel'
                }]
            )
            return
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }else {
            currenLow.current = currentGuess
        }

        const nextNumber = generateRandomBetween(currenLow.current, currentHigh.current,currentGuess )
        setCurrentGuess(nextNumber);
        setRounds((round) => round + 1)
    }
    useEffect(() => {
        if (currentGuess === userOption) onGameOver(rounds)
    }, [currentGuess, userOption, onGameOver]);


    return (
        <View style={styles.screen}>
            <Text>La suposicion del oponente</Text>
            <NumberContainer> {currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="Menor" onPress={handleNextGuess.bind(this, 'lower')} />
                <Button title="Mayor" onPress={handleNextGuess.bind(this, 'greater')} />
            </Card>
            <Button title='Terminar Juego' onPress={handleEndGame}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        width: 300,
        maxWidth: '80%',
        marginBottom: 10,
        padding: Dimensions.get('window').height > 600 ? 20 : 10,
    }
})
export default GameScreen
