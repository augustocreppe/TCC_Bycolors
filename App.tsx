import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes/index.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, SourceSansPro_600SemiBold, SourceSansPro_400Regular, SourceSansPro_300Light } from '@expo-google-fonts/source-sans-pro';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    SourceSansPro_600SemiBold,
    SourceSansPro_400Regular,
    SourceSansPro_300Light
  });

  useEffect(() => {
    async function setLogged() {
      await AsyncStorage.setItem('@TCC_Bycolors:isLogged', ""+false);
    }
    
    setLogged();
  },[]);

  if(!fontsLoaded)
    return <AppLoading/>

  return (
    <Routes/>
  );
}