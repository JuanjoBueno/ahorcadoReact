import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {useWords} from '../hooks/useWords';
import {mostrarWord, quitarAcentos} from '../logica/logicaJuego';
import {useNavigation} from '@react-navigation/native';
import {changeScore} from '../redux/slices/playerSlice';

export default function GameScreen() {
  const {name, score} = useAppSelector(state => state.player);
  const {currentWord, loadWord} = useWords();
  const [letra, setLetra] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [listLetras, setListLetras] = useState<string[]>([]);

  const validarLetra = (texto: string) => {
    // Solo acepta letras (mayúsculas o minúsculas) y solo toma el primer carácter
    const soloLetras = texto.replace(/[^a-zA-ZñÑ]/g, '').toUpperCase();
    setLetra(soloLetras.slice(0, 1));
  };
  const intentarLetra = () => {
    if (letra && !listLetras.includes(letra) && currentWord) {
      // Creamos la nueva lista de letras con la letra actual
      const nuevasLetras = [...listLetras, letra];
      // Actualizamos el estado con la nueva lista
      setListLetras(nuevasLetras);

      // Verificar si la letra está en la palabra (ignorando acentos)
      const palabraSinAcentos = quitarAcentos(
        currentWord.palabra.toUpperCase(),
      );
      if (palabraSinAcentos.includes(letra)) {
        // Calcular y actualizar score
        const nuevoScore = score + 10;
        dispatch(changeScore({score: nuevoScore}));

        // Verificar si la palabra está completa usando nuevasLetras
        const letrasFaltantes = palabraSinAcentos
          .split('')
          .filter(l => !nuevasLetras.includes(l));

        if (letrasFaltantes.length === 0) {
          // La palabra está completa
          setTimeout(loadWord, 1000);
          setListLetras([]); // Limpiar las letras para la siguiente palabra
        }
      }

      // Limpiar el input
      setLetra('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jugador: {name}</Text>
      {currentWord ? (
        <Text style={styles.word}>
          {mostrarWord(currentWord.palabra, listLetras)}
        </Text>
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
          title="Intentar"
          onPress={() => {
            intentarLetra();
          }}
          color="#A27B5C"
          disabled={!letra}
        />
        <Button
          title="Obtener otra palabra"
          onPress={loadWord}
          color="#A27B5C"
        />
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
  loading: {
    fontSize: 18,
    color: 'white',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
  // Nuevo estilo para el input
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
  // Estilo para separar los botones
  buttonContainer: {
    gap: 10,
    marginVertical: 10,
  },
});
