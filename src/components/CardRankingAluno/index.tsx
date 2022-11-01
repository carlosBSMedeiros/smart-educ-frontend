
import './style.css';
import medalha from "../../assets/medalha.png";
interface Props {
    nome: string,
    pontos: number
}

function RankingAluno({ nome, pontos }: Props) {

    return (
        <div className="centralizar">
            <div className="cardRank">
                <div className="cardBodyRank">
                    <b className='nome'>{nome}</b>
                    <b className='pontos'>{pontos}</b>
                </div>
            </div>
            <div className="display-inline">
                <img src={medalha} alt="Icone de Banco de Questões" />
            </div>
        </div>
    )
}


export default RankingAluno;
