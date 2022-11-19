import { useState, useEffect } from "react"
import styled from "styled-components";
import { recuperarRankingAtividade, recuperarRankingTrilha } from "../../services/Ranking.service";
import { Ranking } from "../../types/Ranking";
import { erroGenericoBuilder } from "../Alerts";
import RankingCopmonentItem from "./RankingItem";

const RankingStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h4{
        margin-bottom: 1rem;
    }
    ul{
        list-style-type: none;
        padding-left: 0;
        max-height: 60vh;
        overflow-y: scroll;
        overflow-x: visible;
        width: 400px;
        padding: 0 2rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;

        ::-webkit-scrollbar {
            width: 5px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: transparent; 
          }
           
          ::-webkit-scrollbar-thumb {
            background: var(--color-2);  
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: var(--color-1); 
          }
    }
`
declare interface Props {
    id: string,
    tipo: string
}

const rankingFakeItem:Ranking = {
    nomeAluno: '',
    idAluno:'',
    id:'',
    idTrilha:'',
    pontos:0,
    titulo:''
}

function RankingComponent({ id, tipo }: Props) {

    const [ranking, setRanking] = useState<Ranking[]>([])

    useEffect(() => {
        if (tipo === 'trilha') {
            _recuperarRankingTrilha();
        } else {
            _recuperarRankingAtividade();
        }
    }, [])

    function _recuperarRankingTrilha() {
        recuperarRankingTrilha(id).then(response => {
            var ranking = construirRankingOrdenado(response.data);
            setRanking(ranking);
        }).catch(erro => {
            console.log(erro);
            erroGenericoBuilder.buildStr('Ocorreu um problema ao recuperar os dados do ranking dessa Trilha').fire();
        })
    }
    
    function _recuperarRankingAtividade() {
        recuperarRankingAtividade(id).then(response => {
            var ranking = construirRankingOrdenado(response.data);
            setRanking(ranking);
        }).catch(erro => {
            console.log(erro)
            erroGenericoBuilder.buildStr('Ocorreu um problema ao recuperar os dados do ranking dessa atividade').fire()
        })
    }

    function construirRankingOrdenado(data:any){
        var ranking = data as Ranking[]
        ranking.sort((a:Ranking, b:Ranking) =>{
            if (a.pontos < b.pontos) {
                return 1;
              }
              if (a.pontos > b.pontos) {
                return -1
              }
              return 0;
        })
        return ranking;
    }

    function getNomeRanking(){
        let nome = tipo === 'atividade' ? 'Atividade' : 'Trilha'
        let nomeAtivTrilha = ''

        if(ranking.length > 0){
            nomeAtivTrilha = ranking[0].titulo
        }

        return `${nome} - ${nomeAtivTrilha}`;
    }

    return (
        <RankingStyled>
            <h4>{getNomeRanking()}</h4>
            <ul>
            {ranking.map((item,key) =>{
                return <RankingCopmonentItem 
                    key={key.toString()} 
                    rankingInfo={item} 
                    posicao={key}
                    fake={false}
                />
            })}
            <RankingCopmonentItem 
                key={'penultimo'} 
                rankingInfo={rankingFakeItem} 
                posicao={ranking.length}
                fake={true}
            />
            <RankingCopmonentItem 
                key={'ultimo'} 
                rankingInfo={rankingFakeItem} 
                posicao={ranking.length+1}
                fake={true}
            />
            </ul>
        </RankingStyled>
    )
}

export default RankingComponent