import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, cores } from '../styles/colors';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { TituloComunidade } from '../components/TituloComunidade';
import { ScrollView } from 'react-native-gesture-handler';
import fonts from '../styles/fonts';

export function CriarPost({ route }: { route: any }) {
    const navigation = useNavigation();
    const idMes = route.params.idMes;

    function handleGoBack() {
        navigation.goBack();
    }

    function handlePost() {
        //
    }

    const nome = "Fulana da Silva";
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 20,
        },
        scrollView: {
            width: '100%',
            height: 600,
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
            alignItems: 'center',
            height: 250,
            marginHorizontal: '10%',
        },
        head:
        {
            padding: '1.5%',
            flexDirection: 'row',
            borderRadius: 16,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: cores[idMes][2],
            width: 360
        },
        profileImageView: {
            height: 60,
            width: 78, 
        },
        profileImage:
        {
            margin: 5,
            fontSize: 50,
            color: cores[idMes][0],
        },
        profileTextsView: {
            height: 60,
            width: '75%',
        },
        nameTextView: {
            height: 60,
            width: '75%',
        },
        nameText: {
            fontFamily: fonts.heading,
            fontSize: 22,
            height: 60,
            marginVertical: '8%',
            marginLeft: -15,
            color: cores[idMes][0],
        },
        textView: {
            backgroundColor: cores[idMes][0],
            width: 360,
            height: 150,
            borderRadius: 16,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        },
        textText: {
            fontSize: 16,
            alignSelf: 'center',
            textAlign: 'justify',
            width: '94%',
            padding: '1.5%',
        },
        buttonAdd: {
            alignSelf: 'flex-end',
            backgroundColor: cores[idMes][2],
            marginVertical: '20%',
            width: '48%',
            marginLeft: 300,
            marginRight: 10,
            borderRadius: 8,
        },
        buttonAddIcon: {
            fontSize: 18,
            alignSelf: 'flex-end',
            color: cores[idMes][0],
        },
        nameTextImage: {
            fontFamily: fonts.heading,
            fontSize: 15,
            height: 30,
            color: cores[idMes][0],
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

            <View style={styles.scrollView}> 
            <ScrollView>

            <TituloComunidade idMes={idMes} text={"Criar publicação"}/>
        
            <View style={styles.titleView}>
            <View style={styles.head}>
                <View style={styles.profileImageView}>
                    <FontAwesome5 name="user-circle" style={styles.profileImage}/>
                </View>
                <View style={styles.profileTextsView}>
                    <View style={styles.nameTextView}>
                        <Text style={styles.nameText}> {nome} </Text>
                    </View>
                </View>
            </View>

            <View style={styles.textView}>
                <TextInput style={styles.textText} placeholder="Adicione o texto aqui" />
                <TouchableOpacity style={styles.buttonAdd}>
                    <Text style={styles.nameTextImage}>  Adicionar imagem  <FontAwesome5 name="images" style={styles.buttonAddIcon}/></Text>
                </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
            </View>
        </View>
        </SafeAreaView>
    );
}
