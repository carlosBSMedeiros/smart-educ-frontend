import './style.css'
import {Atividade} from '../../types/atividade'
import { TipoAtividade } from '../../types/atividade'
import { getTipoAtividadeCompleto } from '../../utils/tiposAtividades'

declare interface Props {
    atividade:Atividade
}

export function CardAtividade({atividade}:Props){

    let tipoAtv:TipoAtividade = getTipoAtividadeCompleto(atividade.tipoAtividade)

    return (
        <div className="card-atividade">
            <div className={`card-atividade-header ${atividade.tipoAtividade.toLowerCase()}`}>
                {tipoAtv.nome}
            </div>
            <div className="card-atividade-body">
                {atividade.titulo}
                <br/>
                <b>Alunos que concluíram:</b> {atividade.quantConcluido}
            </div>
        </div>
    )

}

export function CardAtividadeLigacao(){
    return (
        <div className="card-atividade-ligacao"></div>
    )
}