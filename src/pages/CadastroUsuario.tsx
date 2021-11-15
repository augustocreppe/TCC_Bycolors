import React, { useEffect, useState }  from 'react';
import fonts from '../styles/fonts';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';
import { constants } from '../config/app.config';
import { saveLogado } from '../libs/storage';

const avatar1 = require('../assets/avatar1.png');
const avatar2 = require('../assets/avatar2.png');
const avatar3 = require('../assets/avatar3.png');
const avatar4 = require('../assets/avatar4.png');
const avatar5 = require('../assets/avatar5.png');
const avatar6 = require('../assets/avatar6.png');

export function CadastroUsuario() {
    const navigation = useNavigation();
    const [emailExiste, setEmailExiste] = useState(false);

    const [nameGreen, setNameGreen] = useState(false);
    const [nameRed, setNameRed] = useState(false);
    const [emailGreen, setEmailGreen] = useState(false);
    const [emailRed, setEmailRed] = useState(false);
    const [telGreen, setTelGreen] = useState(false);
    const [telRed, setTelRed] = useState(false);
    const [cityGreen, setCityGreen] = useState(false);
    const [cityRed, setCityRed] = useState(false);
    const [ufGreen, setUfGreen] = useState(false);
    const [ufRed, setUfRed] = useState(false);
    const [avatarGreen, setAvatarGreen] = useState(false);
    const [avatarRed, setAvatarRed] = useState(false);
    const [bioGreen, setBioGreen] = useState(false);
    const [bioRed, setBioRed] = useState(false);
    const [passwordGreen, setPasswordGreen] = useState(false);
    const [passwordRed, setPasswordRed] = useState(false);
    const [password2Green, setPassword2Green] = useState(false);
    const [password2Red, setPassword2Red] = useState(false);

    const [B1Pressed, setB1Pressed] = useState(false);
    const [B2Pressed, setB2Pressed] = useState(false);
    const [B3Pressed, setB3Pressed] = useState(false);
    const [B4Pressed, setB4Pressed] = useState(false);
    const [B5Pressed, setB5Pressed] = useState(false);
    const [B6Pressed, setB6Pressed] = useState(false);

    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [tel, setTel] = useState<string>();
    const [city, setCity] = useState<string>();
    const [uf, setUf] = useState<string>('s');
    const [bio, setBio] = useState<string>();
    const [avatar, setAvatar] = useState<number>();
    const [password, setPassword] = useState<string>();
    const [password2, setPassword2] = useState<string>();

    const [nameIsFilled, setNameIsFilled] = useState(false);
    const [emailIsFilled, setEmailIsFilled] = useState(false);
    const [telIsFilled, setTelIsFilled] = useState(false);
    const [cityIsFilled, setCityIsFilled] = useState(false);
    const [ufIsFilled, setUfIsFilled] = useState(false);
    const [avatarIsFilled, setAvatarIsFilled] = useState(false);
    const [bioIsFilled, setBioIsFilled] = useState(false);
    const [passwordIsFilled, setPasswordIsFilled] = useState(false);
    const [password2IsFilled, setPassword2IsFilled] = useState(false);

    useEffect(() => {
        async function verify() {
            if(email != null)
                handleEmailBlur();
        }
        
        verify();
    },[emailExiste]);

    //Voltar
    function handleGoBack() {
        navigation.goBack();
    }

    //Cadastrar
    function handleSubmit() {
        if(nameIsFilled && emailIsFilled && telIsFilled && cityIsFilled && ufIsFilled && avatarIsFilled && bioIsFilled && passwordIsFilled && password2IsFilled){
            const nome_usuario = name;
            const telefone = tel;
            const cidade = city;
            const estado = uf;
            const senha = password;

            const user = { adm:false, nome_usuario, email, telefone, cidade, estado, bio, avatar, senha }

            fetch(`${constants.API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then((response) => {
                return response.json()
            })
            .then(async (json) => {
                Alert.alert('Usuário cadastrado com sucesso!');
                await saveLogado(
                    json.id_usuario, 
                    json.nome_usuario, 
                    json.telefone, 
                    json.email, 
                    json.senha,
                    json.cidade,
                    json.estado,
                    json.avatar,
                    json.bio,
                );
                navigation.navigate('Calendario');
            })
            .catch((error) => {
                Alert.alert('Erro ao salvar os dados!', error);
            });
        }
        else {
            Alert.alert('Preencha todos os campos corretamente!');
        }
    }

    //Verifica se Email existe
    function VerificarEmail(email: string) {
        fetch(`${constants.API_URL}/usuarios/email=${email}`, {
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
            {
                Alert.alert('Email já cadastrado!');
                setEmailExiste(true);
            }
            else
            {
                setEmailExiste(false);
            }
        })
        .catch((error) => {
            Alert.alert('Erro ao encontrar email!', error);
        });
    }

    //Desfoque do Campo
    function handleNameBlur(){
        setNameIsFilled(!!name);

        if(name != undefined)
        {
            if(name.length > 2)
            {
                setNameGreen(true);
                setNameRed(false);
            }
            else  
            {
                setNameRed(true);
                setNameGreen(false);
            }
        }
        else
            setNameRed(true);
    }
    function handleEmailBlur(){
        setEmailIsFilled(!!email);

        if(email != undefined)
        {
            VerificarEmail(email);

            if(email.includes('@') && !email.includes(' ') && !emailExiste)
            {
                setEmailGreen(true);
                setEmailRed(false);
            }
            else
            {
                setEmailRed(true);
                setEmailGreen(false);
            }
        }
        else
            setEmailRed(true);
    }
    function handleTelBlur(){
        setTelIsFilled(!!tel);

        if(tel != undefined)
        {
            if(tel.length == 13 || tel.length == 14)
            {
                setTelGreen(true);
                setTelRed(false);
            }
            else  
            {
                setTelRed(true);
                setTelGreen(false);
            }
        }
        else
            setTelRed(true);
    }
    function handleCityBlur(){
        setCityIsFilled(!!city);

        if(city != undefined)
        {
            if(city.length > 2)
            {
                setCityGreen(true);
                setCityRed(false);
            }
            else  
            {
                setCityRed(true);
                setCityGreen(false);
            }
        }
        else
            setCityRed(true);
    }
    function handleBioBlur(){
        setBioIsFilled(!!bio);

        if(bio != undefined)
        {
            if(bio.length > 2)
            {
                setBioGreen(true);
                setBioRed(false);
            }
            else  
            {
                setBioRed(true);
                setBioGreen(false);
            }
        }
        else
            setBioRed(true);
    }
    function handlePasswordBlur(){
        setPasswordIsFilled(!!password);

        if(password != undefined)
        {
            if(password.length > 7)
            {
                setPasswordGreen(true);
                setPasswordRed(false);
            }
            else  
            {
                setPasswordRed(true);
                setPasswordGreen(false);
            }
        }
        else
            setPasswordRed(true);
    }
    function handlePassword2Blur(){
        setPassword2IsFilled(!!password2);

        if(password2 != undefined)
        {
            if(password != undefined)
            {
                if(password == password2) {
                    setPassword2Green(true);
                    setPassword2Red(false);
                }
                else  
                {
                    setPassword2Red(true);
                    setPassword2Green(false);
                }
            }
            else
                setPassword2Red(true);
        }
        else
            setPassword2Red(true);
    }

    //Mudança de Valor
    function handleNameChange(value: string){
        setNameIsFilled(!!value);
        setName(value);
    }
    function handleEmailChange(value: string){
        setEmailIsFilled(!!value);
        setEmail(value);
    }
    function handleTelChange(value: string){
        setTelIsFilled(!!value);
        setTel(value);
    }
    function handleCityChange(value: string){
        setCityIsFilled(!!value);
        setCity(value);
    }
    function handleUfChange(value: string){
        setUfIsFilled(!!value);
        setUf(value);
    }
    function handleBioChange(value: string){
        setBioIsFilled(!!value);
        setBio(value);
    }
    function handlePasswordChange(value: string){
        setPasswordIsFilled(!!value);
        setPassword(value);
    }
    function handlePassword2Change(value: string){
        setPassword2IsFilled(!!value);
        setPassword2(value);
    }

    //Escolha do Avatar
    function handleB1() {
        if(B1Pressed==false)
        {
            setB1Pressed(true);
            setB2Pressed(false);
            setB3Pressed(false);
            setB4Pressed(false);
            setB5Pressed(false);
            setB6Pressed(false);

            setAvatarIsFilled(true);
            setAvatar(1);
        }
        else
        {
            setAvatarIsFilled(false);
            setB1Pressed(false);
            setAvatar(0);
        }
    }
    function handleB2() {
        if(B2Pressed==false)
        {
            setB1Pressed(false);
            setB2Pressed(true);
            setB3Pressed(false);
            setB4Pressed(false);
            setB5Pressed(false);
            setB6Pressed(false);

            setAvatarIsFilled(true);
            setAvatar(2);
        }
        else
        {
            setAvatarIsFilled(false);
            setB2Pressed(false);
            setAvatar(0);
        }
    }
    function handleB3() {
        if(B3Pressed==false)
        {
            setB1Pressed(false);
            setB2Pressed(false);
            setB3Pressed(true);
            setB4Pressed(false);
            setB5Pressed(false);
            setB6Pressed(false);

            setAvatarIsFilled(true);
            setAvatar(3);
        }
        else
        {
            setAvatarIsFilled(false);
            setB3Pressed(false);
            setAvatar(0);
        }
    }
    function handleB4() {
        if(B4Pressed==false)
        {
            setB1Pressed(false);
            setB2Pressed(false);
            setB3Pressed(false);
            setB4Pressed(true);
            setB5Pressed(false);
            setB6Pressed(false);

            setAvatarIsFilled(true);
            setAvatar(4);
        }
        else
        {
            setAvatarIsFilled(false);
            setB4Pressed(false);
            setAvatar(0);
        }
    }
    function handleB5() {
        if(B5Pressed==false)
        {
            setB1Pressed(false);
            setB2Pressed(false);
            setB3Pressed(false);
            setB4Pressed(false);
            setB5Pressed(true);
            setB6Pressed(false);

            setAvatarIsFilled(true);
            setAvatar(5);
        }
        else
        {
            setAvatarIsFilled(false);
            setB5Pressed(false);
            setAvatar(0);
        }
    }
    function handleB6() {
        if(B6Pressed==false)
        {
            setB1Pressed(false);
            setB2Pressed(false);
            setB3Pressed(false);
            setB4Pressed(false);
            setB5Pressed(false);
            setB6Pressed(true);

            setAvatarIsFilled(true);
            setAvatar(6);
        }
        else
        {
            setAvatarIsFilled(false);
            setB6Pressed(false);
            setAvatar(0);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                    <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
                </TouchableOpacity>

                <ScrollView>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Cadastrar Usuário</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.textHolder}>
                        <Entypo name="user" style={styles.iconHolder}/>
                        {' '}Nome
                    </Text>    
                    <TextInput
                        style={[
                            styles.inputHolder,

                            (nameGreen) &&
                            { borderColor: colors._verde },

                            (nameRed) &&
                            { borderColor: colors._vermelho },
                        ]}
                        placeholder="Ex: Fulana da Silva"
                        maxLength={50}
                        onBlur={handleNameBlur}
                        onChangeText={handleNameChange}
                    />

                    <Text style={styles.textHolder}>
                        <Entypo name="mail" style={styles.iconHolder}/>
                        {' '}E-mail
                    </Text>  
                    <TextInput
                        style={[
                            styles.inputHolder,

                            (emailGreen) &&
                            { borderColor: colors._verde },

                            (emailRed) &&
                            { borderColor: colors._vermelho },
                        ]}
                        placeholder="Ex: joao@gmail.com"
                        maxLength={50}
                        onBlur={handleEmailBlur}
                        onChangeText={handleEmailChange}
                    />

                    <Text style={styles.textHolder}>
                        <Entypo name="phone" style={styles.iconHolder}/>
                        {' '}Telefone
                    </Text>
                    <TextInputMask
                        style={[
                            styles.inputHolder,

                            (telGreen) &&
                            { borderColor: colors._verde },

                            (telRed) &&
                            { borderColor: colors._vermelho },
                        ]}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99)'
                        }}
                        value={tel}
                        placeholder="Ex: (14)99123-4567"
                        onBlur={handleTelBlur}
                        onChangeText={handleTelChange}
                    />

                    <Text style={styles.textHolder}>
                        <Entypo name="location" style={styles.iconHolder}/>
                        {' '}Cidade
                    </Text>      
                    <TextInput
                        style={[
                            styles.inputHolder,

                            (cityGreen) &&
                            { borderColor: colors._verde },

                            (cityRed) &&
                            { borderColor: colors._vermelho },
                        ]}
                        placeholder="Ex: Bauru"
                        maxLength={50}
                        onBlur={handleCityBlur}
                        onChangeText={handleCityChange}
                    />

                    <Text style={styles.textHolder}>
                        <Entypo name="map" style={styles.iconHolder}/>
                        {' '}Estado
                    </Text>
                    <View style={[styles.pickerView, (uf == '0') && { borderColor: colors._vermelho}, (uf != '0' && uf != 's') && { borderColor: colors._verde} ]}>
                    <Picker
                        style={[
                            styles.inputHolder2,
                        ]}
                        selectedValue={uf}
                        onValueChange={handleUfChange}
                    >
                        <Picker.Item label="Selecione o Estado" value="0" />
                        <Picker.Item label="Acre" value="AC" />
                        <Picker.Item label="Alagoas" value="AL" />
                        <Picker.Item label="Amapá" value="AP" />
                        <Picker.Item label="Amazonas" value="AM" />
                        <Picker.Item label="Bahia" value="BA" />
                        <Picker.Item label="Ceará" value="CE" />
                        <Picker.Item label="Distrito Federal" value="DF" />
                        <Picker.Item label="Espírito Santo" value="ES" />
                        <Picker.Item label="Goiás" value="GO" />
                        <Picker.Item label="Maranhão" value="MA" />
                        <Picker.Item label="Mato Grosso" value="MT" />
                        <Picker.Item label="Mato Grosso do Sul" value="MS" />
                        <Picker.Item label="Minas Gerais" value="MG" />
                        <Picker.Item label="Pará" value="PA" />
                        <Picker.Item label="Paraíba" value="PB" />
                        <Picker.Item label="Paraná" value="PR" />
                        <Picker.Item label="Pernambuco" value="PB" />
                        <Picker.Item label="Piauí" value="PI" />
                        <Picker.Item label="Rio de Janeiro" value="RJ" />
                        <Picker.Item label="Rio Grande do Norte" value="RN" />
                        <Picker.Item label="Rio Grande do Sul" value="RS" />
                        <Picker.Item label="Rondônia" value="RO" />
                        <Picker.Item label="Roraima" value="RR" />
                        <Picker.Item label="Santa Catarina" value="SC" />
                        <Picker.Item label="São Paulo" value="SP" />
                        <Picker.Item label="Sergipe" value="SE" />
                        <Picker.Item label="Tocantins" value="TO" />
                    </Picker>
                    </View>

                    <Text style={styles.textHolder}>
                        <Entypo name="emoji-happy" style={styles.iconHolder}/>
                        {' '}Avatar
                    </Text>
                    <View style={[styles.avatarView, (avatarGreen) && { borderColor: colors._verde },  (avatarRed) && { borderColor: colors._vermelho }, (avatar == 0) && { borderColor: colors._vermelho }]}>
                        <View style={styles.avatarViewUp}> 
                            <View style={styles.avatarViewButton}>
                                <TouchableOpacity style={[styles.avatarButton, (B1Pressed) && { borderColor: colors._verde, borderWidth: 2 }]} onPress={handleB1}>
                                    <Image source={avatar1} style={styles.image}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.avatarViewButton}>
                                <TouchableOpacity style={[styles.avatarButton, (B2Pressed) && { borderColor: colors._verde, borderWidth: 2 }]} onPress={handleB2}> 
                                    <Image source={avatar2} style={styles.image}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.avatarViewButton}>
                                <TouchableOpacity style={[styles.avatarButton, (B3Pressed) && { borderColor: colors._verde, borderWidth: 2 }]} onPress={handleB3}> 
                                    <Image source={avatar3} style={styles.image}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.avatarViewDown}> 
                            <View style={styles.avatarViewButton}>
                                <TouchableOpacity style={[styles.avatarButton, (B4Pressed) && { borderColor: colors._verde, borderWidth: 2 }]} onPress={handleB4}> 
                                    <Image source={avatar4} style={styles.image}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.avatarViewButton}>
                                <TouchableOpacity style={[styles.avatarButton, (B5Pressed) && { borderColor: colors._verde, borderWidth: 2 }]} onPress={handleB5}> 
                                    <Image source={avatar5} style={styles.image}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.avatarViewButton}>
                                <TouchableOpacity style={[styles.avatarButton, (B6Pressed) && { borderColor: colors._verde, borderWidth: 2 }]} onPress={handleB6}> 
                                    <Image source={avatar6} style={styles.image}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.textHolder}>
                        <Entypo name="new-message" style={styles.iconHolder}/>
                        {' '}Biografia
                    </Text>    
                    <TextInput
                        style={[
                            styles.inputHolderBio,

                            (bioGreen) &&
                            { borderColor: colors._verde },

                            (bioRed) &&
                            { borderColor: colors._vermelho },
                        ]}
                        placeholder="Conte-nos um pouco sobre você!"
                        maxLength={100}
                        onBlur={handleBioBlur}
                        onChangeText={handleBioChange}
                        multiline={true}
                    />

                    <Text style={styles.textHolder}>
                        <Entypo name="lock" style={styles.iconHolder}/>
                        {' '}Senha
                    </Text>    
                    <TextInput
                        style={[
                            styles.inputHolder,

                            (passwordGreen) &&
                            { borderColor: colors._verde },

                            (passwordRed) &&
                            { borderColor: colors._vermelho },
                        ]}
                        placeholder="Ex: •••••••••••••••"
                        secureTextEntry={true}
                        maxLength={50}
                        onBlur={handlePasswordBlur}
                        onChangeText={handlePasswordChange}
                    />

                    <Text style={styles.textHolder}>
                        <Entypo name="lock" style={styles.iconHolder}/>
                        {' '}Confirmar Senha
                    </Text>    
                    <TextInput
                        style={[
                            styles.inputHolder,

                            (password2Green) &&
                            { borderColor: colors._verde },

                            (password2Red) &&
                            { borderColor: colors._vermelho },
                        ]}
                        placeholder="Ex: •••••••••••••••"
                        secureTextEntry={true}
                        maxLength={50}
                        onBlur={handlePassword2Blur}
                        onChangeText={handlePassword2Change}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Feather name="user-plus" style={styles.buttonIcon}/>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                </ScrollView>
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
    title: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        fontFamily: fonts.heading,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        alignSelf: 'center',
        width: '86%',
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
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
        width: '100%',
        height: '100%',
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
        backgroundColor: colors.body_dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 30,
        marginBottom: 30,
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
    textHolder: {
        fontFamily: fonts.heading,
        fontSize: 20,
        marginTop: '5%',
    },
    iconHolder: {
        fontSize: 18,
    },
    inputHolder: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.cinza_claro,
        color: colors.heading,
        height: 60,
        width: '100%',
        fontSize: 18,
        marginTop: 4,
        marginBottom: 6,
        padding: 10,
        textAlign: 'justify',
    },
    inputHolderBio: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.cinza_claro,
        color: colors.heading,
        height: 'auto',
        width: '100%',
        fontSize: 18,
        marginTop: 4,
        marginBottom: 6,
        padding: 10,
        paddingVertical: 15,
        textAlign: 'justify',
    },
    inputHolder2: {
        color: colors.heading,
        height: 50,
        width: '100%',
        fontSize: 18,
        textAlign: 'justify',
        fontFamily: fonts.heading,
    },
    pickerView: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.cinza_claro,
        marginTop: 4,
        marginBottom: 6,
        padding: 4,
        height: 'auto',
    },
    picker: {
        fontSize: 18,
        color: colors.heading,
        textAlignVertical: 'center',
    },
    pickerItem: {
        fontSize: 18,
        color: colors.heading,
        textAlignVertical: 'center',
    },
    avatarView: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.cinza_claro,
        color: colors.heading,
        height: 234,
        width: '100%',
        fontSize: 18,
        marginTop: 4,
        marginBottom: 6,
        flexDirection: 'column',
    },
    avatarViewUp: {
        height: '50%',
        width: 351,
        flexDirection: 'row',
    },
    avatarViewDown: {
        height: '50%',
        width: 351,
        flexDirection: 'row',
    },
    avatarViewButton: {
        height: '100%',
        width: '33.333%',
        padding: 10,
    },
    avatarButton: {
        width: 97,
        height: 97,
        borderRadius: 50,
    },
});