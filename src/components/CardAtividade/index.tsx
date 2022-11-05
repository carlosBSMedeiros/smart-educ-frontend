import './style.css'
import { Atividade, AtividadeAluno } from '../../types/atividade'
import { TipoAtividade } from '../../types/atividade'
import { getTipoAtividadeCompleto } from '../../utils/tiposAtividades'
import { useAutenticacaoContext } from '../../context/AutenticacaoContext'

declare interface Props {
    atividade: Atividade
}

declare interface PropsAluno{
    atividade: AtividadeAluno
}

export function CardAtividade({ atividade }: Props) {
    return CardAtividadeProf(atividade,getTipoAtividadeCompleto(atividade.tipoAtividade))
}

export function CardAtividadeAluno({atividade}:PropsAluno){

    var tipoAtv: TipoAtividade = getTipoAtividadeCompleto(atividade.tipoAtividade)

    function ativConcluidaOuNao(concluida:string){
        if(concluida==="true"){
            return(
                <b className='label-ativ-conc'>Concluída!</b> 
            )
        }
        return(
            <b className='label-ativ-nao-conc'>Não Concluída</b> 
        )
    }

    return (
        <div className={`card-atividade aluno ${atividade.concluida === "true" ? 'conc' : 'nao-conc'}`}>
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