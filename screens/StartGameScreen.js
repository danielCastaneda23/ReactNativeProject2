import { Button, Dimensions, InputText, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'

import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'

const StartGameScreen = ({ onStartGame, onGameOver }) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [confirmedValue, setConfirmedValue] = useState('')

    const handleInputNumber = text => {
        setEnteredValue(text.replace(/[^0-9]/g, "")); //EXPRESIONES REGULARES
    }
    const handleResetInput = () => {
        setEnteredValue('');
        setConfirmed(false);
        setConfirmedValue('');
    }
    const handleConfirmInput = () => {
        const inputNumber = parseInt(enteredValue);
        if (inputNumber === NaN || inputNumber <= 0 || inputNumber > 99) return
        setConfirmed(true);
        setConfirmedValue(inputNumber);
        setEnteredValue('');
    }

    const handleStartGame = () => {
        onStartGame(confirmedValue)
    }

    let confirmedOutput = null;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>Tu seleccion</Text>
                <NumberContainer>{confirmedValue}</NumberContainer>
                <Button title="Empezar Juego" color={Colors.primary} onPress={handleStartGame} />
            </Card>
        )
    }
    return (
        
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS=== 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={30} style={styles.screen}>
                   
                    <Text style={styles.title}>StartGameScreen</Text>
                    
                    <Card style={styles.inputContainer}>
                        <Text> Elija El Numero</Text>
                        <Input
                            blurOnSubmit
                            autoCapitalization={false}
                            autoCorrect={false}
                            keyboardType='numeric'
                            maxLength={2}
                            onChangeText={handleInputNumber}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Limpiar" onPress={handleResetInput} color={Colors.accent} />
                            <Button title="Confirmar" onPress={handleConfirmInput} color={Colors.accent} />
                        </View>
                    </Card>
                   
                    {confirmedOutput}
                    </KeyboardAvoidingView>
                    </ScrollView>
            </TouchableWithoutFeedback>



    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        padding: 20,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 20,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    button: {
        width: Dimensions.get('window').width / 3,
    },
    summaryContainer: {
        marginTop: 20
    }
})

export default StartGameScreen
