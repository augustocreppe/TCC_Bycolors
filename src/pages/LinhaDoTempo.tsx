import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import fonts from '../styles/fonts';
import { Feather } from '@expo/vector-icons';
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

            <View style={styles.doubleView}>
                <View style={styles.imageView}>
                    <Image 
                        source={profile} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.nameTextView}>
                    <Text style={styles.nameText}>Fulana da Silva</Text>

                    <Text style={styles.bioText}>Estou aqui para saber mais {"\n"}
                    sobre o câncer de mama e {"\n"}
                    participar dos grupos.</Text>
                </View>

            </View>


            <TouchableOpacity>
                <Text style={styles.complement}>
                     Editar perfil
                </Text>
            </TouchableOpacity>

            <View style={styles.placeTextView}>
                <Feather name="map-pin" style={styles.placeIcon}/>
                <Text style={styles.placeText}>Bauru - SP</Text>
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

    buttonMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 8,
        height: 56,
        width: 56,
    },

    imageView: {
        justifyContent: 'center',
        marginLeft: 45,
        marginTop: 30
    },

    image: {
        width: 100,
        height: 100,
    },

    nameTextView: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
    },

    nameText: {
        fontSize: 25,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    },

    bioText: {
        fontSize: 14,
        fontFamily: fonts.text,
        color: colors.preto
    },

    complement: {
        textDecorationLine: 'underline',
        color: colors.body_dark,
        marginLeft: 178,
        fontSize: 14
    },

    doubleView: {
        flexDirection: 'row'
    },

    buttonMenuIcon: {
        fontSize: 40,
        color: colors.body_dark,
    },

    placeTextView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 55,
        marginBottom: 30,
    },

    placeIcon: {
        fontSize: 20,
        color: colors.body_dark,
        marginRight: 10
    },
    placeText: {
        fontSize: 20,
        fontFamily: fonts.text,
        color: colors.body_dark,
    },

});
