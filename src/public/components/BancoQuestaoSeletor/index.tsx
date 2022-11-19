import { useEffect, useState } from "react"
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import { recuperarBancoQuestaosIdProfessor } from "../../../services/BancoQuestao.service";
import { BancoQuestao } from "../../../types/bancoQuestao";
import { Questao } from '../../../types/Questao';

declare interface Props{
    name:string
    idSelecionar:string|undefined
    handlePesquisaSelector: React.ChangeEventHandler<HTMLSelectElement>
}

function BancoQuestaoSeletor({name, idSelecionar, handlePesquisaSelector}:Props) {
    const autenticador = useAutenticacaoContext();

    useEffect(() => {
        recuperarBancoQuestaosIdProfessor(autenticador.usuario.idUsuario)
            .then(response => {
                setBancoQuestoes(response.data as BancoQuestao[])
            }).catch(error => {
                alert(error)
            })
    }, [])

    const [bancoQuestoes, setBancoQuestoes] = useState<BancoQuestao[]>();

    return (
        <>
            <select 
                className="form-select form-control"
                value={idSelecionar} 
                aria-label="Matérias"
                name={name}
                onChange={handlePesquisaSelector}
            >
                <option value="99" >Banco de Questão...</option>
                {
                    bancoQuestoes?.map((banco,i) =>{
                        return   (<option key={i} value={banco.id}>{banco.nomeBanco}</option>)
                    })
                }
            </select>
        </>
    )
}

export default BancoQuestaoSeletor;