import {
  ActivityIndicator,
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {useWords} from '../hooks/useWords';
import {quitarAcentos} from '../logica/logicaJuego';
import {changeName, changeScore} from '../redux/slices/playerSlice';
import {useNavigation} from '@react-navigation/native';

export default function GameScreen() {
  const {name, score} = useAppSelector(state => state.player);
  const {currentWord, loadWord} = useWords();
  const [letra, setLetra] = useState('');
  const [listLetras, setListLetras] = useState<string[]>([]);
  const [wordDisplay, setWordDisplay] = useState('');
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (currentWord) {
      setWordDisplay(ocultarPalabra(currentWord.palabra, listLetras));
    }
  }, [currentWord, listLetras]);

  const validarLetra = (texto: string) => {
    const soloLetras = texto.replace(/[^a-zA-ZñÑ]/g, '').toUpperCase();
    setLetra(soloLetras.slice(0, 1));
  };

  const intentarLetra = () => {
    if (letra && !listLetras.includes(letra) && currentWord) {
      const nuevasLetras = [...listLetras, letra];
      setListLetras(nuevasLetras);

      const palabraSinAcentos = quitarAcentos(
        currentWord.palabra.toUpperCase(),
      );

      if (palabraSinAcentos.includes(letra)) {
        dispatch(changeScore({score: score + 10}));

        const letrasFaltantes = palabraSinAcentos
          .split('')
          .filter(l => !nuevasLetras.includes(l));

        if (letrasFaltantes.length === 0) {
          setTimeout(() => {
            Alert.alert(
              'Enhorabuena!!',
              'Palabra completada, a por la siguiente!!',
            );
            loadWord();
            setListLetras([]);
          }, 1000);
        }
      } else {
        setIntentosFallidos(intentosFallidos + 1);

        if (intentosFallidos >= 5) {
          setTimeout(() => {
            Alert.alert(
              '¡Perdiste!',
              `La palabra era: "${currentWord.palabra}"`,
            );
            setListLetras([]);
            setIntentosFallidos(0);
          }, 1000);
          navigation.navigate('Score');
        }
      }

      setLetra('');
    }
  };

  const ocultarPalabra = (word: string, letrasUsadas: string[]) => {
    return word
      .split('')
      .map(letra =>
        letrasUsadas.includes(quitarAcentos(letra.toUpperCase()))
          ? letra
          : ' _ ',
      )
      .join('');
  };

  const handleNext = () => {
    dispatch(changeName({name: ''}));
    Keyboard.dismiss();
    dispatch(changeScore({score: 0}));
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jugador: {name}</Text>
      <Text style={styles.subtitle}>Palabra:</Text>

      {currentWord ? (
        <Text style={styles.word}>{wordDisplay}</Text>
      ) : (
        <ActivityIndicator size="large" color="#A27B5C" />
      )}

      <TextInput
        style={styles.input}
        value={letra}
        onChangeText={validarLetra}
        maxLength={1}
        autoCapitalize="none"
        placeholderTextColor="#666"
        placeholder="?"
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Aceptar"
          onPress={intentarLetra}
          color="#A27B5C"
          disabled={!letra}
        />
        <Button title="Salir" onPress={handleNext} color="#A27B5C" />
      </View>

      <Text style={styles.subtitle}>Score: {score}</Text>
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
  input: {
    borderWidth: 2,
    borderColor: '#A27B5C',
    borderRadius: 8,
    padding: 15,
    width: 70,
    height: 70,
    textAlign: 'center',
    fontSize: 32,
    color: '#FFD700',
    marginVertical: 20,
    backgroundColor: '#353a45',
  },
  buttonContainer: {
    gap: 10,
    marginVertical: 10,
  },
});
