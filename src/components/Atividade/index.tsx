import { AtividadeAluno } from "../../types/atividade"
import AtividadeFormTipoTexto from "./AtividadeTexto";
import AtividadeFormTipoQuest from "./AtividadeQuestionario"
import AtividadeFormTipoJogo from "./AtividadeJogo"
import AtividadeFormTipoTrilha from "./AtividadeTrilha"
import Swal from "sweetalert2";

declare interface Props{
    atividade:AtividadeAluno,
    fecharModalAtualizarListaAtividades: Function
}

function AtividadeForm({atividade, fecharModalAtualizarListaAtividades}:Props){
    
    var abrv = atividade.tipoAtividade.toUpperCase()
    switch(abrv){
        case 'TEXTO':
            return <AtividadeFormTipoTexto atividade={atividade} fecharModalAtualizarListaAtividades={fecharModalAtualizarListaAtividades}/>;
        case 'QUEST':
            return <AtividadeFormTipoQuest atividade={atividade} fecharModalAtualizarListaAtividades={fecharModalAtualizarListaAtividades}/>;
        case 'TRILHA':
            return <AtividadeFormTipoTrilha atividade={atividade} />;
        case 'JOGO':
            return <AtividadeFormTipoJogo atividade={atividade} fecharModalAtualizarListaAtividades={fecharModalAtualizarListaAtividades}/>;
        default:
            return <AtividadeFormTipoErro atividade={atividade} fecharModalAtualizarListaAtividades={fecharModalAtualizarListaAtividades}/>;
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