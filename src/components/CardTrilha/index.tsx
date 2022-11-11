import { Link } from "react-router-dom"
import { TrilhaRequest } from "../../types/trilha"
import styled from "styled-components"

declare interface Props {
    trilha: TrilhaRequest
}

var CardTrilhaCol = styled.div`
    padding: 1.5em;
`

function CardTrilha({ trilha }: Props) {

    return (
        <CardTrilhaCol>
            <Link to={{ pathname: `/trilhas/${trilha.id}`, }}>
                <div className="cardTrilha ">
                    <div className="cardTrilhaHeader">
                        {trilha.titulo}
                    </div>
                    <div className="cardTrilhaBody">
                        <b>Matéria:</b> {trilha.nomeMateria}
                        <br />
                        <b>Nº Atividades:</b> {trilha.quantAtividades}
                        <br />
                        <b>Descrição:</b>
                        <br />
                        <div className="cardTrilhaBodyDescricao">
                            {getDescricaoTrilhaResumida(trilha.descricao)}
                        </div>
                    </div>
                </div>
            </Link>
        </CardTrilhaCol>
    )
}

function getDescricaoTrilhaResumida(descricao: string) {
    let append = descricao.length >= 100 ? "..." : ""
    return descricao.slice(0, 100) + append
}

export default CardTrilha;
