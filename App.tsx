import * as Font from 'expo-font'

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import  AppLoading  from 'expo-app-loading'
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState('')
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded] = Font.useFonts({
  'open-sans1' : require('./assets/fonts/OpenSans-BoldItalic.ttf')
  })

  if (!dataLoaded) {<AppLoading />}

  const handleGameOver = (rounds: number) => {
    setGuessRounds(rounds);
  }

  const handleRestart = () => {
    setUserNumber('');
    setGuessRounds(0);
  }

  const handleStartGame = () =>{
    setUserNumber;
    setGuessRounds(0)
  }

  let content = <StartGameScreen onStartGame={setUserNumber} onGameOver= {()=> {}} />
  if (userNumber && guessRounds <=0){
    content= <GameScreen  onGameOver = {handleGameOver} onEndGame= {setUserNumber} userOption ={userNumber}/>
  }else if ( guessRounds >0)
  {
    content = <GameOverScreen rounds={guessRounds} choice= {userNumber} onRestart={handleRestart}/>    
  }
  return (
    <View style={styles.container}>
        <Header title={'Adivina El Numero'} />
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'open-sans1'
  },
});
