import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { ButtonChats } from '../components/ButtonChats';
import { TituloComunidade } from '../components/TituloComunidade';

export function Chats() {
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

            <TituloComunidade idMes={0} text={"Chats Específicos"}/>

            <View style={styles.scrollView}>
            <ScrollView>
                <ButtonChats idMes={1}/>
                <ButtonChats idMes={2}/>
                <ButtonChats idMes={3}/>
                <ButtonChats idMes={4}/>
                <ButtonChats idMes={5}/>
                <ButtonChats idMes={6}/>
                <ButtonChats idMes={7}/>
                <ButtonChats idMes={8}/>
                <ButtonChats idMes={9}/>
                <ButtonChats idMes={10}/>
                <ButtonChats idMes={11}/>
                <ButtonChats idMes={12}/>
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
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 590,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    scrollView: {
        height: 652,
    },
});
