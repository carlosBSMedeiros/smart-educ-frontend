import { useEffect, useState } from "react"
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import { recuperarTrilhasIdProfessor } from "../../../services/Trilha.service";
import { TrilhaRequest } from "../../../types/trilha";

declare interface Props{
    name:string
    idSelecionar:string|undefined
    handlePesquisaSelector: React.ChangeEventHandler<HTMLSelectElement>
}

function TrilhaSeletor({name, idSelecionar, handlePesquisaSelector}:Props) {
    const autenticador = useAutenticacaoContext();

    useEffect(() => {
        recuperarTrilhasIdProfessor(autenticador.usuario.idUsuario)
            .then(response => {
                setTrilhas(response.data as TrilhaRequest[])
            }).catch(error => {
                alert(error)
            })
    }, [])

    const [trilhas, setTrilhas] = useState<TrilhaRequest[]>();

    return (
        <>
            <select 
                className="form-select form-control"
                value={idSelecionar} 
                aria-label="Matérias"
                name={name}
                onChange={handlePesquisaSelector}
            >
                <option value="99" >Trilha...</option>
                {
                    trilhas?.map((trilha,i) =>{
                        return   (<option key={i} value={trilha.id}>{trilha.titulo}</option>)
                    })
                }
            </select>
        </>
    )
}

export default TrilhaSeletor;