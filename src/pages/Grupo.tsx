import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { TituloComunidade } from '../components/TituloComunidade';
import { months } from '../styles/info';
import { ScrollView } from 'react-native-gesture-handler';
import { Post } from '../components/Post';
import { AddFile } from '../components/AddFile';

export function Grupo({ route }: { route: any }) {
    const navigation = useNavigation();
    const idMes = route.params.idMes;
    
    const name1 = "Publicações - ";
    const name2 = months[idMes][0];
    const name = name1.concat(name2);

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View style={styles.topView}>
                <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                    <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
                </TouchableOpacity>

                <AddFile idMes={idMes}/>
            </View>
            
            <TituloComunidade idMes={idMes} text={name}/>

            <View style={styles.scrollView}>
            <ScrollView>
                <Post idMes={idMes}/>
                <Post idMes={idMes}/>
                <Post idMes={idMes}/>
            </ScrollView>
            </View>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
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
    scrollView: {
        height: 652,
        alignSelf: 'center',
    },
    topView: {
        flexDirection: 'row',
        marginBottom: -10, 
    },
});
