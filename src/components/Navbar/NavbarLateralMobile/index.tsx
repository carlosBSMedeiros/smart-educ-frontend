import './style.css'
import styled from "styled-components";
import { useMenuLateralContext } from '../../../context/MenuLateralContext';
import { useAutenticacaoContext } from '../../../context/AutenticacaoContext';
import { Link, useNavigate } from 'react-router-dom';

declare interface Props {
  open: boolean
}

const StyledMenu = styled.div<Props>`
  display: block;
  transform: ${({ open }) => open ? 'scaleX(1)' : 'scaleX(0)'};
  height: 100vh;
  text-align: left;
  overflow-y: hidden;
  width: 12rem;
  position: absolute;
  right: 0;
  padding: 1rem;
  box-sizing: border-box;
  background: var(--color-5);
  z-index: 2;
  animation: main 1s ease-in-out;
  transform-origin: 100% 50%;


  @-moz-keyframes main {
    0% {
      -moz-transform: scaleX(0);
    }
    100% {
      -moz-transform: scaleX(1);
    }
  }

  ul{
    margin: 0;
    padding: 0;
  }
  li {
    list-style-type: none;
    font-size: 1.5rem;
    text-align: center;
    margin: 0.5rem;
    text-decoration: underline ;
  }
`;

const MascaraMenu = styled.div<Props>`
  z-index: 1;
  background-color: #00000049;
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: ${({ open }) => open ? 'block' : 'none'};
`

var NavbarLateralMobile = function () {
  var menuLateralContext = useMenuLateralContext();
  var autenticador = useAutenticacaoContext();
  let navegador = useNavigate();

  function loggof() {
    console.log('Saindo da aplicação')
    autenticador.logout();
    navegador('/login')
  }

  function alterarMenu() {
    menuLateralContext.alterarEstadoMenu()
  }

  return (
    <StyledMenu open={menuLateralContext.ativado}>
      <ul>
        <Link to="/home">
          <li onClick={alterarMenu}>Menu</li>
        </Link>
        <li onClick={loggof}>Sair</li>
      </ul>
    </StyledMenu>
  )
}

var DivMascaraMenuLateral = function () {
  var menuLateralContext = useMenuLateralContext();

  function alterarMenu() {
    menuLateralContext.alterarEstadoMenu()
  }

  return (
    <MascaraMenu open={menuLateralContext.ativado} onClick={alterarMenu}>
    </MascaraMenu>
  )
}

export default NavbarLateralMobile

export { DivMascaraMenuLateral }