import React, { useEffect, useState } from 'react';
import TabMenu from '../components/TabMenu';
import fonts from '../styles/fonts';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, Image, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { AddFile } from '../components/AddFile';
import { Post } from '../components/Post';
import { TituloComunidade } from '../components/TituloComunidade';
import { ButtonComunidade } from '../components/ButtonComunidade';
import { isLogado, loadLogado } from '../libs/storage';
import { constants } from '../config/app.config';
import { MyPost } from '../components/MyPost';

const fundo = require('../assets/fundo-comunidade.jpg');
const marca = require('../assets/marca.png');

export function Comunidade() {
    const navigation = useNavigation();
    const [ready, setReady] = useState(false);
    const [isLogged, setIsLogged] = useState<any>();
    const [dadosUser, setDadosUser] = useState<any>();
    const [publicacoes, setPublicacoes] = useState<any>();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        
        carregaPublicacoes().then(() => setRefreshing(false));
    },[]);

    useEffect(() => {
        async function getData() {
            setIsLogged(await isLogado());
            setDadosUser(await loadLogado());
            await carregaPublicacoes();

            setReady(true);
        }
        
        getData();
    },[ready]);

    async function carregaPublicacoes() {
        fetch(`${constants.API_URL}/publicacao`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            setPublicacoes(json);
        })
        .catch((error) => {
            Alert.alert('Erro ao carregar mensagens!', error);
        })
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

                <>
                    {
                        (ready == true) &&

                        <SafeAreaView style={styles.container}>
                            <View style={styles.container}>
                                <View style={styles.topView}>
                                    <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                                        <Feather name="menu" style={styles.buttonMenuIcon}/>
                                    </TouchableOpacity>
        
                                    <AddFile idMes={0}/>
                                </View>
        
                                <View style={styles.feedView}>
                                <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> }>
                                <>
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
                                        {
                                            (publicacoes != undefined) &&

                                            publicacoes.map((json: any) =>

                                                (dadosUser[0] == json.id_usuario) ? 
                                                    <MyPost
                                                        idMes={json.doenca_id} 
                                                        avatar={json.usuario.avatar} 
                                                        nome={json.usuario.nome_usuario} 
                                                        hora={new Date(json.data).toLocaleTimeString().substring(0, 5)} 
                                                        data={new Date(json.data).toLocaleDateString('pt-BR')}
                                                        conteudo={json.conteudo} 
                                                        imagem={"none"}
                                                        idAutor={json.id_usuario}
                                                        idPost={json.id_publicacao}
                                                        idLogado={dadosUser[0]}
                                                    />
                                                :
                                                    <Post
                                                        idMes={json.doenca_id} 
                                                        avatar={json.usuario.avatar} 
                                                        nome={json.usuario.nome_usuario} 
                                                        hora={new Date(json.data).toLocaleTimeString().substring(0, 5)} 
                                                        data={new Date(json.data).toLocaleDateString('pt-BR')} 
                                                        conteudo={json.conteudo} 
                                                        imagem={"none"}
                                                        idAutor={json.id_usuario}
                                                        idPost={json.id_publicacao}
                                                        idLogado={dadosUser[0]}
                                                    />
                                            )
                                        }
                                    </View>
                                </>
                                </ScrollView>
                                </View>
        
                                <TabMenu/>   
                            </View>
                        </SafeAreaView>
                    }
                </>
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
