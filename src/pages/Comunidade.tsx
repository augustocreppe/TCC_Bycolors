import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import TabMenu from '../components/TabMenu';
import { AddFile } from '../components/AddFile';

export function Comunidade() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.navigate('MenuLateral');
    }

    function handleGoGroups() {
        navigation.navigate('Grupos');
    }

    function handleGoChats() {
        navigation.navigate('Chats');
    }

    function handleGoTimeline() {
        navigation.navigate('LinhaDoTempo');
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

            <View style={styles.buttonsView}>
                <TouchableOpacity onPress={handleGoGroups} style={styles.buttons}>
                    <Feather name="users" style={styles.buttonMenuIcon}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleGoChats} style={styles.buttons}>
                    <Feather name="message-circle" style={styles.buttonMenuIcon}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleGoTimeline} style={styles.buttons}>
                    <Feather name="clock" style={styles.buttonMenuIcon}/>
                </TouchableOpacity>
            </View>

            <View style={styles.titleView}>
                <Text style={styles.title}>Página Comunidade</Text>
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
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 590,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonsView: {
        flexDirection: 'row',
    },
    buttons: {
        marginLeft: 25,
    }
});
