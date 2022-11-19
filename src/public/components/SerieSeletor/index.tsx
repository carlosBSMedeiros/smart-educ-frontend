import { useEffect, useState } from "react"
import { ListAll } from "../../../services/Serie.service";
import { Serie } from "../../../types/serie";

declare interface Props{
    name:string
    idSelecionar:number|undefined
    handlePesquisaSelector: React.ChangeEventHandler<HTMLSelectElement>
}

function SerieSelector({name, idSelecionar, handlePesquisaSelector}:Props) {

    useEffect(() => {
        ListAll()
            .then(response => {
                setSeries(response.data as Serie[])
            }).catch(error => {
                alert(error)
            })
    }, [])

    const [series, setSeries] = useState<Serie[]>();

    return (
        <>
            <select 
                className="form-select form-control"
                value={idSelecionar} 
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
        </>
    )

}

export default SerieSelector;