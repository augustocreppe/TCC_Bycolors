import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, SourceSansPro_600SemiBold, SourceSansPro_400Regular, SourceSansPro_300Light } from '@expo-google-fonts/source-sans-pro';
import Routes from './src/routes/index.';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    SourceSansPro_600SemiBold,
    SourceSansPro_400Regular,
    SourceSansPro_300Light
  });

  if(!fontsLoaded)
    return <AppLoading/>

  return (
    <Routes/>
  );
}