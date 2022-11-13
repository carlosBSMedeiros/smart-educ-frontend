import { AtividadeAluno } from "../../../types/atividade"
import styled from "styled-components"
import { AtividadeConcluidaStyled, ConcluirAtividadeButton, ConcluirAtividadeStyled, ConteudoAtividadeStyled, TituloAtividadeStyled } from "../styledComponentes"

declare interface Props{
    atividade:AtividadeAluno
}



function AtividadeFormTipoTexto({atividade}:Props){

    function verificarAtividadeConcluida(){
        if (atividade.concluida){
            return(
                <AtividadeConcluidaStyled>
                    Atividade já concluída! Parabéns!
                </AtividadeConcluidaStyled>
            )
        } else {
            return(
            <ConcluirAtividadeStyled>
                <ConcluirAtividadeButton>
                    Concluir Atividade
                </ConcluirAtividadeButton>
            </ConcluirAtividadeStyled>
            )
        }
    }

    return (
        <div>
            <TituloAtividadeStyled>
                <h3>{atividade.enunciado}</h3>
            </TituloAtividadeStyled>
            <ConteudoAtividadeStyled>
                {atividade.conteudoTexto}
            </ConteudoAtividadeStyled>
            {verificarAtividadeConcluida()}
        </div>
    )
}



export default AtividadeFormTipoTexto