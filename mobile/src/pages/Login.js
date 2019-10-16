import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    verifyUserLogged();
  }, []);
  
  async function verifyUserLogged() {
    const user = await AsyncStorage.getItem('user');
    if (user) navigation.navigate('List');
  }

  async function handleSubmit() {
    try {
      const response = await api.post('/sessions', {
        email
      });

      const { _id } = response.data;

      await AsyncStorage.setItem('user', _id);
      await AsyncStorage.setItem('techs', techs);

      navigation.navigate('List');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>SEU EMAIL * </Text>
        <TextInput
          style={styles.input}
          placeholder="Seu email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Encontrar Spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30
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
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5
  },

  button: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f05a5b'
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  }
});
