import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import png from '../../assets/seta-back.png'
import { Tooltip } from 'reactstrap';
import { useState } from "react";

var HeaderPai = styled.div`
    display:flex;
    justify-content: center;
    font: bold;
    position: relative;

    img{
        height: 30px;
        width: 35px;
        position: absolute;
        left: 30px;
    }

    img:hover{
        transform: scale(1.1);
        cursor: pointer;
    }
`

declare interface Props{
    titulo:string
}

function HeaderPagina({titulo}:Props){
    var navegacao = useNavigate();

    const[tooltipOpen,setTooltipOpen] = useState(false)

    function toggle() {
        setTooltipOpen(!tooltipOpen)
    }

    return (
        <HeaderPai>
            <img src={png} alt="Voltar" onClick={()=>navegacao(-1)} id="TooltipNavegacao" />
            <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipNavegacao" toggle={toggle}>
                Página anterior
            </Tooltip>
            <h2><b>{titulo}</b></h2>
        </HeaderPai>
    )
}

export default HeaderPagina