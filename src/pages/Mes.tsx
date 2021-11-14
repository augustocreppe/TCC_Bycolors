import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Titulo } from '../components/Titulo';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { Accordion } from '../components/Accordion';
import { Contato } from '../components/CardContatos';
import { TituloComunidade } from '../components/TituloComunidade';
import { contatos1, contatos2, contatos3, contatos4, contatos5, contatos6, contatos7, contatos8, contatos9, contatos10, contatos11, contatos12, months, outras1, outras2, outras3, outras4, outras5, outras6, outras7, outras8, outras9, outras10, outras11, outras12 } from '../styles/info';
import fonts from '../styles/fonts';

export function Mes({ route }: { route: any }) {
    const navigation = useNavigation();
    const [ready, setReady] = useState(false);
    const idMes = route.params.idMes;
    const [array, setArray] = useState<any>();
    const [array2, setArray2] = useState<any>();
    const [visibleModal, setVisibeModal] = useState(false);

    function handleGoBack() {
        navigation.goBack();
    }

    function handleInfo() {
        setVisibeModal(true)
    }

    useEffect(() => {
        async function getData() {
            await setarArray();

            setReady(true);
        }
        
        getData();
    },[ready]);

    async function setarArray() {
        if(idMes == 1){ setArray(contatos1); setArray2(outras1) }
        else if(idMes == 2){ setArray(contatos2); setArray2(outras2) }
        else if(idMes == 3){ setArray(contatos3); setArray2(outras3) }
        else if(idMes == 4){ setArray(contatos4); setArray2(outras4) }
        else if(idMes == 5){ setArray(contatos5); setArray2(outras5) }
        else if(idMes == 6){ setArray(contatos6); setArray2(outras6) }
        else if(idMes == 7){ setArray(contatos7); setArray2(outras7) }
        else if(idMes == 8){ setArray(contatos8); setArray2(outras8) }
        else if(idMes == 9){ setArray(contatos9); setArray2(outras9) }
        else if(idMes == 10){ setArray(contatos10); setArray2(outras10) }
        else if(idMes == 11){ setArray(contatos11); setArray2(outras11) }
        else if(idMes == 12){ setArray(contatos12); setArray2(outras12) }
    }
    
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

                        <TouchableOpacity onPress={handleInfo} style={styles.buttonMenu2}>
                            <Feather name="info" style={styles.buttonMenuIcon2}/>
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView style={styles.scrollView}> 
                    <View style={styles.contentView}>
                        <Titulo idMes={idMes}/>
                        <Accordion idMes={idMes}/>

                        <View style={styles.spaceView}/>
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

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={visibleModal}
                        onRequestClose={() => {setVisibeModal(false)}}
                    >
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>
                                Outras Campanhas
                            </Text>

                            <Text style={styles.modalText}> 
                                Além de {months[idMes][0]}, há também outras campanhas que ocorrem nesse mês, como: (clique para saber mais)
                            </Text>

                            {
                                (array2 != undefined) &&

                                array2.map((json: any) =>
                                    <View style={styles.sphereView}>
                                    <TouchableOpacity onPress={() => {Linking.openURL(json[3]);}}>
                                        <View style={styles.sphereInnerView}>
                                            <View style={[styles.sphere, {backgroundColor: json[2] } ]}/>
                                            <Text style={styles.sphereTitle}>{json[0]}</Text>
                                        </View>
                                        <Text style={styles.sphereText}>{json[1]}</Text>
                                    </TouchableOpacity>
                                    </View>
                                )
                            }

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {setVisibeModal(false)}}
                            >
                                <Text style={styles.textStyle}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
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
    topView: {
        flexDirection: 'row',
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
    buttonMenu2: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 270,
        height: 56,
        width: 56,
    },
    buttonMenuIcon: {
        fontSize: 40,
        color: colors.body_dark,
    },
    buttonMenuIcon2: {
        fontSize: 35,
        color: colors.body_dark,
    },
    contentView: {
        height: 'auto',
    },
    spaceView: {
        marginTop: 30,
    },  
    scrollView: {
        flex:1
    },
    modalView: {
        margin: 20,
        backgroundColor: colors.branco,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        elevation: 5
    },
    button: {
        borderRadius: 20,
        height: 'auto',
        width: 200,
        padding: 10,
        backgroundColor: colors.body_dark,
        marginTop: 15,
    },
    textStyle: {
        fontFamily: fonts.heading,
        color: colors.branco,
        fontSize: 20,
        textAlign: "center"
    },
    modalText: {
        fontFamily: fonts.text,
        fontSize: 20,
        marginBottom: 15,
        textAlign: "justify"
    },
    modalTitle: {
        fontFamily: fonts.heading,
        fontSize: 30,
        marginBottom: 15,
    },
    sphere: {
        height: 40,
        width: 40,
        borderRadius: 100,
    },
    sphereView: {
        marginVertical: 10,
        width: 340,
        textAlignVertical: 'center',
    },
    sphereInnerView: {
        flexDirection: 'row',
    },
    sphereText: {
        fontFamily: fonts.text,
        fontSize: 18,
        marginLeft: 45,
        textAlign: 'left',
        marginTop: -10,
    },
    sphereTitle: {
        textAlignVertical: 'center',
        fontFamily: fonts.heading,
        fontSize: 20,
        marginBottom: 15,
        marginLeft: 5,
        marginVertical: 5,
    }
});