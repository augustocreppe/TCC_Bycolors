import React, { useState }  from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import fonts from '../styles/fonts';
const profile = require('../assets/profile.png');

export function Usuario() {
    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [nomeCampo, setNomeCampo] = useState<string>();

    function handleGoBack() {
        navigation.navigate('MenuLateral');
    }

    function handleEnter() {
        navigation.navigate('Calendario');
    }

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!nomeCampo);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value: string){
        setIsFilled(!!value);
        setNomeCampo(value);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.buttonCancelar}>
                        <Text style={styles.text}>Cancelar                     </Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>  Editar Perfil             </Text>

                    <Text style={styles.buttonConcluir}>Concluir</Text>
                </View>
                <View style={styles.lineView}>
                    <Text style={styles.line}>______________</Text>
                </View>

                <View style={styles.imageView}>
                    <Image 
                        source={profile} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.complement}>Alterar foto do perfil</Text>

                <View style={styles.lineView}>
                    <Text style={styles.line}>______________</Text>
                </View>
                <View style={styles.campos}>
                    <Text style={styles.campo_alteracao}>Nome  </Text>
                    <TextInput
                            style={[
                                styles.input, 
                                (isFocused || isFilled) &&
                                { borderColor: colors.azul_escuro }
                            ]}
                            placeholder="Fulana da Silva"

                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />
                </View>
                <View style={styles.lineDivisorView}>
                    <Text style={styles.line}>__________</Text>
                </View>
                <View style={styles.campos}>
                    <Text style={styles.campo_alteracao}>Senha </Text>
                    <TextInput
                            style={[
                                styles.input, 
                                (isFocused || isFilled) &&
                                { borderColor: colors.azul_escuro }
                            ]}
                            placeholder="•••••••••••••••"

                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />
                </View>
                <View style={styles.lineDivisorView}>
                    <Text style={styles.line}>__________</Text>
                </View> 
                <View style={styles.campos}>
                    <Text style={styles.campo_alteracao}>E-mail </Text>
                    <TextInput
                            style={[
                                styles.input, 
                                (isFocused || isFilled) &&
                                { borderColor: colors.azul_escuro }
                            ]}
                            placeholder="fulanasilva@gmail.com"

                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />
                </View>
                <View style={styles.lineDivisorView}>
                    <Text style={styles.line}>__________</Text>
                </View>   
                <View style={styles.campos}>
                    <Text style={styles.campo_alteracao}>Telefone      </Text>
                    <TextInput
                            style={[
                                styles.inputMaior, 
                                (isFocused || isFilled) &&
                                { borderColor: colors.azul_escuro }
                            ]}
                            placeholder="3333-3333"

                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />
                </View>
                <View style={styles.lineDivisorView}>
                    <Text style={styles.line}>__________</Text>
                </View>     
                <View style={styles.campos}>
                    <Text style={styles.campo_alteracao}>Cidade</Text>
                    <TextInput
                            style={[
                                styles.input, 
                                (isFocused || isFilled) &&
                                { borderColor: colors.azul_escuro }
                            ]}
                            placeholder="Bauru"

                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />
                </View>
                <View style={styles.lineDivisorView}>
                    <Text style={styles.line}>__________</Text>
                </View>  
                <View style={styles.campos}>
                    <Text style={styles.campo_alteracao}>Estado</Text>
                    <TextInput
                            style={[
                                styles.input, 
                                (isFocused || isFilled) &&
                                { borderColor: colors.azul_escuro }
                            ]}
                            placeholder="SP"

                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />
                </View>
                <View style={styles.lineDivisorView}>
                    <Text style={styles.line}>__________</Text>
                </View>  
                <View style={styles.campos}>
                    <Text style={styles.campo_alteracao}>Biografia      </Text>
                    <TextInput
                            style={[
                                styles.inputMaior, 
                                (isFocused || isFilled) &&
                                { borderColor: colors.azul_escuro }
                            ]}
                            placeholder="Descrição"

                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />
                </View>
                <View style={styles.lineDivisorView}>
                    <Text style={styles.line}>__________</Text>
                </View>

                 <TouchableOpacity style={styles.button}>
                            <Feather name="x-circle" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Deletar Conta</Text>
                        </TouchableOpacity>
            </View>
        </SafeAreaView>
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
    buttonCancelar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 125,
    },
    buttonMenuIcon: {
        fontSize: 40,
        color: colors.body_dark,
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 23,
        fontFamily: fonts.heading,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontFamily: fonts.text,
    },
    buttonConcluir: {
        fontFamily: fonts.heading,
        fontSize: 20,
        color: colors.body_dark,
    },
    lineView: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
    },
    lineDivisorView: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: -20,
    },
    line: {
        fontSize: 20,
        color: colors.cinza_claro,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    image: {
        width: 150,
        height: 150,
    },
    complement: {
        fontFamily: fonts.heading,
        color: colors.body_dark,
        fontSize: 15,
        marginTop: 10,
        marginHorizontal: 140,
        marginBottom: 10,
    },
    campos: {
        flexDirection: 'row',
    },
    campo_alteracao: {
        fontFamily: fonts.text,
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },
    input: {
        color: colors.heading,
        fontSize: 20,
        marginHorizontal: 25,
        padding: 10,
        textAlign: 'justify',
    },
    inputMaior: {
        color: colors.heading,
        fontSize: 20,
        marginHorizontal: -14,
        padding: 10,
        textAlign: 'justify',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: colors.vermelho,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 120,
        marginBottom: 4,
        marginHorizontal: '7%',
        height: 50,
        width: '86%',
    },
    buttonIcon: {
        fontSize: 20,
        color: colors.branco,
        marginRight: 10
    },
    buttonText: {
        fontSize: 20,
        color: colors.branco,
        fontFamily: fonts.heading
    },
});