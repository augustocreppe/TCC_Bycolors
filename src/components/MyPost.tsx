import React from 'react';
import fonts from '../styles/fonts';
import { StyleSheet, Text, TouchableOpacity, View, TouchableOpacityProps, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, cores } from '../styles/colors';
import { months } from '../styles/info';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { constants } from '../config/app.config';

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

export function MyPost ({ idMes, avatar, nome, hora, data, imagem, conteudo, idAutor, idPost, idLogado, ...rest }: PostProps) {
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
        likeView: {
            height: 60,
            width: '50%',
            flexDirection: 'row',
        },
        thumbView: {
            width: '60%',
            flexDirection: 'row',
        },
        likesView: {
            height: 60,
            width: '40%',
            alignItems: 'center',
        },
        shareView: {
            height: 60,
            width: '50%',
            flexDirection: 'row',
        },
        likeIcon: {
            fontSize: 20,
            height: 60,
            paddingVertical: '17%',
            paddingLeft: '12%',
            paddingRight: '5%',
        },
        shareIcon: {
            fontSize: 20,
            height: 60,
            paddingVertical: '10%',
            paddingLeft: '10%',
            paddingRight: '3%',
        },
        likeText: {
            fontFamily: fonts.heading,
            fontSize: 20,
            paddingVertical: '12%',
        },
        likesText: {
            fontFamily: fonts.heading,
            fontSize: 20,
            paddingVertical: '17%',
        },
        shareText: {
            fontFamily: fonts.heading,
            fontSize: 20,
            paddingVertical: '7%',
        },
        postImage: {
            alignSelf: 'center',
            width: 340,
            height: 340,
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
            height: '95%',
            width: '95%',
            alignSelf: 'center',
        }
    });

    const navigation = useNavigation();

    const avatar1 = require('../assets/avatar1.png');
    const avatar2 = require('../assets/avatar2.png');
    const avatar3 = require('../assets/avatar3.png');
    const avatar4 = require('../assets/avatar4.png');
    const avatar5 = require('../assets/avatar5.png');
    const avatar6 = require('../assets/avatar6.png');

    const postImage = require('../assets/outubro.jpg');
    const curtidas = "";

    function handlePerfilPessoa() {
        navigation.navigate('LinhaDoTempo', {idUser: idAutor});
    }

    function handleMes() {
        navigation.navigate('Mes', {idMes: idMes});
    }

    function handleExcluir() {
        Alert.alert(
            "Confirmar Exclusão",
            "Você deseja realmente excluir esta publicação?",
            [
              {
                text: "Sim",
                onPress: () => {
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
                        Alert.alert('Publicação excluída com sucesso!');
                    })
                    .catch((error) => {
                        Alert.alert('Erro ao excluir publicação!', error);
                    });
                },
              },
              {
                text: "Não",
              },
            ]
        );
    }

    return (
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
                        <Text style={styles.dateText}> {hora} - {data} </Text>
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
                    <MenuOption onSelect={handleExcluir} style={styles.menuOption}>
                        <Text style={styles.menuOptionText}>
                            Excluir
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
                {
                    (imagem != "none") &&
                    <Image source={postImage} style={styles.postImage} resizeMode="cover"/>
                }
                <Text style={styles.textText}>
                    {conteudo}
                </Text>
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity style={styles.likeView}>
                <View style={styles.thumbView}>
                    <Feather name="thumbs-up" style={styles.likeIcon}/>
                    <Text style={styles.likeText}>Curtir</Text>
                </View>
                <View style={styles.likesView}>
                    <Text style={styles.likesText}>{curtidas}</Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
    )
};