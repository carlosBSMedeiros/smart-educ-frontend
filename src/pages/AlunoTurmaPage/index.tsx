import {useState, useEffect} from "react"
import HeaderPagina from "../../components/HeaderPagina"
import './style.css'
import { AlunoTurma } from "../../types/AlunoTurma"
import CardAlunoTurma from "../../components/CardAlunoTurma"
import { recuperaTurmasIdAluno } from "../../services/AlunoTurma.service"
import { erroGenericoBuilder,carregando } from "../../components/Alerts"
import { useAutenticacaoContext } from "../../context/AutenticacaoContext"
import AdesaoTurma from '../../components/AdesaoTurma/index';


//#endregion

function AlunoTurmasPage() {
    var autenticador = useAutenticacaoContext();
    const [alunoTurmas, setAlunoTurmas] = useState<AlunoTurma[]>([])

    useEffect(() => {
        carregar();
    }, [])

    const carregar = () =>{
        var carregandoObj = carregando;
        carregandoObj.fire()
        recuperaTurmasIdAluno(autenticador.usuario.idUsuario)
            .then(response => {
                carregandoObj.close()
                setAlunoTurmas(response.data as AlunoTurma[])
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados!').fire()
            })
    }

    return (
        <>
            <HeaderPagina titulo="Turmas" />
            <AdesaoTurma  alunoTurmas={alunoTurmas} handle={carregar}></AdesaoTurma>
            
            <div className="row mt-4 p-4 wrapperTrilhas">
                {
                    alunoTurmas.map(e => {
                        return <CardAlunoTurma key={e.id} alunoTurma={e}/>
                    })
                }
            </div>
        </>
    )
}

export default AlunoTurmasPage


