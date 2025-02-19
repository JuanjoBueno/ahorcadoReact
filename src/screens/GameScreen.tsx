import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {useWords} from '../hooks/useWords';
import {ocultarWord, quitarAcentos} from '../logica/logicaJuego';
import {useNavigation} from '@react-navigation/native';
import {changeScore} from '../redux/slices/playerSlice';

export default function GameScreen() {
  const {name, score} = useAppSelector(state => state.player);
  const {currentWord, loadWord} = useWords();
  const [currentScore, setCurrentScore] = useState(0);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const actualizarScore = () => {
    dispatch(changeScore({score: currentScore}));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jugador: {name}</Text>
      <Text style={styles.subtitle}></Text>
      {currentWord ? (
        <Text style={styles.word}>{quitarAcentos(currentWord.palabra)}</Text>
      ) : (
        <ActivityIndicator size="large" color="#A27B5C" />
      )}
      <Button title="Obtener otra palabra" onPress={loadWord} color="#A27B5C" />
      //<Text style={styles.title}>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282C34',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#A27B5C',
  },
  word: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFD700',
    marginVertical: 10,
  },
  loading: {
    fontSize: 18,
    color: 'white',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});
