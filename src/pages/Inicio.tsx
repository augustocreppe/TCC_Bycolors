import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const fundo = require('../assets/fundo.jpg');
const logo = require('../assets/logo.png');

export function Inicio() {
    const navigation = useNavigation();

    function handleEnter() {
        navigation.navigate('Calendario');
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <ImageBackground 
            source={fundo} 
            style={styles.fundo}
            resizeMode="cover"
        >
            <View style={styles.viewLogo}>
                <View style={styles.sizeLogo}>
                <Image source={logo} style={styles.logo} resizeMode="cover"/>
                </View>
            </View>

            <View style={styles.buttonEntrarView}>
            <TouchableOpacity onPress={handleEnter} style={styles.buttonEntrar}>
                <Feather name="log-in" style={styles.buttonEntrarIcon}/>
                <Text style={styles.buttonEntrarText}>Entrar</Text>
            </TouchableOpacity>
            </View>
        </ImageBackground>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fundo: {
        flex: 1,
    },
    viewLogo: {
        width: 180,
        height: 180,
        backgroundColor: colors.branco,
        borderRadius: 100,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 4,
        borderColor: colors.cinza_claro,
        paddingTop: '2.5%',
        marginTop: '15%',
    },
    sizeLogo: {
        width: 137,
        height: 137,
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 137,
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonEntrarView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    buttonEntrar: {
        flexDirection: 'row',
        backgroundColor: colors.cinza_claro,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 65,
        width: 300
    },
    buttonEntrarIcon: {
        fontSize: 30,
        color: colors.body_dark,
        marginRight: 10
    },
    buttonEntrarText: {
        fontSize: 25,
    },
});
