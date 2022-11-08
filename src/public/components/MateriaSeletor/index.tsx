import { useEffect, useState } from "react"
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import { recuperarMateriasIdProfessor } from "../../../services/Materia.service";
import { Materia } from "../../../types/materia";

declare interface Props{
    name:string
    idSelecionar:string|undefined
    handlePesquisaSelector: React.ChangeEventHandler<HTMLSelectElement>
}

function MateriaSeletor({name, idSelecionar, handlePesquisaSelector}:Props) {
    const autenticador = useAutenticacaoContext();

    useEffect(() => {
        recuperarMateriasIdProfessor(autenticador.usuario.idUsuario)
            .then(response => {
                setMaterias(response.data as Materia[])
            }).catch(error => {
                alert(error)
            })
    }, [])

    const [materias, setMaterias] = useState<Materia[]>();

    return (
        <>
            <select 
                className="form-select form-control"
                value={idSelecionar} 
                aria-label="Matérias"
                name={name}
                onChange={handlePesquisaSelector}
            >
                <option value="99" >Matéria...</option>
                {
                    materias?.map((mat,i) =>{
                        return   (<option key={i} value={mat.id}>{mat.nome}</option>)
                    })
                }
            </select>
        </>
    )
}

export default MateriaSeletor;