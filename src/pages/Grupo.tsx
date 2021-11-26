import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { TituloComunidade } from '../components/TituloComunidade';
import { months } from '../styles/info';
import { Post } from '../components/Post';
import { AddFile } from '../components/AddFile';
import { constants } from '../config/app.config';
import { MyPost } from '../components/MyPost';
import { loadLogado } from '../libs/storage';

export function Grupo({ route }: { route: any }) {
    const navigation = useNavigation();
    const idMes = route.params.idMes;
    const [ready, setReady] = useState(false);
    const [dadosUser, setDadosUser] = useState<any>();
    const [publicacoes, setPublicacoes] = useState<any>();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        
        carregaPublicacoes().then(() => setRefreshing(false));
    },[]);

    const name1 = "Publicações - ";
    const name2 = months[idMes][0];
    const name = name1.concat(name2);

    useEffect(() => {
        async function getData() {
            setDadosUser(await loadLogado());
            await carregaPublicacoes();

            setReady(true);
        }
        
        getData();
    },[ready]);

    async function carregaPublicacoes() {
        fetch(`${constants.API_URL}/publicacao/id_doenca=${idMes}`, {
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
                (ready == true) &&

                <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.topView}>
                        <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                            <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
                        </TouchableOpacity>

                        <AddFile idMes={idMes}/>
                    </View>
                    
                    <TituloComunidade idMes={idMes} text={name}/>

                    <View style={styles.scrollView}>
                    <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={styles.scrollViewH}/> }>
                        {
                            (publicacoes != undefined) &&

                            publicacoes.map((json: any) =>

                                (dadosUser[0] == json.id_usuario) ? 
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
                                        idLogado={dadosUser[0]}
                                        key={json.id_publicacao}
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
                                        idLogado={dadosUser[0]}
                                        key={json.id_publicacao}
                                    />
                            )
                        }
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
    scrollView: {
        height: 652,
        alignSelf: 'center',
    },
    scrollViewH: {
        height: 652,
    },
    topView: {
        flexDirection: 'row',
        marginBottom: -15, 
    },
});