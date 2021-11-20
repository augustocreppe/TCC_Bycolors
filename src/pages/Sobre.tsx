import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { TituloComunidade } from '../components/TituloComunidade';
import fonts from '../styles/fonts';

const agnes = require('../assets/Agnes.png');
const alicia = require('../assets/Alicia.png');
const anajulia = require('../assets/AnaJulia.png');
const analaura = require('../assets/AnaLaura.png');
const augusto1 = require('../assets/Augusto1.png');
const augusto2 = require('../assets/Augusto2.png');
const beatriz = require('../assets/Beatriz.png');
const bruna = require('../assets/Bruna.png');
const bruno = require('../assets/Bruno.png');

export function Sobre() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.navigate('MenuLateral');
    }

    function handleEmail() {
        Linking.openURL(`mailto:bycolors73A2021@gmail.com`)
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
            </TouchableOpacity>

            <ScrollView>

            <View style={styles.tituloView}>
                <TituloComunidade idMes={0} text={"Sobre o Aplicativo"}/>
            </View>

            <View style={styles.corpoView}>
                <Text style={styles.corpoTitle}>
                    O que é CorAção?
                </Text>
                <Text style={styles.corpoText}>
                    CorAção é um trabalho de conclusão de curso desenvolvido pelo grupo ByColors para facilitar o acesso a informações sobre campanhas de prevenção de doenças que ocorrem pelo ano.
                </Text>
            </View>

            <View style={styles.corpoView}>
                <Text style={styles.corpoTitle}>
                    Nossos Objetivos
                </Text>
                <Text style={styles.corpoText}>
                    - Expor informações concisas a respeito das doenças trabalhadas; {"\n"}
                    - Conscientizar a população a respeito da importância da prevenção das doenças; {"\n"}
                    - Disponibilizar uma plataforma clara, interativa e acessível para todos; {"\n"}
                    - Acolher e ajudar aqueles que se encontram num momento difícil.
                </Text>
            </View>

            <View style={styles.tituloView}>
                <TituloComunidade idMes={0} text={"Quem somos nós"}/>
            </View>

            <View style={styles.fotoView}>
                <View style={styles.imageView}>
                    <Image source={agnes} style={styles.image}/>
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.boldText}>
                        Agnes Bressan De Almeida {"\n"}
                    </Text>
                    <Text style={styles.infoText}>
                        <Feather name="mail" style={styles.icon2}/>
                        {" "}agnes.almeida@unesp.br
                    </Text>
                </View>
            </View>

            <View style={styles.fotoView}>
                <View style={styles.infoView2}>
                    <Text style={styles.boldText}>
                        Alicia Gomes Dias {"\n"}
                    </Text>
                    <Text style={styles.infoText2}>
                    <Feather name="mail" style={styles.icon2}/>
                        {" "}alicia.gomes@unesp.br
                    </Text>
                </View>
                <View style={styles.imageView}>
                    <Image source={alicia} style={styles.image}/>
                </View>
            </View>

            <View style={styles.fotoView}>
                <View style={styles.imageView}>
                    <Image source={anajulia} style={styles.image}/>
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.boldText}>
                        Ana Júlia Camargo De Freitas {"\n"}
                    </Text>
                    <Text style={styles.infoText}>
                        <Feather name="mail" style={styles.icon2}/>
                        {" "}aj.freitas@unesp.br
                    </Text>
                </View>
            </View>

            <View style={styles.fotoView}>
                <View style={styles.infoView2}>
                    <Text style={styles.boldText}>
                        Ana Laura Aparecida Caetano {"\n"}
                    </Text>
                    <Text style={styles.infoText2}>
                        <Feather name="mail" style={styles.icon2}/>
                        {" "}a.caetano@unesp.br
                    </Text>
                </View>
                <View style={styles.imageView}>
                    <Image source={analaura} style={styles.image}/>
                </View>
            </View>

            <View style={styles.fotoView}>
                <View style={styles.imageView}>
                    <Image source={augusto1} style={styles.image}/>
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.boldText}>
                        Augusto Amaral Domingues {"\n"}
                    </Text>
                    <Text style={styles.infoText}>
                        <Feather name="mail" style={styles.icon2}/>
                        {" "}augusto.domingues@unesp.br
                    </Text>
                </View>
            </View>

            <View style={styles.fotoView}>
                <View style={styles.infoView2}>
                    <Text style={styles.boldText}>
                        Augusto Zanardi Creppe {"\n"}
                    </Text>
                    <Text style={styles.infoText2}>
                        <Feather name="mail" style={styles.icon2}/>
                        {" "}augusto.creppe@unesp.br
                    </Text>
                </View>
                <View style={styles.imageView}>
                    <Image source={augusto2} style={styles.image}/>
                </View>
            </View>

            <View style={styles.fotoView}>
                <View style={styles.imageView}>
                    <Image source={beatriz} style={styles.image}/>
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.boldText}>
                        Beatriz Pastori Vieira De Melo {"\n"}
                    </Text>
                    <Text style={styles.infoText}>
                        <Feather name="mail" style={styles.icon2}/>
                        {" "}beatriz.pastori@unesp.br
                    </Text>
                </View>
            </View>

            <View style={styles.fotoView}>
                <View style={styles.infoView2}>
                    <Text style={styles.boldText}>
                        Bruna Luisa De Sousa {"\n"}
                    </Text>
                    <Text style={styles.infoText2}>
                        <Feather name="mail" style={styles.icon2}/>
                        {" "}bruna.l.sousa@unesp.br
                    </Text>
                </View>
                <View style={styles.imageView}>
                    <Image source={bruna} style={styles.image}/>
                </View>
            </View>

            <View style={styles.fotoView}>
                <View style={styles.imageView}>
                    <Image source={bruno} style={styles.image}/>
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.boldText}>
                        Bruno Reche Rosa {"\n"}
                    </Text>
                    <Text style={styles.infoText}>
                        <Feather name="mail" style={styles.icon2}/>
                        {" "}bruno.reche@unesp.br
                    </Text>
                </View>
            </View>

            <View style={styles.tituloView}>
                <TituloComunidade idMes={0} text={"Fale Conosco"}/>
            </View>

            <View style={styles.corpoView2}>
                <Text style={styles.corpoText}>
                    Para mais informações, contate-nos pelo email: {"\n"}
                </Text>
                <TouchableOpacity onPress={handleEmail}>
                <View style={styles.iconView}>
                    <Feather name="mail" style={styles.icon}/>
                    <Text style={styles.emailText}>
                        bycolors73A2021@gmail.com
                    </Text>
                </View>
                </TouchableOpacity>
            </View>

            </ScrollView>

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
        marginTop: 250
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    tituloView: {
        width: '100%',
    },
    corpoView: {
        width: '88%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    corpoView2: {
        width: '88%',
        alignSelf: 'center',
        marginBottom: 30,
    },
    corpoTitle: {
        fontFamily: fonts.heading,
        fontSize: 28,
        color: colors.body_dark
    },
    corpoText: {
        fontFamily: fonts.text,
        fontSize: 18,
        textAlign: 'justify',
    },
    fotoView: {
        width: '88%',
        alignSelf: 'center',
        flexDirection: 'row',
        height: 90,
        textAlignVertical: 'center',
        marginBottom: 10,
    },
    imageView: {
        width: '25%',
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 100,
        borderColor: colors.body_dark,
        borderWidth: 2,
    },
    infoView: {
        width: '75%',
        textAlignVertical: 'center',
        paddingLeft: 10,
        paddingTop: 10,
    },
    infoView2: {
        width: '75%',
        textAlignVertical: 'center',
        paddingRight: 10,
        paddingTop: 10,
        alignItems: 'flex-end',
    },
    infoText: {
        fontFamily: fonts.heading,
        fontSize: 14.9,
        color: colors.cinza_escuro,
        textAlignVertical: 'center',
        marginTop: -10
    },
    infoText2: {
        fontFamily: fonts.heading,
        fontSize: 14.9,
        color: colors.cinza_escuro,
        textAlignVertical: 'center',
        marginTop: -10,
        marginRight: 5,
    },
    boldText: {
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.cinza_escuro,
        textAlignVertical: 'center',
        fontWeight: 'bold',
    },
    iconView: {
        flexDirection: 'row',
        marginLeft: 45
    },
    icon: {
        fontSize: 20,
    },
    icon2: {
        fontSize: 15,
    },
    emailText: {
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.preto,
        marginLeft: 10,
        marginTop: -3
    }
});
