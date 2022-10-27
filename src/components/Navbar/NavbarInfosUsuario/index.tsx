import React from 'react';
import { useAutenticacaoContext } from '../../../context/AutenticacaoContext';
import { Usuario } from '../../../types/usuario'

import './style.css'

function NavbarInfosUsuario() {
    var autenticador = useAutenticacaoContext();

   // if (autenticador.usuario.tipoUsuario == 'aluno') 
        
    return (
         <div id="navbar-infos-usuario">
            <p>{ getInfosPrimeiraLinha(autenticador.usuario)}</p>
        
            <p>{autenticador.usuario.nomeEscola}</p>
         </div>   
    )
    

}

function getInfosPrimeiraLinha(usuarioLogado:Usuario){

   var texto =  '';
   if(!usuarioLogado){
    return 'Ocorreu um erro ao renderizar as informações do usuario'
   }

    if(usuarioLogado.tipoUsuario == 'ALUNO'){
        texto += `Aluno ${usuarioLogado.nome}  `
    } else{
        texto += `Professor ${usuarioLogado.nome} - ${usuarioLogado.disciplinaProfessor}  `
    }

   return texto
}



export default NavbarInfosUsuario

