import { useState, useEffect } from "react"
import './style.css'
import { useNavigate, useParams } from "react-router-dom";
import { useAutenticacaoContext } from "../../context/AutenticacaoContext";
import { carregando, erroGenericoBuilder, toastrSucessoBuilder } from "../../components/Alerts";
import { recuperarPorId } from "../../services/BancoQuestao.service"
import { concluirQuest } from "../../services/Atividade.service"
import { BancoQuestao } from '../../types/bancoQuestao';
import { Questao } from "../../types/Questao"
import CardAlternativa from '../CardAlternativa';
import { RespostaQuest } from '../../types/RespostaQuest';
import Swal from "sweetalert2";

interface Props {
    idBancoQuestao: string
    idAtividade: string
    finalizarAtividadeQuest: Function
}

function Questionario({ idBancoQuestao, idAtividade, finalizarAtividadeQuest}: Props) {

    var autenticador = useAutenticacaoContext();
    var navegacao = useNavigate();

    const [steps, setSteps] = useState<Questao[]>([]);

    const [respostas, setRespostas] = useState<RespostaQuest[]>([]);
    const [respostaStep, setRespostaStep] = useState<RespostaQuest>({
        idQuestao: 999,
        respostaAluno: 999,
        respostaCorreta: 999
    });

    const [check, setCheck] = useState<string>("");

    const [currentStep, setCurrentStep] = useState(0);

    const [bancoQuestao, setBancoQuestao] = useState<BancoQuestao>({
        id: "",
        idMateria: "",
        idProfessor: "",
        nomeBanco: "",
        questoes: [],
        materia: ""
    });

    useEffect(() => {
        carregar();
    }, [])

    useEffect(() => { // esse é responsável em pegar as alterações
        setSteps(bancoQuestao.questoes)
    }, [bancoQuestao]);

    useEffect(() => { // esse é responsável em pegar as alterações
        let tempRespostas: RespostaQuest[] = respostas.filter(e => {
            return e.idQuestao !== respostaStep.idQuestao
        });

        if (respostaStep.idQuestao !== 999)
            setRespostas([...tempRespostas, respostaStep])


        setCheck(`resposta${respostaStep.respostaAluno}-${respostaStep.idQuestao}`)

    }, [respostaStep]);

    useEffect(() => { // esse é responsável em pegar as alterações
        let temps: RespostaQuest[] = respostas.filter(e => {
            return e.idQuestao === steps[currentStep].id
        })

        if (temps.length > 0)
            setRespostaStep({ ...temps[0] })
    }, [currentStep]);

    const carregar = async () => {
        var carregandoObj = carregando;
        carregandoObj.fire()
        await recuperarPorId(idBancoQuestao)
            .then(response => {
                carregandoObj.close()
                setBancoQuestao(response.data as BancoQuestao)
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados!').fire()
            })
    }

    const handlerChange = (questao: number, resp: number) => {

        respostaStep.idQuestao = steps[currentStep].id
        respostaStep.respostaCorreta = steps[currentStep].respostaCorreta
        respostaStep.respostaAluno = resp

        setRespostaStep({ ...respostaStep })

    }

    function handleNext() {
        setCurrentStep((prevState) => prevState + 1);
        limpaState();
        setCheck("")
    }

    function handlePrev() {
        setCurrentStep((prevState) => prevState - 1);
        limpaState();
    }

    const limpaState = () => {
        setRespostaStep({
            idQuestao: 999,
            respostaAluno: 999,
            respostaCorreta: 999
        });
    }

    async function handleFinalizar() {
        carregando.fire();
        concluirQuest(respostas, idAtividade, autenticador.usuario.idUsuario)
            .then(response => {
                carregando.close();
                toastrSucessoBuilder.build('Questionário respondido com sucesso!').fire()
                finalizarAtividadeQuest()
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema ao concluir a atividade!').fire()
            })
    }

    function exibirModalConfirmacaoQuest(){
        Swal.fire({
            icon: 'question',
            title: 'Tem certeza?',
            text: 'Você está prestes a finalizar o questionário, tem certeza que deseja continuar?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Enviar!',
            cancelButtonText: 'Revisar'
          }).then((result) => {
            if (result.isConfirmed) {
                handleFinalizar();
            }
          })
    }

    return (
        <div className="App">
            {steps.length > 0 && (
                <div className="">
                    <p className="step-guide">
                        {currentStep + 1} de {steps.length}
                    </p>

                    <form className="steps-form alternativas">
                        <div className="fields-container">
                            <p className="anunciado">{steps[currentStep].enunciado}</p>
                            {steps[currentStep].id >= 0 && (
                                <div className="fields">
                                    {
                                        steps[currentStep].alternativas.map((e, key) => {
                                            return <CardAlternativa alternativa={e} check={check} numero={key} key={key} idQuestao={steps[currentStep].id} handler={handlerChange}></CardAlternativa>
                                        })
                                    }
                                </div>
                            )}

                            {currentStep < steps.length - 1 && (
                                <div className="botoes">
                                    <button className={`btn btn-cor-5 ${currentStep === 0 ? 'disabled' : ''}`} type="button" onClick={handlePrev}>
                                        Anterior
                                    </button>
                                    <button className="btn btn-cor-5" type="button" onClick={handleNext}>
                                        Próximo
                                    </button>
                                </div>
                            )}

                            {currentStep === steps.length - 1 && (
                                <div className="botoes">
                                    <button className="btn btn-cor-5" type="button" onClick={handlePrev}>
                                        Anterior
                                    </button>
                                    <button className="btn submit btn-success" type="button" onClick={exibirModalConfirmacaoQuest}>
                                        Finalizar
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            )}


        </div>
    );
}

export default Questionario