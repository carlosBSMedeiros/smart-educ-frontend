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
    var recuperouMaterias = false; 
    var autenticador = useAutenticacaoContext();

    useEffect(() => {
        recuperarMateriasIdProfessor(autenticador.usuario.idUsuario)
            .then(response => {
                setMaterias(response.data as Materia[])
                recuperouMaterias = true;
            }).catch(error => {
                alert(error)
            })
    }, [])

    const [materias, setMaterias] = useState<Materia[]>();
    const [idSelecionarEst, setIdSelecionarEst] = useState(idSelecionar)


    console.log('idSelecionarEst', idSelecionarEst)
    return (
        <>
            <select 
                className="form-select form-control"
                defaultValue={idSelecionarEst ? idSelecionarEst : "99"} 
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
            {
               adicionarIconCarregando()
            }
            
        </>
    )

    function adicionarIconCarregando(){
        var returnValue = recuperouMaterias ? ( <i className='fa-circle-o-notch fa-spin' />) : ''
        return returnValue
    }

}

export default MateriaSeletor;