import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Titulo } from '../components/Titulo';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { Accordion } from '../components/Accordion';
import { Contato } from '../components/CardContatos';
import { TituloComunidade } from '../components/TituloComunidade';
import { contatos1, contatos2, contatos3, contatos4, contatos5, contatos6, contatos7, contatos8, contatos9, contatos10, contatos11, contatos12 } from '../styles/info';

export function Mes({ route }: { route: any }) {
    const navigation = useNavigation();
    const [ready, setReady] = useState(false);
    const idMes = route.params.idMes;
    const [array, setArray] = useState<any>();

    function handleGoBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function getData() {
            await setarArray();

            setReady(true);
        }
        
        getData();
    },[ready]);

    async function setarArray() {
        if(idMes == 1){ setArray(contatos1); }
        else if(idMes == 2){ setArray(contatos2); }
        else if(idMes == 3){ setArray(contatos3); }
        else if(idMes == 4){ setArray(contatos4); }
        else if(idMes == 5){ setArray(contatos5); }
        else if(idMes == 6){ setArray(contatos6); }
        else if(idMes == 7){ setArray(contatos7); }
        else if(idMes == 8){ setArray(contatos8); }
        else if(idMes == 9){ setArray(contatos9); }
        else if(idMes == 10){ setArray(contatos10); }
        else if(idMes == 11){ setArray(contatos11); }
        else if(idMes == 12){ setArray(contatos12); }
    }
    
    return (
        <>
            {
                (ready == true) &&

                <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                        <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
                    </TouchableOpacity>
                
                    <ScrollView style={styles.scrollView}> 
                    <View style={styles.contentView}>
                        <Titulo idMes={idMes}/>
                        <Accordion idMes={idMes}/>
                        <TituloComunidade idMes={idMes} text={"Contatos"}/>
        
                        {
                            (array != undefined) &&

                            array.map((json: any) =>
                                <Contato
                                    idMes={idMes}
                                    nomeLugar={json[0]}
                                    telefone={json[1]}
                                    site={json[2]}
                                    email={json[3]}
                                />
                            )
                        }
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
    contentView: {
        height: 'auto',
    },
    scrollView: {
        flex:1
    }
});