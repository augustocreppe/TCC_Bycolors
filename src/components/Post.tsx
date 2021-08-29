import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TouchableOpacityProps, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { cores } from '../styles/colors';
import { months } from '../styles/info';
import fonts from '../styles/fonts';

const postIimage = require('../assets/exemplo.jpg');

interface PostProps extends TouchableOpacityProps {
    idMes: number;
}

export function Post ({ idMes, ...rest }: PostProps) {
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
        }
    });

    const navigation = useNavigation();

    function handleMes() {
        navigation.navigate('Mes', {idMes: idMes});
    }

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.profileImageView}>
                    <FontAwesome5 name="user-circle" style={styles.profileImage}/>
                </View>
                <View style={styles.profileTextsView}>
                    <View style={styles.nameTextView}>
                        <Text style={styles.nameText}> Fulano da Silva </Text>
                    </View>
                    <View style={styles.dateTextView}>
                        <Text style={styles.dateText}> 11:14 - 14/08/2021 </Text>
                    </View>
                </View>
                <View style={styles.ellipsisView}>
                    <TouchableOpacity>
                        <FontAwesome5 name="ellipsis-v" style={styles.ellipsisIcon}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tagView}>
                <TouchableOpacity onPress={handleMes}>
                    <Text style={styles.tagText}>#{months[idMes][1]}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.textView}>
                <Image source={postIimage} style={styles.postImage} resizeMode="cover"/>
                <Text style={styles.textText}>
                    Isso é um exemplo de texto que podemos colocar para uma publicação. Ele fica desse jeito, e eu prefiro que ele esteja justificado.
                </Text>
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity style={styles.likeView}>
                <View style={styles.thumbView}>
                    <Feather name="thumbs-up" style={styles.likeIcon}/>
                    <Text style={styles.likeText}>Curtir</Text>
                </View>
                <View style={styles.likesView}>
                    <Text style={styles.likesText}>333</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareView}>
                    <FontAwesome5 name="share-alt" style={styles.shareIcon}/>
                    <Text style={styles.shareText}>Compartilhar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};