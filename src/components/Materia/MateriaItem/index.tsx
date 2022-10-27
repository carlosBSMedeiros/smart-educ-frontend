import styled from "styled-components"
import {Materia} from "../../../types/materia"


declare interface Props {
    materia:Materia	
}

var MateriaItemDiv = styled.div`
    height: 3rem;
    width: 60vw;
    background-color: var(--color-4);
    border: 1px solid var(--color-3);
    border-radius: 10px;
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
    padding: 10px 65px;
    transition: all .3s ease-in-out 0s;
    cursor: pointer;
    outline: none;

    p{
        font-weight: bold;
        font-size: 1.5rem;
    }
`

function MateriaItem({ materia }: Props) {

    return (
        <MateriaItemDiv>
            materia.nome
        </MateriaItemDiv>
    );

}

export default MateriaItem