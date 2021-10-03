import React, { useEffect, useState } from 'react';
import fonts from '../styles/fonts';
import { StyleSheet, Text, Image, TouchableOpacity, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { loadLogado, logoutLogado } from '../libs/storage';

const profile = require('../assets/profile.png');

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

    function handleConfiguracoes() {
        navigation.navigate('Configuracoes');
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
                        <Image 
                            source={profile} 
                            style={styles.image}
                            resizeMode="contain"
                        />
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
                            <Text style={styles.buttonText}>Alterar Usuário</Text>
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
                        <TouchableOpacity style={styles.buttonMenu} onPress={handleConfiguracoes}>
                            <Feather name="settings" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Configurações</Text>
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
