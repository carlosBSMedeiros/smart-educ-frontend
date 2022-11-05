import '../style.css'
import { useState, useEffect } from "react"
import {recuperarAtividadesIdTrilha} from '../../../services/Atividade.service'
import { carregando, erroGenericoBuilder, toastrSucessoBuilder } from "../../Alerts/index";
import {AtividadeAluno} from '../../../types/atividade'
import { CardAtividade, CardAtividadeAluno, CardAtividadeLigacao } from "../../CardAtividade";


declare interface Props{
    atividadesParam:AtividadeAluno[]
}

var AtividadesListagemAluno = function({atividadesParam}:Props){
   
    var atividades = atividadesParam
    console.log('AtividadesListagemAluno: ', atividades)

    return (
        <div className="container-atividades aluno">
            {atividades.map((atv, i)=>{
                if(i < atividades.length - 1){
                    return (
                        <>
                            <CardAtividadeAluno key={atv.id} atividade={atv}/>
                            <CardAtividadeLigacao key={atv.id+"ligac"}/>
                        </>
                    )
                }
                return (
                    <CardAtividadeAluno key={atv.id} atividade={atv}/>
                )
            })}
        </div>
    )
}




export {AtividadesListagemAluno}