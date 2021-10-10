import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { TituloComunidade } from '../components/TituloComunidade';
import { ScrollView } from 'react-native-gesture-handler';
import { Post } from '../components/Post';
import fonts from '../styles/fonts';
import { loadLogado } from '../libs/storage';

const profile = require('../assets/profile.png');

export function LinhaDoTempo({ route }: { route: any }) {
    const navigation = useNavigation();
    const idUser = route.params.idUser;

    const [ready, setReady] = useState(false);
    const [dados, setDados] = useState<any>();

    useEffect(() => {
        async function getData() {
            await getUser();
            
            setReady(true);
        }
        
        getData();
    },[]);

    async function getUser() {
        if(idUser == 0)
        {
            setDados(await loadLogado());
        }
        else
        {
            //(Mostrar Linha do Tempo do Fulano)
            //Pesquisar Usuário por Id
            //Pesquisar publicações por Id
        }
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
                    <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                        <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
                    </TouchableOpacity>

                    <View style={styles.scrollView}> 
                    <ScrollView>

                        <View style={styles.profileView}>
                        <View style={styles.notBioView}>
                                <View style={styles.imageView}>
                                    <Image source={profile} style={styles.image}/>
                                </View>

                                <View style={styles.infoView}>
                                    <View style={styles.nameView}>
                                        <Text style={styles.name}>{ dados[1] }</Text>
                                    </View>

                                    <View style={styles.placeView}>
                                        <Feather name="map-pin" style={styles.placeIcon}/>
                                        <Text style={styles.place}>{ dados[5] } - { dados[6] }</Text>
                                    </View>
                                </View>
                        </View>
                        </View>

                        <View style={styles.bioView}>
                            <Text style={styles.bio}>{ dados[8] }</Text>
                        </View>

                        <TituloComunidade idMes={0} text={"Minhas Publicações"}/>
                        
                        <View style={styles.postView}>
                            <Post idMes={2}/>
                            <Post idMes={7}/>
                            <Post idMes={5}/>
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