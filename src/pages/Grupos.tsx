import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { ButtonGrupos } from '../components/ButtonGrupos';
import { TituloComunidade } from '../components/TituloComunidade';

export function Grupos() {
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

            <TituloComunidade idMes={0} text={"Grupos Específicos"}/>

            <View style={styles.scrollView}>
            <ScrollView>
                <ButtonGrupos idMes={1}/>
                <ButtonGrupos idMes={2}/>
                <ButtonGrupos idMes={3}/>
                <ButtonGrupos idMes={4}/>
                <ButtonGrupos idMes={5}/>
                <ButtonGrupos idMes={6}/>
                <ButtonGrupos idMes={7}/>
                <ButtonGrupos idMes={8}/>
                <ButtonGrupos idMes={9}/>
                <ButtonGrupos idMes={10}/>
                <ButtonGrupos idMes={11}/>
                <ButtonGrupos idMes={12}/>
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
