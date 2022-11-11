import styled from "styled-components"

var RodapeStyled = styled.footer`
    display: flex;
    background-color: var(--color-1);
    color: white;
    height: 4rem;
    width: 100vw;
    position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: center;
`

function Rodape(){

    return (
        <RodapeStyled>
            <p>SmartEduc - 2022</p>
        </RodapeStyled>
    )
} 

export default Rodape