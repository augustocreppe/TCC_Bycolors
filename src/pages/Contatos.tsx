import React from 'react';
import { Contato } from '../components/CardContatos';

export function Contatos() {
    return (
        <Contato 
            idContato={2}
            nomeLugar= 'Hospital de Base de Bauru'
            telefone= '(14) 3231-4770'
            site='https://www.famesp.org.br/transparencia/hbb/'
            email= 'sau.hb@famesp.org.br'
            id_doenca= {3}
            excluido= {false}
        />
    );
}