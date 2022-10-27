import React from 'react';
import { useAutenticacaoContext } from '../../context/AutenticacaoContext';
import NavbarImgUsuario from './NavbarImgUsuario';
import NavbarInfosUsuario from './NavbarInfosUsuario';
import NavbarOpcoes from './NavbarOpcoes';
import styled from "styled-components";

var NavbarDiv = styled.nav`
    background-color:var(--color-1);
    max-height: 6rem;
    padding: 10px 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: var(--color-5);
`
var NabvarWrapper = styled.div`
    display: flex;
`


//https://codepen.io/alvarotrigo/pen/MWEJEWG
function Navbar() {
    const autenticador = useAutenticacaoContext();

    const handlerLogoutButton = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log("Efeutando Logout")
        autenticador.logout();
    }

    return (
        <NavbarDiv>
            <NabvarWrapper>
                <NavbarImgUsuario/>
                <NavbarInfosUsuario/>
            </NabvarWrapper>
            <NavbarOpcoes/>
        </NavbarDiv>
    )
}

export default Navbar

