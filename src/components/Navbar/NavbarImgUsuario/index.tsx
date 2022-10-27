import React from 'react';
import { useAutenticacaoContext } from '../../../context/AutenticacaoContext';
import alunoPng from '../../../assets/avatar-aluno.png'
import professorPng from '../../../assets/avatar-prof.png'

import './style.css'

function NavbarImgUsuario() {
    var autenticador = useAutenticacaoContext();

    if (autenticador.usuario.tipoUsuario == 'ALUNO') {
        return (
            <img id="avatar-user" src={alunoPng} alt="ALUNO" />
        )
    } else {
        return (
            <img id="avatar-user" src={professorPng} alt="Professor" />
        )
    }

}



export default NavbarImgUsuario

