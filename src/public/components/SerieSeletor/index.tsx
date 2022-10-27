import { useEffect, useState } from "react"
import { ListAll } from "../../../services/Serie.service";
import { Serie } from "../../../types/serie";

declare interface Props{
    name:string
    idSelecionar:number|undefined
    handlePesquisaSelector: React.ChangeEventHandler<HTMLSelectElement>
}

function MateriaSeletor({name, idSelecionar, handlePesquisaSelector}:Props) {
    var recuperouSeries = false; 
    

    useEffect(() => {
        ListAll()
            .then(response => {
                setSeries(response.data as Serie[])
                recuperouSeries = true;
            }).catch(error => {
                alert(error)
            })
    }, [])

    const [series, setSeries] = useState<Serie[]>();
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
                <option value="99" >Série...</option>
                {
                    series?.map((item,i) =>{
                        return   (<option key={i} value={item.id}>{item.nome}</option>)
                    })
                }
            </select>
            {
               adicionarIconCarregando()
            }
            
        </>
    )

    function adicionarIconCarregando(){
        var returnValue = recuperouSeries ? ( <i className='fa-circle-o-notch fa-spin' />) : ''
        return returnValue
    }

}

export default MateriaSeletor;