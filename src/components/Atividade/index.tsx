import { AtividadeAluno } from "../../types/atividade"
import AtividadeFormTipoTexto from "./AtividadeTexto";
import AtividadeFormTipoQuest from "./AtividadeQuestionario"
import AtividadeFormTipoJogo from "./AtividadeJogo"
import AtividadeFormTipoTrilha from "./AtividadeTrilha"

declare interface Props{
    atividade:AtividadeAluno
}

function AtividadeForm({atividade}:Props){

    var abrv = atividade.tipoAtividade.toUpperCase()
    switch(abrv){
        case 'TEXTO':
            return <AtividadeFormTipoTexto atividade={atividade}/>;
        case 'QUEST':
            return <AtividadeFormTipoQuest atividade={atividade}/>;
        case 'TRILHA':
            return <AtividadeFormTipoTrilha atividade={atividade}/>;
        case 'JOGO':
            return <AtividadeFormTipoJogo atividade={atividade}/>;
        default:
            return <AtividadeFormTipoErro atividade={atividade}/>;
    }

    
}

function AtividadeFormTipoErro({atividade}:Props){
    return (
        <>
            Ocorreu um erro ao identificar o tipo da atividade aberta. Converse com seu professor
        </>
    )
}

export default AtividadeForm