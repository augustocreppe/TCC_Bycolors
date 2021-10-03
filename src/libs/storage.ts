import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UsuarioProps {
    id_usuario: number;
    adm: boolean;
    nome_usuario: string;
    telefone: string;
    email: string;
    senha: string;
    cidade: string;
    estado: string;
    bio: string;
    avatar: number;
    excluido: boolean;
}

//Login
export async function saveLogado(id_usuario:number, nome_usuario:string, telefone:string, email:string, senha:string, cidade:string, estado:string, avatar:number, bio:string,) {
    try {
        await AsyncStorage.setItem('@TCC_Bycolors:id', ""+id_usuario);
        await AsyncStorage.setItem('@TCC_Bycolors:nome', nome_usuario);
        await AsyncStorage.setItem('@TCC_Bycolors:telefone', telefone);
        await AsyncStorage.setItem('@TCC_Bycolors:email', email);
        await AsyncStorage.setItem('@TCC_Bycolors:senha', senha);
        await AsyncStorage.setItem('@TCC_Bycolors:cidade', cidade);
        await AsyncStorage.setItem('@TCC_Bycolors:estado', estado);
        await AsyncStorage.setItem('@TCC_Bycolors:avatar', ""+avatar);
        await AsyncStorage.setItem('@TCC_Bycolors:bio', bio);

        await AsyncStorage.setItem('@TCC_Bycolors:isLogged', ""+true);
    }
    catch(error) {
        throw new Error();
    }
}

//Carrega Logado
export async function loadLogado() {
    try {
        const id = await AsyncStorage.getItem('@TCC_Bycolors:id');
        const nome = await AsyncStorage.getItem('@TCC_Bycolors:nome');
        const telefone = await AsyncStorage.getItem('@TCC_Bycolors:telefone');
        const email = await AsyncStorage.getItem('@TCC_Bycolors:email');
        const senha = await AsyncStorage.getItem('@TCC_Bycolors:senha');
        const cidade = await AsyncStorage.getItem('@TCC_Bycolors:cidade');
        const estado = await AsyncStorage.getItem('@TCC_Bycolors:estado');
        const avatar = await AsyncStorage.getItem('@TCC_Bycolors:avatar');
        const bio = await AsyncStorage.getItem('@TCC_Bycolors:bio');

        const data = [id, nome, telefone, email, senha, cidade, estado, avatar, bio]

        return data;
    }
    catch(error) {
        throw new Error();
    }
}

//Atualiza Logado
export async function atualizaLogado(nome_usuario:string, telefone:string, email:string, senha:string, cidade:string, estado:string, avatar:number, bio:string,) {
    try {
        await AsyncStorage.setItem('@TCC_Bycolors:nome', nome_usuario);
        await AsyncStorage.setItem('@TCC_Bycolors:telefone', telefone);
        await AsyncStorage.setItem('@TCC_Bycolors:email', email);
        await AsyncStorage.setItem('@TCC_Bycolors:senha', senha);
        await AsyncStorage.setItem('@TCC_Bycolors:cidade', cidade);
        await AsyncStorage.setItem('@TCC_Bycolors:estado', estado);
        await AsyncStorage.setItem('@TCC_Bycolors:avatar', ""+avatar);
        await AsyncStorage.setItem('@TCC_Bycolors:bio', bio);
    }
    catch(error) {
        throw new Error();
    }
}

//Logout
export async function logoutLogado() {
    try {
        await AsyncStorage.removeItem('@TCC_Bycolors:id');
        await AsyncStorage.removeItem('@TCC_Bycolors:nome');
        await AsyncStorage.removeItem('@TCC_Bycolors:telefone');
        await AsyncStorage.removeItem('@TCC_Bycolors:email');
        await AsyncStorage.removeItem('@TCC_Bycolors:senha');
        await AsyncStorage.removeItem('@TCC_Bycolors:cidade');
        await AsyncStorage.removeItem('@TCC_Bycolors:estado');
        await AsyncStorage.removeItem('@TCC_Bycolors:avatar');
        await AsyncStorage.removeItem('@TCC_Bycolors:bio');

        await AsyncStorage.removeItem('@TCC_Bycolors:isLogged');
        await AsyncStorage.setItem('@TCC_Bycolors:isLogged', ""+false);
    }
    catch(error) {
        throw new Error();
    }
}

//Verifica se está Logado
export async function isLogado() {
    try {
        const isLogged = await AsyncStorage.getItem('@TCC_Bycolors:isLogged');

        return isLogged;
    }
    catch(error) {
        throw new Error();
    }
}