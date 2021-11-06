import React, { useEffect, useState } from 'react';
import fonts from '../styles/fonts';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, cores } from '../styles/colors';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { TituloComunidade } from '../components/TituloComunidade';
import { ScrollView } from 'react-native-gesture-handler';
import { loadLogado } from '../libs/storage';
import { constants } from '../config/app.config';

const avatar1 = require('../assets/avatar1.png');
const avatar2 = require('../assets/avatar2.png');
const avatar3 = require('../assets/avatar3.png');
const avatar4 = require('../assets/avatar4.png');
const avatar5 = require('../assets/avatar5.png');
const avatar6 = require('../assets/avatar6.png');

export function CriarPost({ route }: { route: any }) {
    const navigation = useNavigation();
    const idMes = route.params.idMes;
    
    const [ready, setReady] = useState(false);
    const [dados, setDados] = useState<any>();

    const [conteudo, setConteudo] = useState<string>();
    const [conteudoIsFilled, setConteudoIsFilled] = useState(false);
    const [imagem, setImagem] = useState<string>("none");

    useEffect(() => {
        async function getData() {
            setDados(await loadLogado());
            
            setReady(true);
        }
        
        getData();
    },[ready]);

    function handleGoBack() {
        navigation.goBack();
    }

    function handlePost() {
        if(conteudoIsFilled && imagem != undefined)
        {
            const id_usuario = parseInt(dados[0]);
            const id_doenca = idMes;
    
            const publi = { id_usuario, id_doenca, conteudo, imagem }

            fetch(`${constants.API_URL}/publicacao`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(publi)
            })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                Alert.alert('Publicação publicada com sucesso!');
                navigation.navigate('Comunidade');
            })
            .catch((error) => {
                Alert.alert('Erro ao publicar!', error);
            });
        }
        else
        {
            Alert.alert('Preencha todos os campos corretamente!');
        }
    }

    function handleConteudoChange(value: string) {
        setConteudoIsFilled(!!value);
        setConteudo(value);
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 20,
        },
        scrollView: {
            width: '100%',
            height: 725,
            marginTop: -15,
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
            height: 'auto',
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
        image:
        {
            margin: 5,
            width: 50,
            height: 50,
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
            height: 'auto',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
        },
        textText: {
            fontSize: 16,
            alignSelf: 'center',
            textAlign: 'justify',
            width: '94%',
            height: 'auto',
            padding: '1.5%',
        },
        buttonAdd: {
            alignSelf: 'flex-end',
            backgroundColor: cores[idMes][2],
            marginVertical: 15,
            width: '48%',
            marginLeft: 295,
            marginRight: 15,
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
            marginTop: 5,
        },   
    });

    return (
        <>
            {
                (ready == true) &&

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
                                { (dados[7] == 1) && <Image source={avatar1} style={styles.image} resizeMode="contain"/> }
                                { (dados[7] == 2) && <Image source={avatar2} style={styles.image} resizeMode="contain"/> }
                                { (dados[7] == 3) && <Image source={avatar3} style={styles.image} resizeMode="contain"/> }
                                { (dados[7] == 4) && <Image source={avatar4} style={styles.image} resizeMode="contain"/> }
                                { (dados[7] == 5) && <Image source={avatar5} style={styles.image} resizeMode="contain"/> }
                                { (dados[7] == 6) && <Image source={avatar6} style={styles.image} resizeMode="contain"/> }
                                </View>
                                <View style={styles.profileTextsView}>
                                    <View style={styles.nameTextView}>
                                        <Text style={styles.nameText}> {dados[1]} </Text>
                                    </View>
                                </View>
                            </View>
        
                            <View style={styles.textView}>
                                <TextInput style={styles.textText} placeholder="Adicione o texto aqui" maxLength={1000} multiline={true} onChangeText={handleConteudoChange}/>
                                <TouchableOpacity style={styles.buttonAdd}>
                                    <Text style={styles.nameTextImage}>  Adicionar imagem  <FontAwesome5 name="images" style={styles.buttonAddIcon}/></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    </View>
                </View>
                </SafeAreaView>     
            }
        </>
    );
}
