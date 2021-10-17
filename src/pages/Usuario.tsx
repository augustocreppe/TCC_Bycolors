import React, { useEffect, useState }  from 'react';
import fonts from '../styles/fonts';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { Picker } from '@react-native-picker/picker';
import { atualizaLogado, loadLogado, logoutLogado } from '../libs/storage';
import { TextInputMask } from 'react-native-masked-text';
import { constants } from '../config/app.config';

export function Usuario() {
    const navigation = useNavigation();

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

    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [tel, setTel] = useState<string>();
    const [city, setCity] = useState<string>();
    const [uf, setUf] = useState<string>('s');
    const [bio, setBio] = useState<string>();
    const [avatar, setAvatar] = useState<number>();
    const [password, setPassword] = useState<string>();

    const [B1Pressed, setB1Pressed] = useState(false);
    const [B2Pressed, setB2Pressed] = useState(false);
    const [B3Pressed, setB3Pressed] = useState(false);
    const [B4Pressed, setB4Pressed] = useState(false);
    const [B5Pressed, setB5Pressed] = useState(false);
    const [B6Pressed, setB6Pressed] = useState(false);

    const [nameIsFilled, setNameIsFilled] = useState(false);
    const [emailIsFilled, setEmailIsFilled] = useState(false);
    const [telIsFilled, setTelIsFilled] = useState(false);
    const [cityIsFilled, setCityIsFilled] = useState(false);
    const [ufIsFilled, setUfIsFilled] = useState(false);
    const [avatarIsFilled, setAvatarIsFilled] = useState(false);
    const [bioIsFilled, setBioIsFilled] = useState(false);
    const [passwordIsFilled, setPasswordIsFilled] = useState(false);

    const [ready, setReady] = useState(false);
    const [dados, setDados] = useState<any>(1);

    useEffect(() => {
        async function getData() {
            setDados(await loadLogado());
            await salvaDados(await dados);

            console.log(dados);

            //setTimeout(function(){
                setReady(true);
            //},1000);
        }
        
        getData();
    },[]);

    async function salvaDados(dados:any) {
        setAvatar(dados[7]);
        setName(dados[1]);
        setPassword(dados[4]);
        setEmail(dados[3]);
        setTel(dados[2]);
        setCity(dados[5]);
        setUf(dados[6]);
        setBio(dados[8]);
    }

    //Voltar
    function handleGoBack() {
        navigation.navigate('MenuLateral');
    }

    //Atualizar
    function handleUpdate() {
        if((name != undefined) && (email != undefined) && (email != undefined) && (tel != undefined) && (city != undefined) && (uf != undefined) && (avatar != undefined) && (bio != undefined) && (password != undefined)) {
            if((name.length >= 3) && (email.includes('@')) && (tel.length >= 13) && (city.length >= 3) && (uf != '0') && (bio.length >= 3) && (password.length >= 8)) {
                
                const nome_usuario = name;
                const telefone = tel;
                const cidade = city;
                const estado = uf;
                const senha = password;

                const user = { nome_usuario, email, telefone, cidade, estado, bio, avatar, senha }
                
                fetch(`${constants.API_URL}/usuarios/${dados[0]}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                .then((json) => {
                    Alert.alert('Usuário alterado com sucesso!');
                    atualizaLogado(
                        nome_usuario,
                        telefone, 
                        email, 
                        senha,
                        cidade,
                        estado,
                        avatar,
                        bio,
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
        else {
            Alert.alert('Preencha todos os campos corretamente!');
        }
    }

    //Deletar
    function handleDelete() {
        const excluido = true;
        const user = { excluido }

        Alert.alert(
            "Confirmar Exclusão",
            "Você deseja realmente excluir sua conta?",
            [
              {
                text: "Sim",
                onPress: () => {
                    fetch(`${constants.API_URL}/usuarios/excluir/${dados[0]}`, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                    .then((json) => {
                        Alert.alert('Usuário excluído com sucesso!');
                        logoutLogado();
                        navigation.navigate('Inicio');
                    })
                    .catch((error) => {
                        Alert.alert('Erro ao salvar os dados!', error);
                    });
                },
              },
              {
                text: "Não",
              },
            ]
        );
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
            if(email.includes('@'))
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
        <>
            {
                (ready == true) &&

                <SafeAreaView style={styles.container}>
                    <View style={styles.container}>
                        <View style={styles.headerView}>
                            <View>
                                <TouchableOpacity onPress={handleGoBack} style={styles.buttonCancelar}>
                                    <Text style={styles.text}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
        
                            <View style={styles.titleView}>
                                <Text style={styles.title}>Editar Perfil</Text>
                            </View>
        
                            <View>
                                <TouchableOpacity onPress={handleUpdate} style={styles.buttonCancelar}>
                                    <Text style={styles.buttonConcluir}>Concluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
        
                        <View style={styles.lineView}>
                            <Text style={styles.line}>_______________________________________</Text>
                        </View>
        
                        <ScrollView>
        
                        <View style={[styles.avatarView, (avatarGreen) && { borderColor: colors._verde },  (avatarRed) && { borderColor: colors._vermelho }, (avatar == 0) && { borderColor: colors._vermelho }]}>
                            <View style={styles.avatarViewUp}> 
                                <View style={styles.avatarViewButton}>
                                    <TouchableOpacity style={[styles.avatarButton, (avatar == 1) && { borderColor: colors._verde, borderWidth: 2 }]} onPress={handleB1}>
                                        {/* 1 */}
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.avatarViewButtonMiddle}>
                                    <TouchableOpacity style={[styles.avatarButton, (avatar == 2) && { borderColor: colors._verde, borderWidth: 2 }]} onPress={handleB2}> 
                                        {/* 2 */}
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.avatarViewButton}>
                                    <TouchableOpacity style={[styles.avatarButton, (avatar == 3) && { borderColor: colors._verde, borderWidth: 2 }]} onPress={handleB3}> 
                                        {/* 3 */}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.avatarViewDown}> 
                                <View style={styles.avatarViewButton}>
                                    <TouchableOpacity style={[styles.avatarButton, (avatar == 4) && { borderColor: colors._verde, borderWidth: 2 }]} onPress={handleB4}> 
                                        {/* 4 */}
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.avatarViewButtonMiddle}>
                                    <TouchableOpacity style={[styles.avatarButton, (avatar == 5) && { borderColor: colors._verde, borderWidth: 2 }]} onPress={handleB5}> 
                                        {/* 5 */}
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.avatarViewButton}>
                                    <TouchableOpacity style={[styles.avatarButton, (avatar == 6) && { borderColor: colors._verde, borderWidth: 2 }]} onPress={handleB6}> 
                                        {/* 6 */}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
        
                        <View style={styles.lineView}>
                            <Text style={styles.line}>_______________________________________</Text>
                        </View>
                        <View style={styles.campos}>
                            <Text style={styles.campo_alteracao}>Nome</Text>
                            <TextInput
                                style={[
                                    styles.input, 
                                    
                                    (nameGreen) &&
                                    { borderColor: colors._verde },

                                    (nameRed) &&
                                    { borderColor: colors._vermelho },
                                ]}
                                placeholder="Ex: Fulana da Silva"
                                value={name}
                                maxLength={50}
                                onBlur={handleNameBlur}
                                onChangeText={handleNameChange}
                            />
                        </View>
                        <View style={styles.lineView}>
                            <Text style={styles.line}>_______________________________________</Text>
                        </View>
                        <View style={styles.campos}>
                            <Text style={styles.campo_alteracao}>Senha</Text>
                            <TextInput
                                style={[
                                    styles.input, 
                                    
                                    (passwordGreen) &&
                                    { borderColor: colors._verde, },

                                    (passwordRed) &&
                                    { borderColor: colors._vermelho },
                                ]}
                                placeholder="Ex: ••••••••"
                                value={password}
                                maxLength={50}
                                secureTextEntry={true}
                                onBlur={handlePasswordBlur}
                                onChangeText={handlePasswordChange}
                            />
                        </View>
                        <View style={styles.lineView}>
                            <Text style={styles.line}>_______________________________________</Text>
                        </View> 
                        <View style={styles.campos}>
                            <Text style={styles.campo_alteracao}>E-mail</Text>
                            <TextInput
                                style={[
                                    styles.input, 
                                    
                                    (emailGreen) &&
                                    { borderColor: colors._verde, },

                                    (emailRed) &&
                                    { borderColor: colors._vermelho },
                                ]}
                                placeholder="Ex: fulanasilva@gmail.com"
                                value={email}
                                maxLength={50}
                                onBlur={handleEmailBlur}
                                onChangeText={handleEmailChange}
                            />
                        </View>
                        <View style={styles.lineView}>
                            <Text style={styles.line}>_______________________________________</Text>
                        </View>   
                        <View style={styles.campos}>
                            <Text style={styles.campo_alteracao}>Telefone</Text>
                            <TextInputMask
                                style={[
                                    styles.input,

                                    (telGreen) &&
                                    { borderColor: colors._verde, },

                                    (telRed) &&
                                    { borderColor: colors._vermelho },
                                ]}
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99)'
                                }}
                                placeholder="Ex: (14)99123-4567"
                                value={tel}
                                onBlur={handleTelBlur}
                                onChangeText={handleTelChange}
                            />
                        </View>
                        <View style={styles.lineView}>
                            <Text style={styles.line}>_______________________________________</Text>
                        </View>     
                        <View style={styles.campos}>
                            <Text style={styles.campo_alteracao}>Cidade</Text>
                            <TextInput
                                    style={[
                                        styles.input, 
                                        
                                        (cityGreen) &&
                                        { borderColor: colors._verde, },

                                        (cityRed) &&
                                        { borderColor: colors._vermelho },
                                    ]}
                                    placeholder="Ex: Bauru"
                                    value={city}
                                    maxLength={50}
                                    onBlur={handleCityBlur}
                                    onChangeText={handleCityChange}
                                />
                        </View>
                        <View style={styles.lineView}>
                            <Text style={styles.line}>_______________________________________</Text>
                        </View>  
                        <View style={styles.campos}>
                            <Text style={styles.campo_alteracao}>Estado</Text>
                            <Picker
                                style={[
                                    styles.input,
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
                        <View style={styles.lineView}>
                            <Text style={styles.line}>_______________________________________</Text>
                        </View>  
                        <View style={styles.campos}>
                            <Text style={styles.campo_alteracao}>Biografia</Text>
                            <TextInput
                                    style={[
                                        styles.input,
                                        
                                        (bioGreen) &&
                                        { borderColor: colors._verde, },

                                        (bioRed) &&
                                        { borderColor: colors._vermelho },
                                    ]}
                                    placeholder="Conte mais sobre você!"
                                    value={bio}
                                    maxLength={100}
                                    onBlur={handleBioBlur}
                                    onChangeText={handleBioChange}
                                />
                        </View>
                        <View style={styles.lineView}>
                            <Text style={styles.line}>_______________________________________</Text>
                        </View>
        
                        <TouchableOpacity style={styles.button} onPress={handleDelete}>
                            <Feather name="x-circle" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Deletar Conta</Text>
                        </TouchableOpacity>
                                
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
    titleView: {
        marginHorizontal: '5%',
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
    line: {
        fontSize: 20,
        color: colors.cinza_claro,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        marginBottom: -10,
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
        width: 100,
        fontFamily: fonts.text,
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },
    input: {
        width: 270,
        color: colors.heading,
        fontSize: 20,
        padding: 10,
        textAlign: 'justify',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: colors.vermelho,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 10,
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
    slideWrapperView: {
        width: 250,
    },
    slideWrapper: {
        height: 200,
        alignItems: 'center',
    },
    slide: {
        width: 150,
        height: 150,
        marginLeft: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.azul,
        borderRadius: 100,
    },
    slideText: {
        fontSize: 20,
        fontFamily: fonts.text,
    },
    avatarView: {
        alignSelf: 'center',
        borderColor: colors.cinza_claro,
        color: colors.heading,
        height: 200,
        width: '90%',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatarViewUp: {
        height: '50%',
        width: 300,
        flexDirection: 'row',
        marginLeft: -38,
    },
    avatarViewDown: {
        height: '50%',
        width: 300,
        flexDirection: 'row',
        marginLeft: -38,
    },
    avatarViewButton: {
        height: '100%',
        width: '33.333%',
        padding: 10,
    },
    avatarViewButtonMiddle: {
        height: '100%',
        width: '33.333%',
        padding: 10,
        marginHorizontal: 20,
    },
    avatarButton: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: colors.azul,
    },
});