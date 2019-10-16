import React, { useState } from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  AsyncStorage,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Book({ navigation }) {
  const [date, setDate] = useState('');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');
    const spot_id = await navigation.getParam('id');

    await api.post(
      `/spots/${spot_id}/bookings`,
      {
        date
      },
      {
        headers: { user_id }
      }
    );

    Alert.alert('Solicitação de reserva enviada.');

    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.label}>DATA DE INTERESSE * </Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você deseja reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Solicitar Reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 3
  },

  label: {
    marginTop: 60,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5
  },

  button: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f05a5b',
    borderRadius: 4,
    marginTop: 15
  },

  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 15
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  }
});
