import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

interface Props {
    label: string
    icone: string
    rota: string
}

const DivItemFuncionalidade = styled.div`
    width: 16rem;
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
        font-size: 1.3rem;
    }

    &:hover {
        transform: translateY(-6px);
    }

    img {
        width: 60px;
        height: 60px;
    }

    @media(max-width: 580px) {

        width: 18rem;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: nowrap;

        p{
            font-size: 1.5rem;
        }

        img {
            margin-left: 5px;
            width: 35px;
            height: 35px;
        }
    }

`

function FuncionalidadeItem({ label, icone, rota }: Props) {

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