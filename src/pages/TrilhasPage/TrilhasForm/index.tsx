import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import HeaderPagina from "../../../components/HeaderPagina";
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import MateriaSeletor from "../../../public/components/MateriaSeletor";
import { incluirTrilha, recuperarPorId, validarTrilha, alterarTrilha } from "../../../services/Trilha.service";
import { excluirTrilha as excluirTrilhaService } from "../../../services/Trilha.service";
import './style.css'
import { TrilhaRequest } from '../../../types/trilha'
import { carregando, erroGenericoBuilder, toastrSucessoBuilder } from "../../../components/Alerts";
import {AtividadesListagemProf} from '../../../components/AtividadesListagem'
import Swal from "sweetalert2";

declare interface Props {
    isNovo: boolean
}

function TrilhasForm({ isNovo }: Props) {

    var autenticador = useAutenticacaoContext();
    var navegacao = useNavigate();
    let { id } = useParams();

    const [trilha, setTrilha] = useState<TrilhaRequest>({
        id: id ? id : "",
        concluida: false,
        descricao: "",
        ordem:null,
        idMateria: "",
        idProfessor: autenticador.usuario.idUsuario,
        titulo: "",
        nomeMateria: "",
        quantAtividades: 0
    })

    isNovo = (!trilha.id || trilha.id.trim() === "")

    useEffect(() => {

        if (!trilha.id || trilha.id.trim() === "") {
            return;
        }
        var carregandoRef = carregando
        carregandoRef.fire()
        recuperarPorId(trilha.id)
            .then(response => {
                carregandoRef.close()
                setTrilha(response.data as TrilhaRequest)
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados da sua trilha!').fire()
            })
    }, [])

    var handleInputChange = (e: React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>) => {

        const { name, value } = e.target
        setTrilha({
            ...trilha,
            [name]: value
        })
    }

    function handleSubmit() {
        var errosValidacao: string[] = validarTrilha(trilha)
        if (errosValidacao.length > 0) {
            erroGenericoBuilder.build(errosValidacao).fire()
            return;
        }
        var carregandoRef = carregando
        if(isNovo){  
            carregandoRef.fire() 
            incluirTrilha(trilha)
            .then(response => {
                carregandoRef.close()
                navegacao("/trilhas")
                toastrSucessoBuilder.build('Trilha incluída com sucesso!').fire()
                setTrilha(response.data as TrilhaRequest)
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para criar sua nova trilha!').fire()
            })
        } else { 
            carregandoRef.fire() 
            alterarTrilha(trilha) 
            .then(response => {
                carregandoRef.close()
                navegacao("/trilhas")
                toastrSucessoBuilder.build('Trilha alterada com sucesso!').fire()
                setTrilha(response.data as TrilhaRequest)
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para alterar sua trilha!').fire()
            })   
        }
    }

    function excluirTrilha(){
        var carregandoRef = carregando
        carregandoRef.fire() 
        excluirTrilhaService(trilha.id).then(response =>{
            carregandoRef.close()
            toastrSucessoBuilder.build('Trilha excluída com sucesso!').fire()
            navegacao("/trilhas")
        }).catch(erro =>{
            carregandoRef.close()
            erroGenericoBuilder.buildStr('Ocorreu um problema para excluir sua trilha!').fire()
        })
    }

    return (
        <>
            <HeaderPagina titulo={isNovo ? "Nova Trilha" : "Informações da Trilha"} />
            <div className="row remove-gutter">
                <div className="col-12">
                    <form >
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="tituloTrilha">Título</label>
                                <input type="text"
                                    onChange={handleInputChange}
                                    name="titulo"
                                    className="form-control"
                                    id="tituloTrilha"
                                    placeholder="Título da Trilha..."
                                    value={trilha ? trilha.titulo : ""}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="tituloTrilha">Matéria</label>
                                <MateriaSeletor name="idMateria" handlePesquisaSelector={handleInputChange} idSelecionar={trilha && trilha.idMateria ? trilha.idMateria : "99"} />
                            </div>

                            <div className="form-group col-md-3">
                                <label htmlFor="ordem">Ordem</label>
                                <input type="number"
                                    onChange={handleInputChange}
                                    name="ordem"
                                    className="form-control"
                                    id="ordem"
                                    placeholder="ordem"
                                    value={trilha.ordem==null?"":trilha.ordem}
                                />
                            </div>

                        </div>
                        <div className="form-group">
                            <label htmlFor="descricaoTrilha">Descrição</label>
                            <textarea
                                onChange={handleInputChange}
                                name="descricao"
                                className="form-control"
                                id="descricaoTrilha"
                                placeholder="Descrição da trilha"
                                value={trilha?.descricao}
                            />
                        </div>
                    </form>
                    {getDivBtnPelaOperacao()}
                    {getDivAtividadesPelaOperacao()}
                    
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

    function getDivAtividadesPelaOperacao(){
        if(isNovo){
            return <></>
        } 

        return (    
            <>
                <div className="container-atividades-header">
                    <h3>Atividades</h3>
                </div>
                <div className="container-atividades-trilha">
                    <AtividadesListagemProf idTrilha={trilha.id}></AtividadesListagemProf>
                </div>
            </>
        )
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
                excluirTrilha();
            }
          })
    }
}

export default TrilhasForm