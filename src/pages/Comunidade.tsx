import React, { useEffect, useState } from 'react';
import TabMenu from '../components/TabMenu';
import fonts from '../styles/fonts';
import { ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { AddFile } from '../components/AddFile';
import { ScrollView } from 'react-native-gesture-handler';
import { Post } from '../components/Post';
import { TituloComunidade } from '../components/TituloComunidade';
import { ButtonComunidade } from '../components/ButtonComunidade';
import { constants } from '../config/app.config';
import { isLogado } from '../libs/storage';

const fundo = require('../assets/fundo-comunidade.jpg');
const marca = require('../assets/marca.png');

export function Comunidade() {
    const navigation = useNavigation();
    const [isLogged, setIsLogged] = useState<any>();

    const [ dados, setDados ] = useState<any>([]);

    useEffect(() => {
        async function getData() {
            setIsLogged(await isLogado());
        }
        
        getData();
    },[]);

    function carregaApi() {
        fetch(`${constants.API_URL}/usuarios`)
        .then( res => res.json )
        .then( res => {
            setDados(res);
        })
        .catch(error => {
            Alert.alert('Erro ao carregar dados!', error);
        });
    }

    function handleGoBack() {
        navigation.navigate('MenuLateral');
    }

    function handleLogin() {
        navigation.navigate('Inicio');
    }

    function handleRegister() {
       navigation.navigate('CadastroUsuario');
    }

    return (
        <>
            {
                (isLogged == 'false') &&

                <ImageBackground source={fundo} style={styles.telaFundo} resizeMode="cover">
                    <View style={styles.container}>
                        <View style={styles.telaContainer}>
                            <View style={styles.telaContent}>
                                <View style={styles.telaSizeMarca}>
                                    <Image source={marca}  resizeMode="cover" style={styles.telaImageMarca}/>
                                </View>

                                <Text style={styles.telaTitle}>
                                    Faça parte da comunidade!
                                </Text>

                                <TouchableOpacity onPress={handleLogin} style={styles.telaButton2}>
                                    <Feather name="log-in" style={styles.telaButtonIcon}/>
                                    <Text style={styles.telaButtonText}>Faça login</Text>
                                </TouchableOpacity>

                                <View style = {styles.telaTextLine}/>

                                <Text style = {styles.telaTextComplement}> Não possui uma conta? </Text>

                                <TouchableOpacity onPress={handleRegister} style={styles.telaButton}>
                                    <Feather name="user-plus" style={styles.telaButtonIcon}/>
                                    <Text style={styles.telaButtonText}>Cadastre-se</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TabMenu/>
                    </View>
                </ImageBackground>
            }
            {
                (isLogged == 'true') &&

                <SafeAreaView style={styles.container}>
                    <View style={styles.container}>
                        <View style={styles.topView}>
                            <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                                <Feather name="menu" style={styles.buttonMenuIcon}/>
                            </TouchableOpacity>

                            <AddFile idMes={0}/>
                        </View>

                        <View style={styles.feedView}>
                        <ScrollView>
                            <View style={styles.buttonsView}>
                                <ButtonComunidade title={"Grupos"} icone={'users'}/>
                                <View style={styles.buttonCenterView}>
                                    <ButtonComunidade title={"Conversas"} icone={'comments'}/>
                                </View>
                                <ButtonComunidade title={"Meu Perfil"} icone={'id-card'}/>
                            </View>

                            <View style={styles.tituloView}>
                                <TituloComunidade idMes={0} text={"Principais Publicações"}/>
                            </View>

                            <View style={styles.postsView}>

                                {/* {
                                    dados.forEach(dado => {
                                        <Post nome={dado.id} idMes={10}/>
                                    })

                                } */}

                                <Post idMes={10}/>
                                <Post idMes={9}/>
                                <Post idMes={11}/>
                            </View>
                        </ScrollView>
                        </View>

                        <TabMenu/>   
                    </View>
                </SafeAreaView>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    topView: {
        flexDirection: 'row',
    },
    buttonMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 15,
        height: 56,
        width: 56,
    },
    buttonMenuIcon: {
        fontSize: 40,
        color: colors.body_dark,
    },
    buttonAdd: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: '65%',
        height: 56,
        width: 56,
    },
    buttonAddIcon: {
        fontSize: 40,
        color: colors.body_dark,
    },
    feedView: {
        width: '100%',
        alignContent: 'center',
        height: 630,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonsView: {
        width: '88%',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    buttons: {
        marginRight: 25,
    },
    tituloView: {
        width: '100%',
    },
    postsView: {
        width: '100%',
        alignItems: 'center',
    },
    buttonCenterView: {
        marginHorizontal: '8.6%',  
    },
    telaFundo:{
        flex: 1,
        height: '100%',
    },
    telaContainer: {
        width:  '100%',
        height: '90%',
        paddingTop: '30%',
    },
    telaContent: {
        marginTop: '10%',
        height: 410,
        margin: 30,
        borderRadius: 20,
        backgroundColor: colors.branco,
    },
    telaTitle: {
        fontFamily: fonts.heading,
        fontSize: 23,
        marginTop: '7.5%',
        marginBottom: '3%',
        alignSelf: 'center'
    },
    telaSizeMarca: {
        alignItems: 'center',
        marginTop: '8.5%',
        marginBottom: '1%',
    },
    telaImageMarca: {
        height: 80,
        width: 250,
    },
    telaButton: {
        flexDirection: 'row',
        backgroundColor: colors.laranja,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: '2%',
        marginHorizontal: '7%',
        height: 50,
        width: '86%',
    },
    telaButton2: {
        flexDirection: 'row',
        backgroundColor: colors.body_dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: '2%',
        marginBottom: '2%',
        marginHorizontal: '7%',
        height: 50,
        width: '86%',
    },
    telaButtonIcon: {
        fontSize: 20,
        color: colors.branco,
        marginRight: 10
    },
    telaButtonText: {
        fontSize: 20,
        color: colors.branco,
        fontFamily: fonts.heading
    },
    telaTextLine: {
        borderBottomColor: colors.preto,
        borderBottomWidth: 2,
        width: '86%',
        alignSelf: 'center',
        marginTop: '4%',
    },
    telaTextComplement: {
        alignSelf: 'center',
        marginVertical: '2%',
        marginTop: '5%',
        marginBottom: '2.5%',
        fontFamily: fonts.heading,
        fontSize: 23,
        color: colors.preto
    },
});
