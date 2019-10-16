import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  AsyncStorage,
  ScrollView
} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    getStoragedTechs();
  }, []);

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
    marginTop: 50
  }
});
