import FuncionalidadeItem from '../../components/FuncionalidadeItem';
import { useAutenticacaoContext } from '../../context/AutenticacaoContext';
import {listaFuncionalidades} from './listaFuncionalidades';
import styled from 'styled-components';

const ConteudoHome = styled.div`
    margin: 4em 3em;
    display: flex;
    flex-wrap: wrap;

    @media(max-width: 570px) {
       justify-content: center;
    }
`

function HomePage() {
    var autenticador = useAutenticacaoContext();
    var funcionalidades = listaFuncionalidades(autenticador.usuario.tipoUsuario)
    return (
        <ConteudoHome>
            {
                funcionalidades.map((funcionalidade, key) => {
                    return <FuncionalidadeItem
                        key={key}
                        label={funcionalidade.label}
                        icone={funcionalidade.icone}
                        rota={funcionalidade.rota}
                    />
                })
            }
        </ConteudoHome>
    )
}

export default HomePage;