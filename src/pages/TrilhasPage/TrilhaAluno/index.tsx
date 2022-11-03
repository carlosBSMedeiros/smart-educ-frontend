import './style.css'
import { useState, useEffect } from "react"
import { useAutenticacaoContext } from '../../../context/AutenticacaoContext';
import { useNavigate, useParams } from 'react-router-dom';
import { TrilhaRequest } from '../../../types/trilha';
import { carregando, erroGenericoBuilder } from '../../../components/Alerts';
import { recuperarPorId } from '../../../services/Trilha.service';
import HeaderPagina from '../../../components/HeaderPagina';
import { AtividadesListagemAluno } from '../../../components/AtividadesListagem';


function TrilhaAluno() {

    var autenticador = useAutenticacaoContext();
    var navegacao = useNavigate();
    let { id } = useParams();
    var pctgTrilhaConc:number = 100;

    const [trilha, setTrilha] = useState<TrilhaRequest>({
        id: id ? id : "",
        concluida: false,
        descricao: "",
        ordem: null,
        idMateria: "",
        idProfessor: autenticador.usuario.idUsuario,
        titulo: "",
        nomeMateria: "",
        quantAtividades: 0,
        quantConcluido: 0
    })

    useEffect(() => {
        if (!trilha.id || trilha.id.trim() === "") {
            return;
        }
        var carregandoRef = carregando
        carregandoRef.fire()
        recuperarPorId(trilha.id)
            .then(response => {
                carregandoRef.close()
                var newTrilha = response.data as TrilhaRequest
                newTrilha.quantConcluido = 1
                setTrilha(newTrilha)
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados da sua trilha!').fire()
            })
    }, [])

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
                <div className="barra-progresso-pai">
                    <p>{pctgTrilhaConc}% da Trilha foi concluída. {getMensagemPorcentagemTrilha(pctgTrilhaConc)}</p>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" id='barra-progresso-trilha-aluno' role="progressbar"></div>
                    </div>
                </div>
                <div className='atividades-aluno-pai'>
                    <AtividadesListagemAluno idTrilha={trilha.id}></AtividadesListagemAluno>
                </div>
            </div>
        </>
    )

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