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
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';


const avatar1 = require('../assets/avatar1.png');
const avatar2 = require('../assets/avatar2.png');
const avatar3 = require('../assets/avatar3.png');
const avatar4 = require('../assets/avatar4.png');
const avatar5 = require('../assets/avatar5.png');
const avatar6 = require('../assets/avatar6.png');

export function EditarPost({ route }: { route: any }) {
    const navigation = useNavigation();
    const [idPost, setIdPost] = useState(route.params.idPost);

    const [idMes, setIdMes] = useState(1);
    const [conteudo, setConteudo] = useState<string>();
    const [image, setImage] = useState<string>('none');

    const [IdMesIsFilled, setIdMesIsFilled] = useState(false);
    const [conteudoIsFilled, setConteudoIsFilled] = useState(false);

    const [ready, setReady] = useState(false);
    const [dados, setDados] = useState<any>();

    useEffect(() => {
        async function getData() {
            setDados(await loadLogado());
            getDadosPost();
            
            setReady(true);
        }
        
        getData();
    },[ready]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled && result.base64 != undefined) {
            setImage(result.uri);
        }
    };

    function handleGoBack() {
        navigation.goBack();
    }

    function getDadosPost() {
        fetch(`${constants.API_URL}/publicacao/id_publicacao=${idPost}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            setConteudo(json[0].conteudo);
            setIdMes(json[0].doenca_id);
            setImage(json[0].imagem);
        })
        .catch((error) => {
            Alert.alert('Erro ao achar!', error);
        });
    }

    function handleUpdate() {
        if(idMes != 0)
        {
            if(conteudo != null && image != undefined)
            {
                const doenca_id = idMes;
                const imagem = image;
        
                const publi = { doenca_id, conteudo, imagem }

                fetch(`${constants.API_URL}/publicacao/${idPost}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(publi)
                })
                .then((json) => {
                    Alert.alert('Publica????o atualizada com sucesso!');
                    navigation.goBack();
                })
                .catch((error) => {
                    Alert.alert('Erro ao atualizar!', error);
                });
            }
            else
            {
                Alert.alert('Preencha todos os campos corretamente!');
            }
        }
        else
        {
            Alert.alert('Selecione a campanha!'); 
        }
    }

    function handleConteudoChange(value: string) {
        setConteudoIsFilled(!!value);
        setConteudo(value);
    }
    
    function handleIdMesChange(value:number) {
        setIdMesIsFilled(!!value);
        setIdMes(value);
    }

    function deleteImage() {
        setImage('none');
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 20,
        },
        scrollView: {
            width: '100%',
            height: 'auto',
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
            width: 60,
            borderWidth: 2,
            borderRadius: 100,
            borderColor: cores[idMes][0],
            backgroundColor: colors.branco,
            marginLeft:0
        },
        image:
        {
            margin: 1,
            width: 55,
            height: 55,
        },
        profileTextsView: {
            paddingLeft: 20,
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
        buttonDelete: {
            alignSelf: 'flex-end',
            backgroundColor: cores[idMes][2],
            width: '48%',
            marginLeft: 295,
            marginRight: 15,
            borderRadius: 8,
            marginBottom: 15,
            marginTop: 5,
        },
        image2: { 
            width: 330,
            height: 350,
            alignSelf: 'center',
            marginVertical: 10,
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
        pickerView: {
            borderRadius: 12,
            backgroundColor: cores[idMes][0],
            marginVertical: 15,
            padding: 4,
            height: 'auto',
            width: 360,
            alignSelf: 'center',
        },
        inputHolder: {
            color: colors.heading,
            height: 50,
            width: '100%',
            fontSize: 18,
            textAlign: 'justify',
            fontFamily: fonts.heading,
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
        
                        <TouchableOpacity onPress={handleUpdate} style={styles.buttonSend}>
                            <Feather name="send" style={styles.buttonSendIcon}/>
                        </TouchableOpacity>
                    </View>
        
                    <ScrollView>
                    <View style={styles.scrollView}> 
                        <TituloComunidade idMes={idMes} text={"Editar publica????o"}/>

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
                                <TextInput value={conteudo} style={styles.textText} placeholder="Adicione o texto aqui" maxLength={1000} multiline={true} onChangeText={handleConteudoChange}/>
                                {
                                    (image != 'none') &&

                                    <>
                                        <Image source={{ uri: image }} style={styles.image2} resizeMode="stretch"/>

                                        <TouchableOpacity style={styles.buttonDelete} onPress={deleteImage}>
                                            <Text style={styles.nameTextImage}>      Excluir imagem  <Feather name="trash-2" style={styles.buttonAddIcon}/></Text>
                                        </TouchableOpacity>
                                    </>
                                }

                                {
                                    (image == 'none') &&

                                    <TouchableOpacity style={styles.buttonAdd} onPress={pickImage}>
                                        <Text style={styles.nameTextImage}>  Adicionar imagem  <FontAwesome5 name="images" style={styles.buttonAddIcon}/></Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>

                        <View style={styles.pickerView}>
                        <Picker
                            style={styles.inputHolder}
                            selectedValue={idMes}
                            onValueChange={handleIdMesChange}
                        >
                            <Picker.Item label="Selecione a campanha" value={0} />
                            <Picker.Item label="Janeiro Branco" value={1} />
                            <Picker.Item label="Fevereiro Roxo" value={2} />
                            <Picker.Item label="Mar??o Lil??s" value={3} />
                            <Picker.Item label="Abril Azul" value={4} />
                            <Picker.Item label="Maio Vermelho" value={5} />
                            <Picker.Item label="Junho Laranja" value={6} />
                            <Picker.Item label="Julho Amarelo" value={7} />
                            <Picker.Item label="Agosto Laranja" value={8} />
                            <Picker.Item label="Setembro Amarelo" value={9} />
                            <Picker.Item label="Outubro Rosa" value={10} />
                            <Picker.Item label="Novembro Azul" value={11} />
                            <Picker.Item label="Dezembro Vermelho" value={12} />
                        </Picker>
                        </View>
                    </View>
                    </ScrollView>
                </View>
                </SafeAreaView>     
            }
        </>
    );
}