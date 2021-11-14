import React from 'react';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes/index.';
import { useFonts, SourceSansPro_600SemiBold, SourceSansPro_400Regular, SourceSansPro_300Light } from '@expo-google-fonts/source-sans-pro';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    SourceSansPro_600SemiBold,
    SourceSansPro_400Regular,
    SourceSansPro_300Light
  });

  if(!fontsLoaded)
    return <AppLoading/>

  return (
    <MenuProvider>
      <Routes/>
    </MenuProvider>
  );
}