import './style.css'
import { useState, useEffect } from "react"
import { useAutenticacaoContext } from '../../../context/AutenticacaoContext';
import { useParams } from 'react-router-dom';
import { carregando, erroGenericoBuilder } from '../../../components/Alerts';
import { recuperarParaAluno } from '../../../services/Trilha.service';
import HeaderPagina from '../../../components/HeaderPagina';
import { AtividadesListagemAluno } from '../../../components/AtividadesListagem/AtividadesListagemAluno';
import { Modal, ModalBody, ModalHeader, Progress, Tooltip } from 'reactstrap';
import { ordenarAtividades } from '../../../utils/atividadesUtils';
import { AtividadeAluno, TrilhaAluno as TrilhaAlunoReq } from '../../../types/TrilhaAlunoRequestNew';
import pngRanking from '../../../assets/icone-ranking.png'
import styled from 'styled-components';
import RankingComponent from '../../../components/Ranking';

declare interface PropsBarraTrilha {
    trilha: TrilhaAlunoReq;
    pctgTrilhaConc: number;
}

function TrilhaAluno() {

    var autenticador = useAutenticacaoContext();
    let { id } = useParams();

    const [modalRankingOpen, setModalRankingOpen] = useState<boolean>(false)
    const [tooltipRankingOpen, setTooltipRankingOpen] = useState(false)
    const [trilha, setTrilha] = useState<TrilhaAlunoReq>({
        id: id ? id : "",
        titulo: "",
        descricao: "",
        nomeMateria: "",
        quantAtividade: 0,
        quantConcluido: 0,
        concluida: false,
        atividadesTrilhaDTOs: []
    })

    useEffect(() => {
        if (!trilha.id || trilha.id.trim() === "") {
            return;
        }
        recuperarTrilha();
    }, [])

    function recuperarTrilha() {
        var carregandoRef = carregando
        carregandoRef.fire()
        recuperarParaAluno(trilha.id, autenticador.usuario.idUsuario)
            .then(response => {
                carregandoRef.close()
                var newTrilha = criarTrilhaAlunoRequest(response.data)
                setTrilha(newTrilha)
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados da sua trilha!').fire()
            })
    }

    var pctgTrilhaConc: number = calcularPctgConcTrilha();

    function criarTrilhaAlunoRequest(data: any) {

        var trilhaNew = new TrilhaAlunoReq(data);
        ordenarAtividades(data.atividadesTrilhaDTOs)

        for (let index = 0; index < data.atividadesTrilhaDTOs.length; index++) {
            var atividade;

            var atividadeRaw = data.atividadesTrilhaDTOs[index];
            var proximaAtividadeRaw;
            var atividadeAnteriorRaw;
            //ultima atividade da lista
            if (index === data.atividadesTrilhaDTOs.length - 1) {
                atividadeAnteriorRaw = data.atividadesTrilhaDTOs[index - 1];
                atividade = new AtividadeAluno(atividadeRaw, false, atividadeAnteriorRaw.concluida);
                trilhaNew.atividadesTrilhaDTOs.push(atividade)
            } else if (index === 0) {
                proximaAtividadeRaw = data.atividadesTrilhaDTOs[index + 1];
                atividade = new AtividadeAluno(atividadeRaw, proximaAtividadeRaw.concluida, false);
                trilhaNew.atividadesTrilhaDTOs.push(atividade)
            } else {
                atividadeAnteriorRaw = data.atividadesTrilhaDTOs[index - 1];
                proximaAtividadeRaw = data.atividadesTrilhaDTOs[index + 1];
                atividade = new AtividadeAluno(atividadeRaw, proximaAtividadeRaw.concluida, atividadeAnteriorRaw.concluida);
                trilhaNew.atividadesTrilhaDTOs.push(atividade)
            }
        }

        console.log(trilhaNew)
        return trilhaNew
    }

    function calcularPctgConcTrilha() {
        let result = Math.trunc(trilha.quantConcluido * 100 / trilha.quantAtividade);
        return result;
    }

    function toggleModalRanking() {
        setTooltipRankingOpen(false)
        setModalRankingOpen(!modalRankingOpen)
    }


    function toggleTooltipRanking() {
        setTooltipRankingOpen(!tooltipRankingOpen)
    }

    function ModalRankingTrilha() {

        const RankingPaiStyled = styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 1rem;
        `

        return (
            <Modal isOpen={modalRankingOpen} toggle={toggleModalRanking} size="md">
                <ModalHeader toggle={toggleModalRanking}>
                    Ranking
                </ModalHeader>
                <ModalBody>
                    <RankingPaiStyled>
                        <RankingComponent id={trilha.id} tipo='trilha' />
                    </RankingPaiStyled>
                </ModalBody>
            </Modal>
        )
    }

    return (
        <>
            <HeaderPagina titulo="Trilha de Aprendizado" />
            <div className="container">
                <div className='trilhas-infos'>
                    <div className='trilhas-infos-tit-mat'>
                        <div>
                            <h4><b>Trilha: </b>{trilha.titulo}</h4>
                        </div>
                        <div>
                            <h4><b>Materia: </b>{trilha.nomeMateria}</h4>
                        </div>
                    </div>
                    <div className='trilhas-infos-desc'>
                        <b>descri????o: </b>{trilha.descricao}
                    </div>
                </div>
                <BarraProgressoTrilha trilha={trilha} pctgTrilhaConc={pctgTrilhaConc} />
                <div className='atividades-aluno-pai'>

                    <button className={`btn btn-outline-success ${!trilha.concluida ? 'disabled' : ''}`} id="TooltipRanking" onClick={toggleModalRanking}>
                        <img src={pngRanking} alt="Medalha" />
                    </button>
                    <Tooltip placement="left" isOpen={tooltipRankingOpen} target="TooltipRanking" toggle={toggleTooltipRanking}>
                        Visualizar Ranking da Trilha
                    </Tooltip>
                    <AtividadesListagemAluno
                        atividadesParam={trilha.atividadesTrilhaDTOs}
                        atualizarAtividades={recuperarTrilha}
                    ></AtividadesListagemAluno>
                    <ModalRankingTrilha></ModalRankingTrilha>
                </div>
            </div>
        </>
    )

}

function BarraProgressoTrilha({ trilha, pctgTrilhaConc }: PropsBarraTrilha) {
    if (trilha === undefined || trilha.atividadesTrilhaDTOs === undefined || trilha.atividadesTrilhaDTOs.length === 0) {
        return (
            <></>
        )
    }
    return (
        <div className="barra-progresso-pai">
            <p>{pctgTrilhaConc}% da Trilha foi conclu??da. {getMensagemPorcentagemTrilha(pctgTrilhaConc)}</p>
            <Progress animated color="success" value={pctgTrilhaConc} />
        </div>
    )
}

function getMensagemPorcentagemTrilha(pctg: number) {
    if (pctg <= 25) {
        return 'O come??o de uma nova jornada!';
    }
    if (pctg <= 50) {
        return 'Muito bem, mas ainda h?? um caminho a frente!';
    }
    if (pctg <= 75) {
        return 'Mais da metade conclu??da, isso a??!';
    }
    if (pctg <= 99) {
        return '??nimo, voc?? est?? quase l??!';
    }
    if (pctg === 100) {
        return 'Parab??ns!';
    }
}

export default TrilhaAluno