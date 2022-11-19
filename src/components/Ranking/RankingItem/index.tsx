import styled from "styled-components";
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import pngAluno from '../../../assets/avatar-aluno.png'
import pngDefault from '../../../assets/avatar-default.png'
import { Ranking } from "../../../types/Ranking";

declare interface PropsItem {
    rankingInfo: Ranking,
    posicao: number
    fake:boolean
}

function RankingCopmonentItem({rankingInfo, posicao, fake=false}:PropsItem){

    const autenticacao = useAutenticacaoContext();
    const idUsuarioLogado = autenticacao.usuario.idUsuario;

    const RankingItemStyled = styled.li<PropsItem>`
        display: flex;
        margin: 5px 0 !important;
        align-items: center;
        border-radius: 10px;
        box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
        width: 20rem;
        padding: 10px;
        position: relative;
        background-color: ${PropsItem => 
            PropsItem.posicao === 1 ? '#FFD700' :
            PropsItem.posicao === 2 ? '#AAA9AD' :
            PropsItem.posicao === 3 ? '#CD7F32' : 
            'var(--color-4)'
        };
        ${ PropsItem =>
            PropsItem.rankingInfo.idAluno === idUsuarioLogado ?
            `
                border: solid 1px black;
                transform: scale(1.02);
            ` 
            : ''
        }

        h3{
            margin: 0 5px;
        }

        img{
            border-radius: 50%;
            width: 65px;
            margin: 0 5px;
        }

        div{
            position:absolute;
            left: 150px;
            margin: 0 5px;
        }

    `

    if(fake){
        return (
            <RankingItemStyled posicao={posicao+1} rankingInfo={rankingInfo} fake={false}>
                <h3>{posicao + 1}</h3>
                <img src={pngDefault}/>
                <div>
                    . . .
                </div>
            </RankingItemStyled>
        )
    } else{
        return (
            <RankingItemStyled posicao={posicao+1} rankingInfo={rankingInfo} fake={false}>
                <h3>{posicao + 1}</h3>
                <img src={pngAluno}/>
                <div>
                    <p>{rankingInfo.pontos} Pontos</p>
                    <b>{rankingInfo.nomeAluno}</b>
                </div>
            </RankingItemStyled>
        )
    }

    
}

export default RankingCopmonentItem