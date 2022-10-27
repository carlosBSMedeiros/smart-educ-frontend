import { useState, useEffect } from "react"
import './style.css'
import {recuperarAtividadesIdTrilha} from '../../services/Atividade.service'
import { carregando, erroGenericoBuilder, toastrSucessoBuilder } from "../Alerts/index";
import {Atividade} from '../../types/atividade'
import { CardAtividade, CardAtividadeLigacao } from "../CardAtividade";

declare interface Props {
    idTrilha: string
}

var AtividadesListagemProf = function({idTrilha}: Props){
   
    const [atividades, setAtividades] = useState<Atividade[]>([])

    useEffect(() => {
        recuperarAtividadesIdTrilha(idTrilha).then((response)=>{
            setAtividades(response.data as Atividade[])
        }).catch((erro) =>{
            console.log(erro)
            erroGenericoBuilder.buildStr('Ocorreu um erro ao recuperar as atividades da trilha aberta!')
        })
       
    }, [])

    return (
        <div className="container-atividades">
            {atividades.map((atv, i)=>{
                if(i < atividades.length - 1){
                    return (
                        <>
                            <CardAtividade key={atv.id} atividade={atv}/>
                            <CardAtividadeLigacao/>
                        </>
                    )
                }
                return (
                    <CardAtividade key={atv.id} atividade={atv}/>
                )
            })}
        </div>
    )
}



export {AtividadesListagemProf}

