import styled from "styled-components"

var HeaderPai = styled.div`
    display:flex;
    justify-content: center;
    margin-top: 2rem;
    font: bold
`

declare interface Props{
    titulo:string
}

function HeaderPagina({titulo}:Props){
    return (
        <HeaderPai>
            <h1><b>{titulo}</b></h1>
        </HeaderPai>
    )
}

export default HeaderPagina