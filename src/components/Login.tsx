import React, {useState} from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import {useAppDispatch} from '../redux/hooks';
import {changeName} from '../redux/slices/playerSlice';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [Playername, setName] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handlePlay = () => {
    if (Playername.trim() === '') {
      Alert.alert('Error', 'Por favor, introduce un nombre antes de jugar.');
      return;
    }
    dispatch(changeName({name: Playername}));
    Keyboard.dismiss();
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Introduce tu nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={Playername}
        placeholder="Nombre del jugador"
        placeholderTextColor="#777"
        returnKeyType="done"
        onSubmitEditing={handlePlay}
      />
      <Button onPress={handlePlay} title="Jugar" color="#A27B5C" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  input: {
    backgroundColor: 'white',
    height: 45,
    width: '80%',
    borderWidth: 2,
    borderColor: '#A27B5C',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
});

export default Login;
