import { Link } from "react-router-dom"
import { ReqAlunoTurma } from '../../types/ReqAlunoTurma';
import { incluirAlunoTurma, recuperaTurmasIdAluno } from "../../services/AlunoTurma.service"
import { getByCodigo } from "../../services/Turma.service"
import { carregando, erroGenericoBuilder, toastrSucessoBuilder } from "../Alerts";
import { useAutenticacaoContext } from "../../context/AutenticacaoContext";
import { useState } from "react"
import './style.css';
import { Turma } from "../../types/turma";
import Swal from "sweetalert2";
import { AlunoTurma } from "../../types/AlunoTurma";


interface Props{
    handle: () => void
    alunoTurmas : AlunoTurma[]
  }

function AdesaoTurma({handle, alunoTurmas}: Props) {

    
    var autenticador = useAutenticacaoContext();

    const [codigo, setCodigo] = useState<string>("") 
    const [turma, setTurma] = useState<Turma>({
        id : '',
        idProfessor: '',
        idSerie: 99,
        serie: '',
        codigo:'',
        idEscola:''
    })

    var handleInputChange = (e: React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>) => {

        const { value } = e.target
        setCodigo(value)
    }

    const aderir = (): void => {
        carregando.fire()
        getByCodigo(codigo)
        .then(response => {
            setTurma(response.data as Turma)
            carregando.close()
            if(turma.id===""){
                Swal.fire('Nenhuma Turma encontrada')
            }else{
                if(isExiste(turma)){
                    incAlunoTurma();
                }else{
                    Swal.fire('Turma já vínculada!')
                }
                
            }
        }).catch(error => {
            erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados !').fire()
        })
        
    }

    function isExiste (turma: Turma):boolean {
        let has:boolean = true;
        alunoTurmas.forEach(e =>{
            if(turma.id === e.idTurma){
                has = false
            }
        });

        return has;
    }

    const incAlunoTurma = () => {
        carregando.fire()

        let alunoTurma:ReqAlunoTurma = {
            id:"",
            idAluno:autenticador.usuario.idUsuario,
            idTurma:turma.id
        }

        incluirAlunoTurma(alunoTurma)
        .then(response => {
            setTurma(response.data as Turma)
            carregando.close()
            handle();
            toastrSucessoBuilder.build('operação realizada com sucesso!').fire()
        }).catch(error => {
            erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados !').fire()
        })
    }

    return (
        <>
            <div className="col-md-12 centralizar-adesao">

                <input type="text"
                    onChange={handleInputChange}
                    name="codigo"
                    className="form-control tamanho-adesao"
                    id="codigo"
                    placeholder="Código da turma..."
                    value={codigo}
                />

                <button onClick={aderir} type="button" className="btn btn-cor-5">Entrar</button>
            </div>
        </>
    )
}


export default AdesaoTurma;
