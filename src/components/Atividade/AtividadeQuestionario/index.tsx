import { AtividadeAluno } from "../../../types/atividade"
import styled from "styled-components"
import { TituloAtividadeStyled } from "../styledComponentes"

declare interface Props{
    atividade:AtividadeAluno
}

function AtividadeFormTipoQuest({atividade}: Props){
    return (
        <div>
            <TituloAtividadeStyled>
                <h3>{atividade.enunciado}</h3>
            </TituloAtividadeStyled>
            
        </div>
    )
}

export default AtividadeFormTipoQuest