import {useState, useEffect} from "react"
import HeaderPagina from "../../components/HeaderPagina"
import './style.css'
import { RankingTurma } from "../../types/RankingTurma"
import CardRankingAluno from "../../components/CardRankingAluno"
import { ListAllByTurma } from "../../services/Ranking.service"
import { erroGenericoBuilder,carregando } from "../../components/Alerts"
import { useAutenticacaoContext } from "../../context/AutenticacaoContext"
import { useNavigate, useParams } from "react-router-dom";

//#endregion

function AlunoTurmasPage() {
    const [rankingTurma, setrankingTurmas] = useState<RankingTurma[]>([])

    let { id } = useParams();

    useEffect(() => {
        carregar();
    }, [])

    const carregar = () =>{
        var carregandoObj = carregando;
        carregandoObj.fire()
        ListAllByTurma(id ? id : "")
            .then(response => {
                carregandoObj.close()
                setrankingTurmas(response.data as RankingTurma[])
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados!').fire()
            })
    }

    return (
        <>
            <HeaderPagina titulo="Ranking da turma" />
            
            <div className="row mt-4 p-4 wrapper">
                {
                    rankingTurma.map(e => {
                        return <CardRankingAluno key={e.idAluno} nome={e.nome} pontos={e.pontos}/>
                    })
                }
            </div>
        </>
    )
}

export default AlunoTurmasPage


