import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Alert
} from 'react-native';
import socketio from 'socket.io-client';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    getBookingResponse();
  });

  useEffect(() => {
    getStoragedTechs();
  }, []);

  async function getBookingResponse() {
    const user_id = await AsyncStorage.getItem('user');
    const socket = socketio('http://192.168.100.13:3333', {
      query: { user_id }
    });
    socket.on('booking_response', booking => {
      Alert.alert(
        `Sua reserva em ${booking.spot.company} foi ${
          booking.approved ? 'Aprovada' : 'Rejeitada '
        }`
      );
    });
  }

  async function getStoragedTechs() {
    const storagedTechs = await AsyncStorage.getItem('techs');
    const techsArray = storagedTechs.split(',').map(tech => tech.trim());
    setTechs(techsArray);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList tech={tech} key={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  }
});
