import React, { useEffect, useState } from "react";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import fonts from "../styles/fonts";
import { loadLogado } from "../libs/storage";

interface ButtonProps extends TouchableOpacityProps{
    title: string;
    icone: 'users' | 'comments' | 'id-card';
}

export function ButtonComunidade ({title, icone, ...rest}: ButtonProps){
    const navigation = useNavigation();
    const [ready, setReady] = useState(false);
    const [dados, setDados] = useState<any>();

    useEffect(() => {
        async function getData() {
            setDados(await loadLogado());

            setReady(true);
        }
        
        getData();
    },[ready]);
    
    function handleGoToPage() {
        if(icone == 'users')
        {
            navigation.navigate('Grupos');
        }
        else if(icone == 'comments')
        {
            navigation.navigate('Chats');
        }
        else if(icone == 'id-card')
        {
            navigation.navigate('LinhaDoTempo', {idUser: dados[0]});
        }
    }

    return(
        <>
            {
                (ready == true) &&

                <TouchableOpacity style={styles.buttonView} onPress={handleGoToPage}>
                    <View style={styles.circleView}>
                        <FontAwesome name={icone} style={styles.buttonIcon}/>
                        
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.buttonText}>{title}</Text>
                    </View>
                </TouchableOpacity>
            }
        </>
    )
}

const styles= StyleSheet.create({
    buttonView:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: 100,
    },
    circleView: {
        height: 100,
        width: '100%',
        backgroundColor: colors.body_light,
        borderRadius: 100,
        alignItems: 'center',
    },
    textView: {
        height: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonIcon:{
        fontSize: 40,
        color: colors.body_dark,
        top: '30%',
    },
    buttonText:{
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    },
});