import React, { useState } from 'react';
import fonts from '../styles/fonts';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, Platform, ScrollView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Entypo, FontAwesome } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const fundo = require('../assets/fundo-comunidade.jpg');
const marca = require('../assets/marca.png');

export function CadastroComunidade() {
    const navigation = useNavigation();

    function handleLogin() {
        navigation.navigate('Inicio');
    }

    function handleRegister() {
       //navigation.navigate('');
    }

    return(
        <ImageBackground source={fundo} style={styles.fundo} resizeMode="cover">
            <View style={styles.container}>
                <View style={styles.content}>

                    <View style={styles.sizeMarca}>
                            <Image source={marca}  resizeMode="cover" style={styles.imageMarca}/>
                    </View>

                    <Text style={styles.title}>
                        Faça parte da comunidade!
                    </Text>

                    <TouchableOpacity onPress={handleLogin} style={styles.button2}>
                        <Feather name="log-in" style={styles.buttonIcon}/>
                        <Text style={styles.buttonText}>Fazer log-in</Text>
                    </TouchableOpacity>

                    <View style = {styles.textLine}/>

                    <Text style = {styles.textComplement}> Não possui uma conta? </Text>

                    <TouchableOpacity onPress={handleRegister} style={styles.button}>
                        <Feather name="user-plus" style={styles.buttonIcon}/>
                        <Text style={styles.buttonText}>Cadastrar-se</Text>
                    </TouchableOpacity>
 
                </View>
            </View>
        </ImageBackground>


    )
}    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    fundo:{
        flex: 1,
        height: '100%',

    },
    content: {
        marginTop: 230,
        margin: 30,
        flex: 0.69,
        borderColor: colors.branco,
        borderRadius: 20,
        backgroundColor: colors.branco,
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 25,
        marginTop: '7.5%',
        marginBottom: '3%',
        alignSelf: 'center'
    },

    sizeMarca: {
        alignItems: 'center',
        marginTop: '8.5%',
        marginBottom: '1%',
    },

    imageMarca: {
        height: 80,
        width: 250,
    },

    button: {
        flexDirection: 'row',
        backgroundColor: colors.laranja,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 5,
        marginBottom: '5%',
        marginHorizontal: '7%',
        height: 50,
        width: '86%',
    },
    button2: {
        flexDirection: 'row',
        backgroundColor: colors.body_dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 4,
        marginBottom: '2%',
        marginHorizontal: '7%',
        height: 50,
        width: '86%',
    },
    buttonIcon: {
        fontSize: 20,
        color: colors.branco,
        marginRight: 10
    },
    buttonText: {
        fontSize: 20,
        color: colors.branco,
        fontFamily: fonts.heading
    },
    textLine: {
        borderBottomColor: colors.preto,
        borderBottomWidth: 2,
        width: '86%',
        alignSelf: 'center',
        marginTop: '4%',
    },
    textComplement: {
        alignSelf: 'center',
        marginVertical: '2%',
        marginTop: '5%',
        marginBottom: '2.5%',
        fontFamily: fonts.heading,
        fontSize: 22,
        color: colors.preto
    },
});