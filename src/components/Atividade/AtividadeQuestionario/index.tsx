import { AtividadeAluno } from "../../../types/atividade"
import styled from "styled-components"
import { AtividadeConcluidaStyled, TituloAtividadeStyled } from "../styledComponentes"
import Questionario from "../../Questionario";

declare interface Props {
    atividade: AtividadeAluno,
    fecharModalAtualizarListaAtividades: Function
}

function AtividadeFormTipoQuest({ atividade, fecharModalAtualizarListaAtividades }: Props) {

    function verificarAtividadeConcluida() {
        if (atividade.concluida) {
            return (
                <AtividadeConcluidaStyled>
                    Questionário já concluído! Parabéns!
                </AtividadeConcluidaStyled>
            )
        } else {
            return (
                <Questionario idBancoQuestao={atividade.idBancoQuestao} idAtividade={atividade.id} finalizarAtividadeQuest={fecharModalAtualizarListaAtividades}></Questionario>
            )
        }
    }

    return (
        <div>
            <TituloAtividadeStyled>
                <h3>{atividade.enunciado}</h3>
            </TituloAtividadeStyled>
            {verificarAtividadeConcluida()}
        </div>
    )
}

export default AtividadeFormTipoQuest