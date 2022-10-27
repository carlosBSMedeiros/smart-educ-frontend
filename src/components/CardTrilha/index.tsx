import { Link } from "react-router-dom"
import { TrilhaRequest } from "../../types/trilha"

declare interface Props {
    trilha: TrilhaRequest
}

function CardTrilha({ trilha }: Props) {

    return (
        <div className="col-md-4 d-flex justify-content-center">
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
        </div>
    )
}

function getDescricaoTrilhaResumida(descricao: string) {
    let append = descricao.length >= 100 ? "..." : ""
    return descricao.slice(0, 100) + append
}

export default CardTrilha;
