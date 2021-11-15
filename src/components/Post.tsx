import React, { useEffect, useState } from 'react';
import fonts from '../styles/fonts';
import { StyleSheet, Text, TouchableOpacity, View, TouchableOpacityProps, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, cores } from '../styles/colors';
import { months } from '../styles/info';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { constants } from '../config/app.config';
import { loadLogado } from '../libs/storage';

interface PostProps extends TouchableOpacityProps {
    idMes: number;
    avatar: number;
    nome: string;
    hora: string;
    data: string;
    imagem: string;
    conteudo: string;
    idAutor: number;
    idPost: number;
    idLogado: number;
}

export function Post ({ idMes, avatar, nome, hora, data, imagem, conteudo, idAutor, idPost, idLogado, ...rest }: PostProps) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: cores[idMes][1],
            width: 360,
            borderRadius: 16,
            marginHorizontal: '1%',
            height: 'auto',
            marginBottom: 20,
        },
        head:
        {
            padding: '1.5%',
            flexDirection: 'row',
        },
        profileImageView: {
            height: 60,
            width: 60,
            borderWidth: 2,
            borderRadius: 100,
            borderColor: cores[idMes][2],
            backgroundColor: colors.branco,
        },
        profileImage:
        {
            margin: 5,
            fontSize: 50,
            color: cores[idMes][2]
        },
        profileTextsView: {
            height: 60,
            width: '75%',
        },
        nameTextView: {
            height: 30,
            width: '75%',
        },
        nameText: {
            fontFamily: fonts.heading,
            fontSize: 22
        },
        dateTextView: {
            height: 30,
            width: '75%',
        },
        dateText: {
            fontFamily: fonts.text,
            fontSize: 16
        },
        ellipsisView:
        {
            height: 60,
        },
        ellipsisIcon:
        {
            fontSize: 25,
            margin: 12,
            marginTop: 15,
            justifyContent: 'flex-end',
            color: cores[idMes][2],
        },
        tagView:
        {
            width: '100%',
            height: 40,
            backgroundColor: cores[idMes][2],
        },
        tagText:
        {
            fontSize: 18,
            fontFamily: fonts.heading,
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: '2%',
        },
        textView: {
            backgroundColor: cores[idMes][0],
            width: '100%',
            height: 'auto',
        },
        textText: {
            fontSize: 16,
            alignSelf: 'center',
            textAlign: 'justify',
            width: '94%',
            marginVertical: '1.5%',
        },
        bottom:
        {
            height: 60,
            flexWrap: 'wrap',
        },
        likeViewF: {
            height: 60,
            width: 180,
            flexDirection: 'row',
            paddingVertical: '8%',
        },
        likeViewT: {
            height: 60,
            width: 180,
            flexDirection: 'row',
            paddingVertical: '8%',
            backgroundColor: cores[idMes][2],
            borderBottomLeftRadius: 16
        },
        likesView: {
            height: 60,
            width: '50%',
            alignItems: 'center',
            textAlignVertical: 'center',
        },
        likeIcon: {
            fontSize: 20,
            height: 60,
            paddingVertical: '2%',
            paddingLeft: '12%',
            paddingRight: '5%',
        },
        likeText: {
            fontFamily: fonts.heading,
            fontSize: 20,
        },
        likesText: {
            fontFamily: fonts.heading,
            fontSize: 20,
            paddingVertical: '8%',
        },
        postImage: {
            alignSelf: 'center',
            width: 330,
            height: 350,
            marginTop: '2.5%',
        },
        menuOption: {
            height: '100%',
        },
        menuOptionText: {
            fontFamily: fonts.heading,
            fontSize: 20,
            color: colors.vermelho_escuro
        },
        avatar: {
            margin: 1,
            width: 55,
            height: 55,
            alignSelf: 'center',
        }
    });

    const navigation = useNavigation();
    const [ready, setReady] = useState(false);
    const [curtidas, setCurtidas] = useState<number>();
    const [curtido, setCurtido] = useState(false);
    const [dados, setDados] = useState<any>();
    const [novaData, setNovaData] = useState<string>();     

    const avatar1 = require('../assets/avatar1.png');
    const avatar2 = require('../assets/avatar2.png');
    const avatar3 = require('../assets/avatar3.png');
    const avatar4 = require('../assets/avatar4.png');
    const avatar5 = require('../assets/avatar5.png');
    const avatar6 = require('../assets/avatar6.png');

    useEffect(() => {
        async function getData() {
            setDados(await loadLogado());
            await getCurtidas();
            await getNewDate();
            await ifAlreadyLiked();
            
            setReady(true);
        }
        
        getData();
    },[ready]);

    function handlePerfilPessoa() {
        navigation.navigate('LinhaDoTempo', {idUser: idAutor});
    }

    function handleMes() {
        navigation.navigate('Mes', {idMes: idMes});
    }

    function handleDenunciar() {
        Alert.alert(
            "Confirmar Denúncia",
            "Você deseja realmente denunciar esta publicação?",
            [
              {
                text: "Sim",
                onPress: () => {
                    fetch(`${constants.API_URL}/denuncias/id_publicacao=${idPost}`, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((json) => {
                        const denuncias = parseInt(json);

                        if(denuncias < 4)
                        {
                            const id_usuario = parseInt(dados[0]);
                            const id_publicacao = idPost;
                            const publi = { id_usuario, id_publicacao }

                            fetch(`${constants.API_URL}/denuncias`, {
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
                                Alert.alert('Publicação denunciada com sucesso!');
                            })
                            .catch((error) => {
                                Alert.alert('Erro ao denunciar publicação!', error);
                            });
                        }
                        else
                        {
                            const excluido = true;
                            const publi = { excluido }

                            fetch(`${constants.API_URL}/publicacao/excluir/${idPost}`, {
                                method: 'PUT',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(publi)
                            })
                            .then((json) => {
                                Alert.alert('Publicação denunciada com sucesso!');
                            })
                            .catch((error) => {
                                Alert.alert('Erro ao denunciar publicação!', error);
                            });
                        }
                    })
                    .catch((error) => {
                        Alert.alert('Erro ao denunciar publicação!', error);
                    });
                },
              },
              {
                text: "Não",
              },
            ]
        );
    }

    async function getCurtidas() {
        fetch(`${constants.API_URL}/curtidas/id_publicacao=${idPost}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            setCurtidas(json);
        })
        .catch((error) => {
            Alert.alert('Erro ao carregar curtidas!', error);
        })
    }

    async function getNewDate() {
        const mes = data.substring(0, 2);
        const dia = data.substring(3, 5);
        const ano = data.substring(6, 8);

        setNovaData(dia+'/'+mes+'/'+ano);
    } 

    function handleCurtir() {
        setCurtido(true);

        if(curtidas != undefined)
        {
            const val = curtidas+1;
            setCurtidas(val);

            const id_usuario = idLogado;
            const id_publicacao = idPost;
            const publi = { id_publicacao, id_usuario }

            fetch(`${constants.API_URL}/curtidas`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(publi)
            })
            .then((json) => {
                //Alert.alert('Publicação curtida com sucesso!');
            })
            .catch((error) => {
                Alert.alert('Erro ao curtir publicação!', error);
            });
        }
    }

    function handleDescurtir() {
        setCurtido(false);

        if(curtidas != undefined)
        {
            const val = curtidas-1;
            setCurtidas(val);

            const id_usuario = idLogado;
            const id_publicacao = idPost;
            const publi = { id_publicacao, id_usuario }

            fetch(`${constants.API_URL}/curtidas`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(publi)
            })
            .then((json) => {
                //Alert.alert('Publicação descurtida com sucesso!');
            })
            .catch((error) => {
                Alert.alert('Erro ao descurtir publicação!', error);
            });
        }
    }

    async function ifAlreadyLiked() {
        fetch(`${constants.API_URL}/curtidas/id_publicacao=${idPost}/id_usuario=${idLogado}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            if(json[0] != undefined)
                setCurtido(true);
            else
                setCurtido(false);
        })
        .catch((error) => {
            Alert.alert('Erro ao pesquisar curtida!', error);
        });
    }

    return (
        <>
            {
                (ready == true) &&

                <View style={styles.container}>
                    <View style={styles.head}>
                        <View style={styles.profileImageView}>
                            { (avatar == 1) && <Image source={avatar1} style={styles.avatar} resizeMode="contain"/> }
                            { (avatar == 2) && <Image source={avatar2} style={styles.avatar} resizeMode="contain"/> }
                            { (avatar == 3) && <Image source={avatar3} style={styles.avatar} resizeMode="contain"/> }
                            { (avatar == 4) && <Image source={avatar4} style={styles.avatar} resizeMode="contain"/> }
                            { (avatar == 5) && <Image source={avatar5} style={styles.avatar} resizeMode="contain"/> }
                            { (avatar == 6) && <Image source={avatar6} style={styles.avatar} resizeMode="contain"/> }
                        </View>
                        <View style={styles.profileTextsView}>
                            <TouchableOpacity onPress={handlePerfilPessoa}>
                            <View style={styles.nameTextView}>
                                <Text style={styles.nameText}> {nome} </Text>
                            </View>
                            <View style={styles.dateTextView}>
                                <Text style={styles.dateText}> {hora} - {novaData} </Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                        <Menu>
                        <MenuTrigger>
                            <View style={styles.ellipsisView}>
                                <FontAwesome5 name="ellipsis-v" style={styles.ellipsisIcon}/>
                            </View>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={handleDenunciar} style={styles.menuOption}>
                                <Text style={styles.menuOptionText}>
                                    Denunciar
                                </Text>
                            </MenuOption>
                        </MenuOptions>
                        </Menu>
                    </View>

                    <View style={styles.tagView}>
                        <TouchableOpacity onPress={handleMes}>
                            <Text style={styles.tagText}>#{months[idMes][1]}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.textView}>
                        <Text style={styles.textText}>
                            {conteudo}
                        </Text>
                        {
                            (imagem != "none") &&
                            
                            <Image source={{ uri: imagem }} style={styles.postImage} resizeMode="stretch"/>
                        }
                    </View>

                    <View style={styles.bottom}>
                        {
                            (curtido == false) &&

                            <TouchableOpacity onPress={handleCurtir}>
                            <View style={styles.likeViewF}>
                                <Feather name="thumbs-up" style={styles.likeIcon}/>
                                <Text style={styles.likeText}>Curtir</Text>
                            </View>
                            </TouchableOpacity>
                        }
                        {
                            (curtido == true) &&

                            <TouchableOpacity onPress={handleDescurtir}>
                            <View style={styles.likeViewT}>
                                <Feather name="thumbs-up" style={styles.likeIcon}/>
                                <Text style={styles.likeText}>Curtido</Text>
                            </View>
                            </TouchableOpacity>
                        }
                        <View style={styles.likesView}>
                            <Text style={styles.likesText}>{curtidas}</Text>
                        </View>
                    </View>
                </View>
            }
        </>
    )
};