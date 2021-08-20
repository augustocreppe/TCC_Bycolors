import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, cores } from '../styles/colors';
import { Feather } from '@expo/vector-icons';

export function CriarPost({ route }: { route: any }) {
    const navigation = useNavigation();
    const idMes = route.params.idMes;

    function handleGoBack() {
        navigation.goBack();
    }

    function handlePost() {
        //
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
        topView: {
            flexDirection: 'row',
        },
        buttonMenuIcon: {
            fontSize: 40,
            color: colors.body_dark,
        },
        buttonSend: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
            marginLeft: '65%',
            height: 56,
            width: 56,
        },
        buttonSendIcon: {
            fontSize: 35,
            color: cores[idMes][2],
        },
        titleView: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 630,
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View style={styles.topView}>
                <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                    <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePost} style={styles.buttonSend}>
                    <Feather name="send" style={styles.buttonSendIcon}/>
                </TouchableOpacity>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>Página Criar Post</Text>
            </View>
        </View>
        </SafeAreaView>
    );
}
