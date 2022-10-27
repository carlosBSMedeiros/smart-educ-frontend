import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

interface Props {
    label: string
    icone: string
    rota: string
}

const DivItemFuncionalidade = styled.div`
    width: 18rem;
    background-color: var(--color-4);
    border: 1px solid var(--color-3);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
    padding: 10px 65px;
    transition: all .3s ease-in-out 0s;
    cursor: pointer;
    outline: none;
    margin: 1rem 0.75rem ;

    p{
        font-weight: bold;
        font-size: 1.5rem;
    }

    &:hover {
        transform: translateY(-6px);
    }

    img {
        width: 64px;
        height: 64px;
    }

    @media(max-width: 580px) {

        flex-direction: row;

        img {
            margin-left: 5px;
            width: 30px;
            height: 30px;
        }
    }

`


function FuncionalidadeItem({ label, icone, rota }: Props) {

    var isMobile = window.matchMedia("(max-width: 600px)").matches
    console.log('isMobile', isMobile)


    return (
        <Link to={"/" + rota}>
            <DivItemFuncionalidade>
                <p>{label}</p>
                
                <img src={icone} alt="React Logo" />
                
            </DivItemFuncionalidade>
        </Link>
    )
}

export default FuncionalidadeItem