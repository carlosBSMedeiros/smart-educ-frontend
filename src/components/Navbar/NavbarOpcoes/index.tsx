import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAutenticacaoContext } from '../../../context/AutenticacaoContext';
import { ReactComponent as MenuIcon } from '../../../assets/icone-menu.svg';
import { ReactComponent as HomeIcon } from '../../../assets/icone-home.svg';
import { ReactComponent as SairIcon } from '../../../assets/icone-sair.svg';

import styled from "styled-components";

var OpcoesDivPai = styled.div`
    display: flex;
    align-items: center;
`

var OpcoesMobile = styled.div`
    color: white;
    @media(min-width: 550px) {
       display:none
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
    var autenticador = useAutenticacaoContext();
    let navegador = useNavigate();

    function loggof() {
        console.log('Saindo da aplicação')
        autenticador.logout();
        navegador('/login')
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
                    <SairIcon onClick={loggof} />
                </DivCursorPointer>

                {/* <MenuIconDesk pointerEvents="none" /> */}
            </OpcoesDesktop>

            <OpcoesMobile>
                <MenuIcon pointerEvents="none" />
            </OpcoesMobile>
        </OpcoesDivPai>
    )

}

export default NavbarOpcoes

