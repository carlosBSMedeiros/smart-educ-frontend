import { AtividadeAluno } from "../../../types/atividade"
import styled from "styled-components"
import { TituloAtividadeStyled } from "../styledComponentes"
import Wordwall from "./Wordwall";

declare interface Props{
    atividade:AtividadeAluno,
    fecharModalAtualizarListaAtividades: Function
}

function AtividadeFormTipoJogo({atividade,fecharModalAtualizarListaAtividades}: Props){
    return (
        <div>
            <TituloAtividadeStyled>
                <h3>{atividade.enunciado}</h3>
                <Wordwall idAtividade={atividade.id} funcaoFinalizarJogo={fecharModalAtualizarListaAtividades}></Wordwall>
            </TituloAtividadeStyled>
        </div>
    )
}

export default AtividadeFormTipoJogo