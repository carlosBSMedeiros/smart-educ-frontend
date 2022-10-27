import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import HeaderPagina from "../../../components/HeaderPagina";
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import { incluirMateria, recuperarPorId, validarMateria, alterarMateria } from "../../../services/Materia.service";
import SerieSeletor from "../../../public/components/SerieSeletor";
import './style.css'
import { Materia } from '../../../types/materia'
import { carregando, erroGenericoBuilder, toastrSucessoBuilder } from "../../../components/Alerts";
import Swal from "sweetalert2";

declare interface Props {
    isNovo: boolean
}

function MateriaForm({ isNovo }: Props) {

    var autenticador = useAutenticacaoContext();
    var navegacao = useNavigate();
    let { id } = useParams();

    const [materia, setMateria] = useState<Materia>({
        id: id ? id : "",
        idProfessor: autenticador.usuario.idUsuario,
        idDisciplina: autenticador.usuario.idDisciplinaProfessor,
        idSerie: 99,
        serie: '',
        nome:'',
        descricao: ''
    })

    isNovo = (!materia.id || materia.id.trim() === "")

    useEffect(() => {

        if (!materia.id || materia.id.trim() === "") {
            return;
        }
        var carregandoRef = carregando
        carregandoRef.fire()
        recuperarPorId(materia.id)
            .then(response => {
                setMateria(response.data as Materia)
                carregandoRef.close()
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados!').fire()
            })
    }, [])

    var handleInputChange = (e: React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>) => {

        const { name, value } = e.target
        setMateria({
            ...materia,
            [name]: value
        })
    }

    function handleSubmit() {
        var errosValidacao: string[] = validarMateria(materia)
        if (errosValidacao.length > 0) {
            erroGenericoBuilder.build(errosValidacao).fire()
            return;
        }
        var carregandoRef = carregando
        if(isNovo){  
            carregandoRef.fire() 
            incluirMateria(materia)
            .then(response => {
                carregandoRef.close()
                navegacao("/materias")
                toastrSucessoBuilder.build('operação realizada com sucesso!').fire()
                setMateria(response.data as Materia)
            }).catch(error => {
              erroGenericoBuilder.buildStr('Ocorreu um problema ao incluir !').fire()
            })
        } else { 
            carregandoRef.fire() 
            alterarMateria(materia) 
            .then(response => {
                carregandoRef.close()
                navegacao("/materias")
                toastrSucessoBuilder.build('operação realizada com sucesso!').fire()
                setMateria(response.data as Materia)
            }).catch(error => {
              erroGenericoBuilder.buildStr('Ocorreu um problema ao alterar !').fire()
            })   
        }
    }

    return (
        <>
            <HeaderPagina titulo={isNovo ? "Nova Matéria" : "Informações da Matéria"} />
            <div className="row">
                <div className="col-12">
                    {/* <form onSubmit={handleSubmit}> */}
                    <form >
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="tituloTrilha">Título</label>
                                <input type="text"
                                    onChange={handleInputChange}
                                    name="nome"
                                    className="form-control"
                                    id="tituloTrilha"
                                    placeholder="Título da matéria..."
                                    value={materia ? materia.nome : ""}

                                />
                            </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="tituloTrilha">Série</label>
                            <SerieSeletor name="idSerie" handlePesquisaSelector={handleInputChange} idSelecionar={materia && materia.idSerie ? materia.idSerie : 99} />
                          </div>
                            
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="descricao">Descrição</label>
                            <textarea
                                onChange={handleInputChange}
                                name="descricao"
                                className="form-control"
                                id="descricao"
                                placeholder="Descrição da matéria"
                                value={materia?.descricao}
                            />
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
            title: 'Tem certeza que deseja excluir essa trilha?',
            text: "Todas as atividades vinculadas a ela, bem como o progresso dos alunos, serão deletados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar trilha!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                // excluirTrilha();
            }
          })
    }
}

export default MateriaForm