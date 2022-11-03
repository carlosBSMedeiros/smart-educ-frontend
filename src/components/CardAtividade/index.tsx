import './style.css'
import { Atividade } from '../../types/atividade'
import { TipoAtividade } from '../../types/atividade'
import { getTipoAtividadeCompleto } from '../../utils/tiposAtividades'
import { useAutenticacaoContext } from '../../context/AutenticacaoContext'

declare interface Props {
    atividade: Atividade
}

export function CardAtividade({ atividade }: Props) {

    var autenticador = useAutenticacaoContext();
    let tipoAtv: TipoAtividade = getTipoAtividadeCompleto(atividade.tipoAtividade)

    if (autenticador.usuario.tipoUsuario === 'ALUNO') {
       return CardAtividadeAluno(atividade,tipoAtv)
    }
    else {
        return CardAtividadeProf(atividade,tipoAtv)
    }
}

function CardAtividadeAluno(atividade:Atividade, tipoAtv:TipoAtividade){

    function ativConcluidaOuNao(concluida:boolean){
        if(concluida){
            return(
                <b className='label-ativ-conc'>Concluída!</b> 
            )
        }
        return(
            <b className='label-ativ-nao-conc'>Não Concluída</b> 
        )
    }

    return (
        <div className={`card-atividade aluno ${atividade.concluida ? 'conc' : 'nao-conc'}`}>
            <div className='card-atividade-desabilitada'>
            </div>
            <div className={`card-atividade-header ${atividade.tipoAtividade.toLowerCase()}`}>
                {tipoAtv.nome}
            </div>
            <div className="card-atividade-body">
                {atividade.titulo}
                <br />
                {ativConcluidaOuNao(atividade.concluida)}
            </div>
        </div>
    )
}

function CardAtividadeProf(atividade:Atividade, tipoAtv:TipoAtividade){
    return (
        <div className="card-atividade professor">
            <div className={`card-atividade-header ${atividade.tipoAtividade.toLowerCase()}`}>
                {tipoAtv.nome}
            </div>
            <div className="card-atividade-body">
                {atividade.titulo}
                <br />
                <b>Alunos que concluíram:</b> {atividade.quantConcluido}
            </div>
        </div>
    )
}

export function CardAtividadeLigacao() {
    return (
        <div className="card-atividade-ligacao"></div>
    )
}