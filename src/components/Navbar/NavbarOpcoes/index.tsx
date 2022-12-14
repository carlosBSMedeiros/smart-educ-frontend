import { Link, useNavigate } from "react-router-dom";
import { useAutenticacaoContext } from '../../../context/AutenticacaoContext';
import { ReactComponent as MenuIcon } from '../../../assets/icone-menu.svg';
import { ReactComponent as HomeIcon } from '../../../assets/icone-home.svg';
import { ReactComponent as SairIcon } from '../../../assets/icone-sair.svg';
import png from '../../../assets/icone-sair.png'

import styled from "styled-components";
import { useMenuLateralContext } from "../../../context/MenuLateralContext";

var OpcoesDivPai = styled.div`
    display: flex;
    align-items: center;
`

var OpcoesMobile = styled.div`
    color: white;
    @media(min-width: 550px) {
       display: none
    }
`
var DivCursorPointer = styled.div`
    &:hover{
        cursor: pointer
    }
`

var OpcoesDesktop = styled.div`
    @media(max-width: 550px) {
        display:none
    }
    @media(min-width: 551px) {
        display:flex
    }

    svg{
        margin: 0 1rem;
        width: 30px;
        height: 30px
    }
`

function NavbarOpcoes() {
    var menuLateralProvider = useMenuLateralContext();
    var autenticador = useAutenticacaoContext();
    let navegador = useNavigate();

    function logout() {
        console.log('Saindo da aplicação')
        autenticador.logout();
        navegador('/login')
    }

    function alterarMenu() {
        menuLateralProvider.alterarEstadoMenu()
    }

    return (
        <OpcoesDivPai>
            <OpcoesDesktop>
                <DivCursorPointer>
                    <Link to="/home">
                        <HomeIcon pointerEvents="none" />
                    </Link>
                </DivCursorPointer>

                <DivCursorPointer>
                    <img src={png} alt="Sair" onClick={logout} />
                </DivCursorPointer>
            </OpcoesDesktop>

            <OpcoesMobile>
                <DivCursorPointer>
                    <MenuIcon onClick={alterarMenu} />
                </DivCursorPointer>
            </OpcoesMobile>
        </OpcoesDivPai>
    )

}

export default NavbarOpcoes

