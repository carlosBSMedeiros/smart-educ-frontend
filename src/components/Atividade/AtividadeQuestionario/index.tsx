import { AtividadeAluno } from "../../../types/atividade"
import styled from "styled-components"
import { TituloAtividadeStyled } from "../styledComponentes"
import Questionario from "../../Questionario";

declare interface Props{
    atividade:AtividadeAluno,
    fecharModalAtualizarListaAtividades: Function
}

function AtividadeFormTipoQuest({atividade,fecharModalAtualizarListaAtividades}: Props){
    return (
        <div>
            <TituloAtividadeStyled>
                <h3>{atividade.enunciado}</h3>
                <Questionario idBancoQuestao={atividade.idBancoQuestao} idAtividade={atividade.id} finalizarAtividadeQuest={fecharModalAtualizarListaAtividades}></Questionario>
            </TituloAtividadeStyled>
        </div>
    )
}

export default AtividadeFormTipoQuest