import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Feather } from '@expo/vector-icons';

export function Chats() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    function handleEnter() {
        navigation.navigate('Chat');
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
            </TouchableOpacity>

            <View style={styles.titleView}>
                <Text style={styles.title}>Página Chats</Text>
            </View>

            <TouchableOpacity onPress={handleEnter} style={styles.button}>
                <Text>Tela Chat</Text>
            </TouchableOpacity>

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
        marginBottom: 15,
        marginLeft: 15,
        height: 56,
        width: 56,
    },
    buttonMenuIcon: {
        fontSize: 40,
        color: colors.body_dark,
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 590,
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
        marginBottom: 4,
        marginHorizontal: '7%',
        height: 50,
        width: '86%',
    },
});
