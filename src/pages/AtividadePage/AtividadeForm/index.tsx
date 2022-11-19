import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import HeaderPagina from "../../../components/HeaderPagina";
import TrilhaSeletor from "../../../public/components/TrilhaSeletor";
import { incluirAtividade, recuperarPorId, validaratividade, alterarAtividade, excluirAtividade } from '../../../services/Atividade.service';
import './style.css'
import { Atividade } from '../../../types/atividade'
import { carregando, erroGenericoBuilder, toastrSucessoBuilder } from "../../../components/Alerts";
import Swal from "sweetalert2";
import TipoAtividadeSeletor from '../../../public/components/TipoAtividadeSeletor/index';
import BancoQuestaoSeletor from '../../../public/components/BancoQuestaoSeletor/index';

declare interface Props {
    isNovo: boolean
}

function AtividadeForm({ isNovo }: Props) {

    var navegacao = useNavigate();
    let { id, idTrilha } = useParams();

    console.log(id, idTrilha);
    

    const [atividade, setAtividade] = useState<Atividade>({
        id: id ? id : "",
        idTrilha: idTrilha ? idTrilha : "",
        idTrilhaAtividade: '',
        idBancoQuestao: '',
        tipoAtividade: '',
        contudoTexto: '',
        iframe: '',
        titulo:'',
        concluida: '',
        enunciado:'',
        ordem:0,
        quantConcluido:0
    })

    isNovo = (!atividade.id || atividade.id.trim() === "")

    useEffect(() => {
        if (!atividade.id || atividade.id.trim() === "") {
            return;
        }
        var carregandoRef = carregando
        carregandoRef.fire()
        recuperarPorId(atividade.id)
            .then(response => {
                carregandoRef.close()
                setAtividade(response.data as Atividade)
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados da sua atividade!').fire()
            })
    }, [])

    var handleInputChange = (e: React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setAtividade({
            ...atividade,
            [name]: value
        })
    }

    function handleSubmit() {
        var errosValidacao: string[] = validaratividade(atividade)
        if (errosValidacao.length > 0) {
            erroGenericoBuilder.build(errosValidacao).fire()
            return;
        }
        var carregandoRef = carregando
        if (isNovo) {
            carregandoRef.fire()
            incluirAtividade(atividade)
                .then(response => {
                    carregandoRef.close()
                    navegacao(`/trilhas/${idTrilha}`)
                    toastrSucessoBuilder.build('Atividade incluída com sucesso!').fire()
                    setAtividade(response.data as Atividade)
                }).catch(error => {
                    erroGenericoBuilder.buildStr('Ocorreu um problema para criar sua nova atividade!').fire()
                })
        } else {
            carregandoRef.fire()
            alterarAtividade(atividade)
                .then(response => {
                    carregandoRef.close()
                    navegacao(`/trilhas/${atividade.idTrilha}`)
                    toastrSucessoBuilder.build('Atividade alterada com sucesso!').fire()
                    setAtividade(response.data as Atividade)
                }).catch(error => {
                    erroGenericoBuilder.buildStr('Ocorreu um problema para alterar sua atividade!').fire()
                })
        }
    }

    function excluir() {
        var carregandoRef = carregando
        carregandoRef.fire()
        excluirAtividade(atividade.id).then(response => {
            carregandoRef.close()
            toastrSucessoBuilder.build('Atividade excluída com sucesso!').fire()
            navegacao(`/trilhas/${atividade.idTrilha}`)
        }).catch(erro => {
            carregandoRef.close()
            erroGenericoBuilder.buildStr('Ocorreu um problema para excluir sua atividade!').fire()
        })
    }

    return (
        <>
            <HeaderPagina titulo={isNovo ? "Nova Atividade" : "Informações da Atividade"} />
            <div className="row remove-gutter">
                <div className="col-12">
                    <form >
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="enunciado">Título</label>
                                <input type="text"
                                    onChange={handleInputChange}
                                    name="titulo"
                                    className="form-control"
                                    id="tituli"
                                    placeholder="Título..."
                                    value={atividade ? atividade.titulo : ""}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="enunciado">Enunciado</label>
                                <input type="text"
                                    onChange={handleInputChange}
                                    name="enunciado"
                                    className="form-control"
                                    id="enunciado"
                                    placeholder="enunciado da atividade..."
                                    value={atividade ? atividade.enunciado : ""}
                                />
                            </div>
                            
                            <div className="form-group col-md-6">
                                <label htmlFor="tituloTrilha">Tipo atividade</label>
                                <TipoAtividadeSeletor name="tipoAtividade" handlePesquisaSelector={handleInputChange} idSelecionar={atividade.tipoAtividade ?? "99"} />
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="enunciado">Ordem</label>
                                <input type="number"
                                    onChange={handleInputChange}
                                    name="ordem"
                                    className="form-control"
                                    id="ordem"
                                    placeholder="ordem..."
                                    value={atividade ? atividade.ordem : ""}
                                />
                            </div>

                            
                            {camposQuest()}
                            {camposTrilha()}

                        </div>
                        {camposJogo()}
                        {camposTexto()}
                    </form>
                    {getDivBtnPelaOperacao()}
                    

                </div>
            </div>
        </>
    )


    function camposTexto() {
        if (atividade.tipoAtividade === "TEXTO") {
            return (
                <div className="form-group">
                            <label htmlFor="contudoTexto">Texto</label>
                            <textarea
                                onChange={handleInputChange}
                                name="contudoTexto"
                                className="form-control"
                                id="contudoTexto"
                                placeholder="Texto"
                                value={atividade?.contudoTexto}
                            />
                        </div>
            )
        }
    }


    function camposQuest() {
        if (atividade.tipoAtividade === "QUEST") {
            return (
                <div className="form-group col-md-6">
                    <label htmlFor="tituloTrilha">Banco Questão</label>
                    <BancoQuestaoSeletor name="idBancoQuestao" handlePesquisaSelector={handleInputChange} idSelecionar={atividade.idBancoQuestao ?? "99"} />
                </div>
            )
        }
    }

    function camposTrilha() {
        if (atividade.tipoAtividade === "TRILHA") {
            return (
                <div className="form-group col-md-6">
                    <label htmlFor="tituloTrilha">Trilha</label>
                    <TrilhaSeletor name="idTrilhaAtividade" handlePesquisaSelector={handleInputChange} idSelecionar={atividade.idTrilhaAtividade ?? "99"} />
                </div>
            )
        }
    }


    function camposJogo() {
        if (atividade.tipoAtividade === "JOGO") {
            return (
                <div className="form-group">
                    <label htmlFor="iframe">Iframe do jogo</label>
                    <textarea
                        onChange={handleInputChange}
                        name="iframe"
                        className="form-control"
                        id="iframe"
                        placeholder="Iframe do jogo"
                        value={atividade?.iframe}
                    />
                </div>
            )
        }
    }

    function getDivBtnPelaOperacao() {

        if (isNovo) {
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
        } else {
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

    function abrirModalExclusao() {
        Swal.fire({
            title: 'Tem certeza que deseja excluir essa atividade?',
            text: "Todas os dados vinculadas a ela, bem como o progresso dos alunos, serão deletados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar atividade!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                excluir();
            }
        })
    }
}

export default AtividadeForm