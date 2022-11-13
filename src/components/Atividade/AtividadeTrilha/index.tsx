import { AtividadeAluno } from "../../../types/atividade"
import styled from "styled-components"
import { ConteudoAtividadeStyled, TituloAtividadeStyled } from "../styledComponentes"

declare interface Props{
    atividade:AtividadeAluno
}

const DivBotaoTrilha = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
`

function AtividadeFormTipoTrilha({atividade}: Props){

    function navegarParaTrilha(){
        window.location.href = `${atividade.idTrilhaAtividade}`
    }

    return (
        <div>
            <TituloAtividadeStyled>
                <h3>{atividade.enunciado}</h3>
            </TituloAtividadeStyled>
            <ConteudoAtividadeStyled>
                Essa atividade é uma nova trilha de aprendizado! Para seguir na trilha atual, você deve concluir a trilha abaixo. Clique no botão para ser levado a nova trilha
                <DivBotaoTrilha>
                    <button className="btn btn-cor-5" onClick={navegarParaTrilha}>
                        Seguir para a trilha!
                    </button>
                </DivBotaoTrilha>
            </ConteudoAtividadeStyled>
        </div>
    )
}

export default AtividadeFormTipoTrilha