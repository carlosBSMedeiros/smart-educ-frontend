import './style.css'
import { useState, useEffect } from "react"
import { useAutenticacaoContext } from '../../../context/AutenticacaoContext';
import { useParams } from 'react-router-dom';
import { carregando, erroGenericoBuilder } from '../../../components/Alerts';
import { recuperarParaAluno } from '../../../services/Trilha.service';
import HeaderPagina from '../../../components/HeaderPagina';
import { AtividadesListagemAluno } from '../../../components/AtividadesListagem/AtividadesListagemAluno';
import { Progress } from 'reactstrap';
import { ordenarAtividades } from '../../../utils/atividadesUtils';
import { AtividadeAluno, TrilhaAluno as TrilhaAlunoReq} from '../../../types/TrilhaAlunoRequestNew';

declare interface PropsBarraTrilha {
    trilha: TrilhaAlunoReq;
    pctgTrilhaConc: number;
}

function TrilhaAluno() {

    var autenticador = useAutenticacaoContext();
    let { id } = useParams();

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
            }else if (index === 0) {
                proximaAtividadeRaw = data.atividadesTrilhaDTOs[index + 1];
                atividade = new AtividadeAluno(atividadeRaw, proximaAtividadeRaw.concluida, false);
                trilhaNew.atividadesTrilhaDTOs.push(atividade)
            }else{
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
                        <b>descrição: </b>{trilha.descricao}
                    </div>
                </div>
                <BarraProgressoTrilha trilha={trilha} pctgTrilhaConc={pctgTrilhaConc} />
                <div className='atividades-aluno-pai'>
                    <AtividadesListagemAluno
                        atividadesParam={trilha.atividadesTrilhaDTOs}
                        atualizarAtividades={recuperarTrilha}
                    ></AtividadesListagemAluno>
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
            <p>{pctgTrilhaConc}% da Trilha foi concluída. {getMensagemPorcentagemTrilha(pctgTrilhaConc)}</p>
            <Progress animated color="success" value={pctgTrilhaConc} />
        </div>
    )
}

function getMensagemPorcentagemTrilha(pctg: number) {
    if (pctg <= 25) {
        return 'O começo de uma nova jornada!';
    }
    if (pctg <= 50) {
        return 'Muito bem, mas ainda há um caminho a frente!';
    }
    if (pctg <= 75) {
        return 'Mais da metade concluída, isso aí!';
    }
    if (pctg <= 99) {
        return 'Ânimo, você está quase lá!';
    }
    if (pctg === 100) {
        return 'Parabéns!';
    }
}

export default TrilhaAluno