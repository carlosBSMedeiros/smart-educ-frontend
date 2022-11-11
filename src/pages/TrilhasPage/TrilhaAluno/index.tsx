import './style.css'
import { useState, useEffect } from "react"
import { useAutenticacaoContext } from '../../../context/AutenticacaoContext';
import { useNavigate, useParams } from 'react-router-dom';
import { TrilhaAlunoRequest } from '../../../types/trilha';
import { carregando, erroGenericoBuilder } from '../../../components/Alerts';
import { recuperarParaAluno } from '../../../services/Trilha.service';
import HeaderPagina from '../../../components/HeaderPagina';
import { AtividadesListagemAluno } from '../../../components/AtividadesListagem/AtividadesListagemAluno';
import { Progress } from 'reactstrap';

function TrilhaAluno() {

    var autenticador = useAutenticacaoContext();
    let { id } = useParams();

    const [trilha, setTrilha] = useState<TrilhaAlunoRequest>({
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
        var carregandoRef = carregando
        carregandoRef.fire()
        recuperarParaAluno(trilha.id, autenticador.usuario.idUsuario)
            .then(response => {
                carregandoRef.close()
                var newTrilha = response.data as TrilhaAlunoRequest
                setTrilha(newTrilha)
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados da sua trilha!').fire()
            })
    }, [])

    var pctgTrilhaConc: number = calcularPctgConcTrilha();

    function calcularPctgConcTrilha(){
        let result =  Math.trunc(trilha.quantConcluido * 100 / trilha.quantAtividade);
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
                    { BarraPrograssoTrilha(trilha) }
                <div className='atividades-aluno-pai'>
                    <AtividadesListagemAluno atividadesParam={trilha.atividadesTrilhaDTOs}></AtividadesListagemAluno>
                </div>
            </div>
        </>
    )

    function BarraPrograssoTrilha(trilha:TrilhaAlunoRequest){
        if(trilha === undefined || trilha.atividadesTrilhaDTOs === undefined || trilha.atividadesTrilhaDTOs.length <= 0){
            return (
                <div className="barra-progresso-pai">
                    <p>{pctgTrilhaConc}% da Trilha foi concluída. {getMensagemPorcentagemTrilha(pctgTrilhaConc)}</p>
                    <Progress animated color="success" value={pctgTrilhaConc} />
                </div>
            )
        } 
        return (
            <></>
        )
    }

}



function getMensagemPorcentagemTrilha(pctg:number){
    if(pctg <= 25){
        return 'O começo de uma nova jornada!';
    }
    if(pctg <= 50){
        return 'Muito bem, mas ainda há um caminho a frente!';
    }
    if(pctg <= 75){
        return 'Mais da metade concluída, isso aí!';
    }
    if(pctg <= 99){
        return 'Ânimo, você está quase lá!';
    }
    if(pctg === 100){
        return 'Parabéns!';
    }
}

export default TrilhaAluno