import styled from "styled-components"


export const TituloAtividadeStyled = styled.div`
    text-align: center;
`

export const ConteudoAtividadeStyled = styled.div`
    margin-top: 2rem;
`

export const ConcluirAtividadeStyled = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: row-reverse;
`

export const AtividadeConcluidaStyled = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: center;
`

export const ConcluirAtividadeButton = styled.button`
    background-color: var(--color-2);
    color: #ffffff;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:hover{
        background-color: var(--color-1);
        cursor: pointer;
    }
`