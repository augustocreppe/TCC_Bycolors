import React, { useEffect, useState } from 'react';
import fonts from '../styles/fonts';
import { StyleSheet, Text, Image, TouchableOpacity, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { loadLogado, logoutLogado } from '../libs/storage';

const avatar1 = require('../assets/avatar1.png');
const avatar2 = require('../assets/avatar2.png');
const avatar3 = require('../assets/avatar3.png');
const avatar4 = require('../assets/avatar4.png');
const avatar5 = require('../assets/avatar5.png');
const avatar6 = require('../assets/avatar6.png');

export function MenuLateral() {
    const navigation = useNavigation();
    const [ready, setReady] = useState(false);
    const [dados, setDados] = useState<any>();

    useEffect(() => {
        async function getData() {
            setDados(await loadLogado());
            
            setReady(true);
        }
        
        getData();
    },[]);

    function handleGoBack() {
        navigation.goBack();
    }

    function handleUser() {
        navigation.navigate('Usuario');
    }

    function handleCalendario() {
        navigation.navigate('Calendario');
    }

    function handleComunidade() {
        navigation.navigate('Comunidade');
    }

    function handleSobre() {
        navigation.navigate('Sobre');
    }

    function handleLogout() {
        Alert.alert(
            "Confirmar Logout",
            "Você deseja realmente sair do aplicativo?",
            [
              {
                text: "Sim",
                onPress: () => {
                    logoutLogado();
                    navigation.navigate('Inicio');
                },
              },
              {
                text: "Não",
              },
            ]
        );
    }

    return (
        <>
            {
                (ready == true) &&

                <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.buttonBack}>
                        <Feather name="x" style={styles.buttonBackIcon}/>
                    </TouchableOpacity>
                
                    <View style={styles.imageView}>
                        { (dados[7] == 1) && <Image source={avatar1} style={styles.image} resizeMode="contain"/> }
                        { (dados[7] == 2) && <Image source={avatar2} style={styles.image} resizeMode="contain"/> }
                        { (dados[7] == 3) && <Image source={avatar3} style={styles.image} resizeMode="contain"/> }
                        { (dados[7] == 4) && <Image source={avatar4} style={styles.image} resizeMode="contain"/> }
                        { (dados[7] == 5) && <Image source={avatar5} style={styles.image} resizeMode="contain"/> }
                        { (dados[7] == 6) && <Image source={avatar6} style={styles.image} resizeMode="contain"/> }
                    </View>
        
                    <View style={styles.nameTextView}>
                        <Text style={styles.nameText}>{ dados[1] }</Text>
                    </View>
        
                    <View style={styles.placeTextView}>
                        <Feather name="map-pin" style={styles.placeIcon}/>
                        <Text style={styles.placeText}>{ dados[5] } - { dados[6] }</Text>
                    </View>
        
                    <ScrollView>
                        <View style={styles.lineView}>
                            <Text style={styles.line}>___________________________________</Text>
                        </View>
        
                        <View style={styles.buttonMenuView}>
                        <TouchableOpacity style={styles.buttonMenu} onPress={handleUser}>
                            <Feather name="user" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Editar Perfil</Text>
                        </TouchableOpacity>
                        </View>
        
                        <View style={styles.lineView}>
                            <Text style={styles.line}>___________________________________</Text>
                        </View>
        
                        <View style={styles.buttonMenuView}>
                        <TouchableOpacity style={styles.buttonMenu} onPress={handleCalendario}>
                            <Feather name="calendar" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Calendário</Text>
                        </TouchableOpacity>
                        </View>
        
                        <View style={styles.lineView}>
                            <Text style={styles.line}>___________________________________</Text>
                        </View>
        
                        <View style={styles.buttonMenuView}>
                        <TouchableOpacity style={styles.buttonMenu} onPress={handleComunidade}>
                            <Feather name="users" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Comunidade</Text>
                        </TouchableOpacity>
                        </View>
        
                        <View style={styles.lineView}>
                            <Text style={styles.line}>___________________________________</Text>
                        </View>
        
                        <View style={styles.buttonMenuView}>
                        <TouchableOpacity style={styles.buttonMenu} onPress={handleSobre}>
                            <Feather name="info" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Sobre o aplicativo</Text>
                        </TouchableOpacity>
                        </View>
        
                        <View style={styles.lineView}>
                            <Text style={styles.line}>___________________________________</Text>
                        </View>
        
                        <View style={styles.buttonMenuView}>
                        <TouchableOpacity style={styles.buttonMenu} onPress={handleLogout}>
                            <Feather name="log-out" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Sair</Text>
                        </TouchableOpacity>
                        </View>
        
                        <View style={styles.lineView}>
                            <Text style={styles.line}>___________________________________</Text>
                        </View>
                    </ScrollView>
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
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    buttonBack: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 15,
        height: 56,
        width: 56,
    },
    buttonBackIcon: {
        fontSize: 40,
        color: colors.body_dark,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 100,
        borderColor: colors.body_dark,
        width: 160,
        height: 160,
        alignSelf: 'center'
    },
    image: {
        width: 150,
        height: 150,
    },
    nameTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    nameText: {
        fontSize: 35,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    },
    placeTextView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    placeIcon: {
        fontSize: 25,
        color: colors.body_dark,
        marginRight: 10
    },
    placeText: {
        fontSize: 25,
        fontFamily: fonts.text,
        color: colors.body_dark,
    },
    lineView: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: -20,
    },
    line: {
        fontSize: 20,
        color: colors.body_dark,
    },
    buttonMenuView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        marginLeft: 40,
        height: 60,
        width: 350,
    },
    buttonIcon: {
        fontSize: 25,
        color: colors.body_dark,
        marginRight: 10
    },
    buttonText: {
        fontSize: 25,
        fontFamily: fonts.text,
        color: colors.body_dark,
    },
});
