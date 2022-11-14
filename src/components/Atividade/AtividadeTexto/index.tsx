import { AtividadeAluno } from "../../../types/atividade"
import styled from "styled-components"
import { AtividadeConcluidaStyled, ConcluirAtividadeButton, ConcluirAtividadeStyled, ConteudoAtividadeStyled, TituloAtividadeStyled } from "../styledComponentes"
import { concluirTexto } from "../../../services/Atividade.service"
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext"
import { erroGenericoBuilder } from "../../Alerts"

declare interface Props{
    atividade:AtividadeAluno,
    fecharModalAtualizarListaAtividades: Function
}

function AtividadeFormTipoTexto({atividade, fecharModalAtualizarListaAtividades}:Props){
    
    var autenticador = useAutenticacaoContext();

    function concluirAtividade(){
        concluirTexto(atividade.id,autenticador.usuario.idUsuario).
        then((response) =>{
            console.log(response)
            fecharModalAtualizarListaAtividades();
        }).catch(error =>{
            erroGenericoBuilder.buildStr('Ocorreu um problema para concluir sua atividade!').fire()
        })   
    }
    
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
                <ConcluirAtividadeButton onClick={concluirAtividade}>
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