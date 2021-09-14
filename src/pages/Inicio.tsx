import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fonts from '../styles/fonts';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, Platform, ScrollView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Entypo, FontAwesome } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const fundo = require('../assets/fundo.jpg');
const logo = require('../assets/logo.png');
const marca = require('../assets/marca.png');

export function Inicio() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [email, setEmail] = useState<string>();
    const navigation = useNavigation();

    function handleEnter() {
        navigation.navigate('Calendario');
    }

    function handleRegister() {
        navigation.navigate('CadastroComunidade');
    }

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!email);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value: string){
        setIsFilled(!!value);
        setEmail(value);
    }

    async function handleSubmit(){
        if(!email)
            return Alert.alert('Por favor, digite seu e-mail.');

        try {
            await AsyncStorage.setItem('@TCC_Bycolors:user', email);
            navigation.navigate('Calendario');
        }
        catch {
            Alert.alert('Não foi possível salvar o seu e-mail.')
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView>
        <ImageBackground source={fundo} style={styles.fundo} resizeMode="cover">
            <View style={styles.container}>

                <View style={styles.viewLogo}>
                    <View style={styles.sizeLogo}>
                    <Image source={logo} style={styles.logo} resizeMode="cover"/>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.content}>

                        <View style={styles.sizeMarca}>
                            <Image source={marca}  resizeMode="cover" style={styles.imageMarca}/>
                        </View>

                        <Text style={styles.text}>
                            <Entypo name="mail" style={styles.icon}/>
                            {' '}E-mail
                        </Text>
                                    
                        <TextInput
                            style={[
                                styles.input, 
                                (isFocused || isFilled) &&
                                { borderColor: colors.azul_escuro }
                            ]}
                            placeholder="Ex: joao@gmail.com"
                            
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />

                        <Text style={styles.text}>
                            <FontAwesome name="lock" style={styles.icon} />
                            {' '}Senha
                        </Text>

                        <TextInput
                            style={[
                                styles.input, 
                                (isFocused || isFilled) &&
                                { borderColor: colors.azul_escuro }
                            ]}
                            placeholder="••••••"

                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />

                        <TouchableOpacity>
                            <Text style={styles.complement}>
                                Esqueci minha senha
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Feather name="log-in" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>

                        <View style = {styles.textLine}/>

                        <Text style = {styles.textOu}> ou </Text>

                        <TouchableOpacity onPress={handleRegister} style={styles.button2}>
                            <Feather name="user-plus" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Cadastrar-se</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleEnter} style={styles.button3}>
                            <Feather name="user-x" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Entrar sem logar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                
            </View>
        </ImageBackground>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    fundo: {
        flex: 1,
        height: '100%',

    },
    viewLogo: {
        width: 160,
        height: 160,
        backgroundColor: colors.branco,
        borderRadius: 100,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 4,
        borderColor: colors.cinza_claro,
        paddingTop: '3%',
        marginTop: '10%',
    },
    sizeLogo: {
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 114,
    },
    sizeMarca: {
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '1%',
    },
    imageMarca: {
        height: 101,
        width: 300,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.cinza_claro,
        color: colors.heading,
        height: '9%',
        width: '86%',
        fontSize: 18,
        marginTop: 5,
        marginHorizontal: 25,
        padding: 10,
        textAlign: 'justify',
    },
    complement: {
        fontFamily: fonts.heading,
        color: colors.body_dark,
        fontSize: 12,
        marginLeft: 205,
        marginTop: '1.5%',
        marginBottom: '4%',
    },
    content: {
        margin: 30,
        flex: 1,
        borderColor: colors.branco,
        borderRadius: 20,
        backgroundColor: colors.branco,
    },
    text: {
        fontFamily: fonts.heading,
        fontSize: 20,
        marginHorizontal: 25,
        marginTop: '5%',
    },
    icon: {
        fontSize: 18,
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: colors.body_dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 6,
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
        marginTop: 5,
        marginBottom: '5%',
        marginHorizontal: '7%',
        height: 50,
        width: '86%',
    },
    button3: {
        flexDirection: 'row',
        backgroundColor: colors.body_dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 5,
        marginBottom: '10%',
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
    textOu: {
        alignSelf: 'center',
        marginVertical: '2%',
        fontFamily: fonts.heading,
        fontSize: 21,
        color: colors.preto
    },
});

//<KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
//<TouchableWithoutFeedback onPress={Keyboard.dismiss}>