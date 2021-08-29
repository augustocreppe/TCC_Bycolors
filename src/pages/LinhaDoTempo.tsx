import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { TituloComunidade } from '../components/TituloComunidade';
import { ScrollView } from 'react-native-gesture-handler';
import { Post } from '../components/Post';
import fonts from '../styles/fonts';

const profile = require('../assets/profile.png');

export function LinhaDoTempo() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
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
                                <Text style={styles.name}>Fulana da Silva</Text>
                            </View>

                            <View style={styles.placeView}>
                                <Feather name="map-pin" style={styles.placeIcon}/>
                                <Text style={styles.place}>Bauru - SP</Text>
                            </View>
                        </View>
                </View>
                </View>

                <View style={styles.bioView}>
                    <Text style={styles.bio}>Estou aqui para contar mais sobre minha trajetória com o câncer de mama. Texto de exemplo para preencher o espaço.</Text>
                </View>

                <TituloComunidade idMes={0} text={"Minhas Publicações"}/>
                
                <View style={styles.postView}>
                    <Post idMes={5}/>
                    <Post idMes={7}/>
                </View>
            </ScrollView>
            </View>
        </View>
        </SafeAreaView>
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