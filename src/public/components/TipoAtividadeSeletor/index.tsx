import { useEffect, useState } from "react"
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import { recuperarMateriasIdProfessor } from "../../../services/Materia.service";
import { Materia } from "../../../types/materia";

declare interface Props{
    name:string
    idSelecionar:string|undefined
    handlePesquisaSelector: React.ChangeEventHandler<HTMLSelectElement>
}

function TipoAtividadeSeletor({name, idSelecionar, handlePesquisaSelector}:Props) {

    return (
        <>
            <select 
                className="form-select form-control"
                value={idSelecionar} 
                aria-label="Tipo Atividade"
                name={name}
                onChange={handlePesquisaSelector}
            >
                <option value="99" >Tipo...</option>
                <option value={"QUEST"}>Questionário</option>
                <option value={"TEXTO"}>Texto</option>
                <option value={"JOGO"}>Jogo</option>
                <option value={"TRILHA"}>Trilha</option>
            </select>
        </>
    )
}

export default TipoAtividadeSeletor;