import {useState, useEffect} from "react"
import styled from "styled-components"
import HeaderPagina from "../../components/HeaderPagina"
import './style.css'
import png from '../../assets/add.png'
import { Link } from "react-router-dom"
import { TrilhaRequest } from "../../types/trilha"
import CardTrilha from "../../components/CardTrilha"
import { recuperarTrilhasIdProfessor } from "../../services/Trilha.service"
import { erroGenericoBuilder,carregando } from "../../components/Alerts"
import { useAutenticacaoContext } from "../../context/AutenticacaoContext"

//#region Styled Components

const NovaTrillhaDiv = styled.div`
    display:flex;
    justify-content: center
`

const NovaTrilhaButton = styled.button`
    background-color: var(--color-4);
    border: 1px solid var(--color-3);
    border-radius: 10px;
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
    transition: all .3s ease-in-out 0s;
    color: var(--color-1);
    padding: 2rem;
    font-size: 1rem;
    font-weight: 700;

    &:hover{
        transform: translateY(-6px); 
        cursor: pointer; 
    }
`

//#endregion

function TrilhasPage() {
    var autenticador = useAutenticacaoContext();
    const [trilhas, setTrilhas] = useState<TrilhaRequest[]>([])

    useEffect(() => {
        var carregandoObj = carregando;
        carregandoObj.fire()
        recuperarTrilhasIdProfessor(autenticador.usuario.idUsuario)
            .then(response => {
                carregandoObj.close()
                setTrilhas(response.data as TrilhaRequest[])
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar suas trilhas!').fire()
            })
    }, [])

    return (
        <>
            <HeaderPagina titulo="Trilhas" />
            <NovaTrillhaDiv>
                <Link to={"/trilhas/novo"}>
                    <NovaTrilhaButton>
                        Nova Trilha
                        <img src={png} alt="React Logo" />
                    </NovaTrilhaButton>
                </Link>
            </NovaTrillhaDiv>
            <div className="row mt-4 p-4 wrapperTrilhas">
                {
                    trilhas.map(e => {
                        return <CardTrilha key={e.id} trilha={e}/>
                    })
                }
            </div>
        </>
    )
}

export default TrilhasPage


