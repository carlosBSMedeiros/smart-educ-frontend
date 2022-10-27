import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import HeaderPagina from "../../../components/HeaderPagina";
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import { incluirTurma, recuperarPorId, validarTurma, alterarTurma, excluirTurma } from '../../../services/Turma.service';
import SerieSeletor from "../../../public/components/SerieSeletor";
import './style.css'
import { carregando, erroGenericoBuilder, toastrSucessoBuilder } from "../../../components/Alerts";
import Swal from "sweetalert2";
import { Turma } from "../../../types/turma";

declare interface Props {
    isNovo: boolean
}

function TurmaForm({ isNovo }: Props) {

    var autenticador = useAutenticacaoContext();
    var navegacao = useNavigate();
    let { id } = useParams();

    const [turma, setTurma] = useState<Turma>({
        id: id ? id : "",
        idProfessor: autenticador.usuario.idUsuario,
        idSerie: 99,
        serie: '',
        codigo:'',
        idEscola:autenticador.usuario.idEscola
    })

    isNovo = (!turma.id || turma.id.trim() === "")

    useEffect(() => {

        if (!turma.id || turma.id.trim() === "") {
            return;
        }
        var carregandoRef = carregando
        carregandoRef.fire()
        recuperarPorId(turma.id)
            .then(response => {
                setTurma(response.data as Turma)
                carregandoRef.close()
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados!').fire()
            })
    }, [])

    var handleInputChange = (e: React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>) => {

        const { name, value } = e.target
        setTurma({
            ...turma,
            [name]: value
        })
    }

    function handleSubmit() {
        var errosValidacao: string[] = validarTurma(turma)
        if (errosValidacao.length > 0) {
            alert("teste")
            erroGenericoBuilder.build(errosValidacao).fire()
            return;
        }
        var carregandoRef = carregando
        if(isNovo){  
            carregandoRef.fire() 
            incluirTurma(turma)
            .then(response => {
                carregandoRef.close()
                navegacao("/turmas")
                toastrSucessoBuilder.build('operação realizada com sucesso!').fire()
                setTurma(response.data as Turma)
            }).catch(error => {
              erroGenericoBuilder.buildStr('Ocorreu um problema ao incluir !').fire()
            })
        } else { 
            carregandoRef.fire() 
            alterarTurma(turma) 
            .then(response => {
                carregandoRef.close()
                navegacao("/turmas")
                toastrSucessoBuilder.build('operação realizada com sucesso!').fire()
                setTurma(response.data as Turma)
            }).catch(error => {
              erroGenericoBuilder.buildStr('Ocorreu um problema ao alterar !').fire()
            })   
        }
    }

    return (
        <>
            <HeaderPagina titulo={isNovo ? "Nova Turma" : "Informações da Turma"} />
            <div className="row">
                <div className="col-12">
                    {/* <form onSubmit={handleSubmit}> */}
                    <form >
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="codigo">Código</label>
                                <input type="text"
                                    onChange={handleInputChange}
                                    name="codigo"
                                    className="form-control"
                                    id="codigo"
                                    placeholder="Código da turma..."
                                    value={turma ? turma.codigo : ""}

                                />
                            </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="idSerie">Série</label>
                            <SerieSeletor name="idSerie" handlePesquisaSelector={handleInputChange} idSelecionar={turma && turma.idSerie ? turma.idSerie : 99} />
                          </div>
                            
                        </div>
                    
                    </form>
                        {getDivBtnPelaOperacao()}
                </div>
            </div>
        </>
    )

    function getDivBtnPelaOperacao() {
        
        if(isNovo){
            return (
                <div className="botoes-form-div inc">
                    <button 
                        className="btn btn-cor-5"
                        onClick={handleSubmit}
                    >
                        Salvar
                    </button>
                </div>
            )
        } else{
            return (
                <div className="botoes-form-div alt">
                    <button 
                        className="btn btn-danger"
                        onClick={abrirModalExclusao}
                    >
                        Excluir
                    </button>
                    <button 
                        className="btn btn-cor-5"
                        onClick={handleSubmit}
                    >
                        Alterar
                    </button>
                </div>
            )
        }
  
    }

    function abrirModalExclusao(){
        Swal.fire({
            title: 'Tem certeza que deseja excluir?',
            text: "Todas os registros vinculados, bem como o progresso dos alunos, serão deletados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                carregando.fire();
                excluirTurma(turma.id, autenticador.usuario.idUsuario)
                .then(response => {
                    navegacao("/turmas")
                    carregando.close();
                }).catch(error => {
                    erroGenericoBuilder.buildStr('Ocorreu um problema ao excluir!').fire()
                })
            }
          })
    }
}

export default TurmaForm