import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { AddFile } from '../components/AddFile';
import { ScrollView } from 'react-native-gesture-handler';
import { Post } from '../components/Post';
import { TituloComunidade } from '../components/TituloComunidade';
import TabMenu from '../components/TabMenu';
import { ButtonComunidade } from '../components/ButtonComunidade';

export function Comunidade() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.navigate('MenuLateral');
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View style={styles.topView}>
                <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                    <Feather name="menu" style={styles.buttonMenuIcon}/>
                </TouchableOpacity>

                <AddFile idMes={0}/>
            </View>

            <View style={styles.feedView}>
            <ScrollView>
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
                    <Post idMes={9}/>
                    <Post idMes={10}/>
                    <Post idMes={3}/>
                </View>
            </ScrollView>
            </View>

            <TabMenu/>    
        </View>
        </SafeAreaView>
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
});
