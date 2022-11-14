import { AtividadeAluno } from "../../../types/atividade"
import styled from "styled-components"
import { TituloAtividadeStyled } from "../styledComponentes"
import Wordwall from "../../Wordwall";

declare interface Props{
    atividade:AtividadeAluno
}

function AtividadeFormTipoJogo({atividade}: Props){
    return (
        <div>
            <TituloAtividadeStyled>
                <h3>{atividade.enunciado}</h3>
                <Wordwall idAtividade={atividade.id}></Wordwall>
            </TituloAtividadeStyled>
            
        </div>
    )
}

export default AtividadeFormTipoJogo