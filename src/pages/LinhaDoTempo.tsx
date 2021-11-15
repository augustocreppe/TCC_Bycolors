import React, { useEffect, useState } from 'react';
import fonts from '../styles/fonts';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { TituloComunidade } from '../components/TituloComunidade';
import { Post } from '../components/Post';
import { constants } from '../config/app.config';
import { MyPost } from '../components/MyPost';
import { loadLogado } from '../libs/storage';

const avatar1 = require('../assets/avatar1.png');
const avatar2 = require('../assets/avatar2.png');
const avatar3 = require('../assets/avatar3.png');
const avatar4 = require('../assets/avatar4.png');
const avatar5 = require('../assets/avatar5.png');
const avatar6 = require('../assets/avatar6.png');

export function LinhaDoTempo({ route }: { route: any }) {
    const navigation = useNavigation();
    const idUser = route.params.idUser;

    const [ready, setReady] = useState(false);
    const [dados, setDados] = useState<any>();
    const [dadosLog, setDadosLog] = useState<any>();
    const [publicacoes, setPublicacoes] = useState<any>();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setPublicacoes(null);
        
        carregaPublicacoes().then(() => setRefreshing(false));
    },[]);

    useEffect(() => {
        async function getData() {
            setDadosLog(await loadLogado());
            await getUser();
            await carregaPublicacoes();
            
            setReady(true);
        }
        
        getData();
    },[ready]);

    async function getUser() {
        fetch(`${constants.API_URL}/usuarios/id_usuario=${idUser}`, {
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
            setDados(json);
        })
        .catch((error) => {
            Alert.alert('Erro ao carregar mensagens!', error);
        })
    }

    async function carregaPublicacoes() {
        fetch(`${constants.API_URL}/publicacao/id_usuario=${idUser}`, {
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
        navigation.goBack();
    }

    return (
        <>
            {
                (ready == true && dados != undefined) &&
        
                <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                        <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
                    </TouchableOpacity>

                    <View style={styles.scrollView}>
                    <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> }>
                        <View style={styles.profileView}>
                            <View style={styles.notBioView}>
                                <View style={styles.imageView}>
                                    { (dados[0].avatar == 1) && <Image source={avatar1} style={styles.image} resizeMode="contain"/> }
                                    { (dados[0].avatar == 2) && <Image source={avatar2} style={styles.image} resizeMode="contain"/> }
                                    { (dados[0].avatar == 3) && <Image source={avatar3} style={styles.image} resizeMode="contain"/> }
                                    { (dados[0].avatar == 4) && <Image source={avatar4} style={styles.image} resizeMode="contain"/> }
                                    { (dados[0].avatar == 5) && <Image source={avatar5} style={styles.image} resizeMode="contain"/> }
                                    { (dados[0].avatar == 6) && <Image source={avatar6} style={styles.image} resizeMode="contain"/> }
                                </View>

                                <View style={styles.infoView}>
                                    <View style={styles.nameView}>
                                        <Text style={styles.name}>{ dados[0].nome_usuario }</Text>
                                    </View>

                                    <View style={styles.placeView}>
                                        <Feather name="map-pin" style={styles.placeIcon}/>
                                        <Text style={styles.place}>{ dados[0].cidade } - { dados[0].estado }</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.bioView}>
                            <Text style={styles.bio}>{ dados[0].bio }</Text>
                        </View>

                        {
                            (idUser == dadosLog[0]) ?
                                <TituloComunidade idMes={0} text={"Minhas Publicações"}/>
                            :
                                <TituloComunidade idMes={0} text={"Publicações de "+dados[0].nome_usuario.substring(0,dados[0].nome_usuario.indexOf(' '))}/>
                        }
                        
                        <View style={styles.postView}>
                            {
                                (publicacoes) &&

                                publicacoes.map((json: any) =>

                                    (dadosLog[0] == json.id_usuario) ?
                                        <MyPost
                                            idMes={json.doenca_id} 
                                            avatar={json.usuario.avatar} 
                                            nome={json.usuario.nome_usuario} 
                                            hora={new Date(json.data).toLocaleTimeString().substring(0, 5)} 
                                            data={new Date(json.data).toLocaleDateString()} 
                                            conteudo={json.conteudo} 
                                            imagem={json.imagem}
                                            idAutor={json.id_usuario}
                                            idPost={json.id_publicacao}
                                            idLogado={dados[0]}
                                        />
                                    :
                                        <Post
                                            idMes={json.doenca_id} 
                                            avatar={json.usuario.avatar} 
                                            nome={json.usuario.nome_usuario} 
                                            hora={new Date(json.data).toLocaleTimeString().substring(0, 5)}
                                            data={new Date(json.data).toLocaleDateString()} 
                                            conteudo={json.conteudo} 
                                            imagem={json.imagem}
                                            idAutor={json.id_usuario}
                                            idPost={json.id_publicacao}
                                            idLogado={dados[0]}
                                        />
                                )
                            }
                        </View>
                    </ScrollView>
                    </View>
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
    scrollView: {
        width: '100%',
        height: 724,
    },
    postView: {
        alignItems: 'center',
    },
    profileView: {
        width: '88%',
        alignSelf: 'center',
        height: 200,
    },
    notBioView: {
        width: '100%',
        height: '70%',
        flexDirection: 'row',
    },
    imageView: {
        justifyContent: 'center',
        width: '38%',
        height: '100%',
        borderWidth: 2,
        borderColor: colors.body_dark,
        borderRadius: 100,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoView: {
        width: '62%',
        height: '100%',
        paddingLeft: '3%',
    },
    nameView: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
    },
    name: {
        textAlignVertical: 'center',
        fontFamily: fonts.heading,
        color: colors.body_dark,
        fontSize: 25,
    },
    placeView: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
    },
    placeIcon: {
        fontSize: 20,
        textAlignVertical: 'center',
        color: colors.body_dark,
        marginRight: '2%',
    },
    place: {
        fontFamily: fonts.text,
        color: colors.body_dark,
        fontSize: 25,
        textAlignVertical: 'center',
    },
    bioView: {
        width: '88%',
        alignSelf: 'center',
        height: 'auto',
        marginTop: '-12%'
    },
    bio: {
        fontFamily: fonts.text,
        color: colors.cinza_escuro,
        fontSize: 20,
        textAlignVertical: 'center',
        textAlign: 'justify',
    },  
    buttonMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        height: 56,
        width: 56,
    },
    buttonMenuIcon: {
        fontSize: 40,
        color: colors.body_dark,
    },
});