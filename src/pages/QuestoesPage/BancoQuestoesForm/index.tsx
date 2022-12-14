import HeaderPagina from "../../../components/HeaderPagina";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import MateriaSeletor from "../../../public/components/MateriaSeletor";
import { incluirBancoQuestao, recuperarPorId, validarBancoQuestao, alterarBancoQuestao } from "../../../services/BancoQuestao.service";
import './style.css';
import { carregando, erroGenericoBuilder, toastrSucessoBuilder } from "../../../components/Alerts";
import { BancoQuestao } from '../../../types/bancoQuestao';
import CardQuestao from "../../../components/CardQuestao";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Questao } from "../../../types/Questao";

declare interface Props {
  isNovo: boolean;
}

function BancoQuestoesForm({ isNovo }: Props) {
  
  var autenticador = useAutenticacaoContext();
  var navegacao = useNavigate();
  let { id } = useParams();  


  const [bancoQuestao, setBancoQuestao] = useState<BancoQuestao>({
    id: id ? id : "",
    idMateria: "",
    idProfessor: autenticador.usuario.idUsuario,
    nomeBanco: "",
    questoes: [],
    materia: ""
  });

  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(false);

  const toggle = () => {
    if(modal){
      LimpQuestao();
    }
    
    setModal(!modal);
  }
  const [questao, setQuestao] = useState<Questao>({ id: 999, 
  enunciado: "",
  alternativas:[],
  respostaCorreta:99,
  explicacao:""});
  const [questoes, setQuestoes] = useState<Questao[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setQuestao({ ...questao, [name]: value })
  }

  const handleTextoAlternativa = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    let { value , id} = e.target
    let index = 0;
    switch (id) {
      case "quest1":
        index= 0;
        break;

      case "quest2":
        index= 1;
        break;

      case "quest3":
        index= 2;
        break;
    
      case "quest4":
        index= 3;
        break;
    }

    let alternativas = [...questao.alternativas]
    alternativas[index] = value;
    questao.alternativas = alternativas

    setQuestao({ ...questao })
  }

  const handleChangeAlternativa = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    let { name, id } = e.target
    
    let valor:number = 99;

    switch (id) {
      case "quest1":
        valor= 0;
        break;

      case "quest2":
        valor= 1;
        break;

      case "quest3":
        valor= 2;
        break;
    
      case "quest4":
        valor= 3;
        break;
    }
    setQuestao({ ...questao, [name]: valor })
    
  }

  const LimpQuestao = () =>{
    setQuestao({ id: 999, 
    enunciado: "",
    alternativas:[],
    respostaCorreta:99,
    explicacao:""});
  }

  const addTask = (): void => {

    if(!editando){
      questao.id = questao.id = Math.floor(Math.random() * 1000);
      setQuestoes([...questoes, questao]);
    }else{
      let quest = questoes.filter((e) => { if(e.id !== questao.id) return e})
      setQuestoes([...quest, questao]);

    }

    closeModal();
    
  }

  const handleModal = (e : Questao) => {
    setQuestao(e);
    setEditando(true);
    toggle();
  }

  const handleExcluir = (e : Questao) => {
    setQuestoes(questoes.filter((item)=>{return item.id !== e.id }))
  }

  const hanlderNovaQuestao = () => {
    setEditando(false);
    toggle();
  }

  const closeModal = () => {
    setEditando(false);
    LimpQuestao();
    toggle();
  }

  useEffect(() => { // esse ?? respons??vel em pegar as altera????es
    bancoQuestao.questoes.forEach(e=>{
      if(e.id === null){
        e.id = Math.floor(Math.random() * 1000);
      }
    })
    setQuestoes(bancoQuestao.questoes)
}, [bancoQuestao]);

  useEffect(() => {
    carregar();
  }, [])

  const carregar = () =>{
    if (!bancoQuestao.id || bancoQuestao.id.trim() === "") {
      return;
    }
    var carregandoRef = carregando
    carregandoRef.fire()
    recuperarPorId(bancoQuestao.id)
      .then(response => {
        setBancoQuestao(response.data as BancoQuestao)
        carregandoRef.close()
      }).catch(error => {
        erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados !').fire()
      })
  }

  isNovo = (!bancoQuestao.id || bancoQuestao.id.trim() === "")

  const incluir = async (bancoQuestao: BancoQuestao) => {
    carregando.fire()
    await incluirBancoQuestao(bancoQuestao).then(response => {
      carregando.close()
      toastrSucessoBuilder.build('opera????o realizada com sucesso!').fire()
      return true;
    }).catch(error => {
      carregando.close()
      erroGenericoBuilder.buildStr('Ocorreu um problema ao incluir !').fire()
      return false;
    })
  }

  const alterar = (bancoQuestao: BancoQuestao) => {
    carregando.fire()

    alterarBancoQuestao(bancoQuestao).then(response => {
      carregando.close()
      toastrSucessoBuilder.build('opera????o realizada com sucesso!').fire()
      return true;
    }).catch(error => {
      carregando.close()
      erroGenericoBuilder.buildStr('Ocorreu um problema ao alterar !').fire()
      return false;
    });
  }

  const handleCalcel = () => {
    navegacao("/banco-questoes");
  }

  

  async function handleSubmit() {
    var errosValidacao: string[] = validarBancoQuestao(bancoQuestao)
    if (errosValidacao.length > 0) {
      erroGenericoBuilder.build(errosValidacao).fire()
      return;
    }

    bancoQuestao.questoes = questoes;
    setBancoQuestao(bancoQuestao);
    
    if (isNovo) {
      incluir(bancoQuestao);
      navegacao("/banco-questoes");
    } else {
      alterar(bancoQuestao);
      navegacao("/banco-questoes");
    }

  }

  var handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {

    const { name, value } = e.target
    setBancoQuestao({ ...bancoQuestao, [name]: value })

  }

  return (
    <>
      <HeaderPagina titulo={isNovo ? "Novo Banco de Quest??es" : "Informa????es do Banco de Quest??es"} />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="form">
              <h4 className="title-form">Novo Banco de Quest??es</h4>
              <div className="banco-questoes-form">
                <form>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="tituloTrilha">Nome</label>
                      <input type="text"
                        onChange={handleInputChange}
                        name="nomeBanco"
                        className="form-control"
                        id="nomeBanco"
                        placeholder="Nome do banco..."
                        value={bancoQuestao ? bancoQuestao.nomeBanco : ""}
                      />
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor="tituloTrilha">Mat??ria</label>
                      <MateriaSeletor name="idMateria" handlePesquisaSelector={handleInputChange} idSelecionar={bancoQuestao && bancoQuestao.idMateria ? bancoQuestao.idMateria : "99"} />
                    </div>
                  </div>

                  <div className="botoes-form-div justify-content-end">
                    <button type="submit" className="btn btn-danger" onClick={handleCalcel}>Cancelar <i className="bi bi-x"></i></button>
                    <button  type="submit" className="btn btn-cor-5 btn-salvar" onClick={handleSubmit}>Salvar</button>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
          
            <div className="header-questoes">
              <h3><b>Quest??es</b></h3>
              <button className="btn btn-primary btn-new-task" onClick={hanlderNovaQuestao}>Nova Quest??o</button>
            </div>
          
          <div className="col-md-6">
            <div className="todo-list">
              {questoes.map((quest: Questao, key: number) => {
                return <CardQuestao  handleModal = {handleModal} quest={quest} key={key} excluir={handleExcluir}/>
              })}
            </div>
            
          </div>

          
          <Modal isOpen={modal} toggle={toggle} size="xl">
            <ModalHeader toggle={toggle}>Nova Quest??o</ModalHeader>
            <ModalBody>
              <form action="">
                <div className="row">
                  <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor=""><b>Enunciado:</b></label>
                        <textarea  name="enunciado"
                        className="form-control text-area mb-3"
                        onChange={handleChange}
                        id="enunciado"
                        placeholder="Enunciado..."
                        value={questao ? questao.enunciado : ""}  />
                      </div>
                      <div className="form-group">
                        <label htmlFor=""><b>Explica????o:</b></label>
                        <textarea  name="explicacao"
                        className="form-control text-area mb-3"
                        onChange={handleChange}
                        id="explicacao"
                        placeholder="Explica????o..."
                        value={questao ? questao.explicacao : ""}  />
                      </div>
                    
                  </div>
                  <div className="container">
                    <h4 className="centraliza"> <b> Alternativas </b></h4>
                    <div className="row">
                      <div className="col-md-12 centraliza">
                        <div className="form-group col-md-5 alternativa">
                            <label htmlFor="" ><b>I:</b></label>
                            <textarea id="quest1" name="quest1"
                            className="form-control  text-area"
                            onChange={handleTextoAlternativa}
                            value={questao ? questao.alternativas[0] : ""}  />

                            <div className="todo-input">
                              
                                <input type="radio" 
                                name='respostaCorreta' 
                                id = "quest1"
                                value="alt0" 
                                checked={questao.respostaCorreta===0}  
                                onChange={handleChangeAlternativa} 
                                />
                            </div>

                          </div>
                          <div className="form-group col-md-5  alternativa">
                            <label htmlFor="" ><b>II:</b></label>
                            <textarea id="quest2" name="quest2"
                            className="form-control text-area"
                            onChange={handleTextoAlternativa}
                            value={questao ? questao.alternativas[1] : ""}  />

                            <div className="alternativa">
                                <input type="radio" 
                                name='respostaCorreta' 
                                id = "quest2"
                                value="alt1" 
                                onChange={handleChangeAlternativa} 
                                checked={questao.respostaCorreta===1} 
                                />
                            </div>

                          </div>
                      </div>
                    </div>
                      
                    <div className="row" >
                      <div className="col-md-12 centraliza">
                        <div className="form-group col-md-5 alternativa">
                          <label htmlFor="" ><b>III:</b></label>
                          <textarea id="quest3" name="quest3"
                          className="form-control text-area"
                          onChange={handleTextoAlternativa}
                          value={questao ? questao.alternativas[2] : ""}  />

                          <div className="todo-input">
                              <input type="radio" 
                                    name='respostaCorreta' 
                                    id = "quest3" 
                                    value="alt2"
                                    checked={questao.respostaCorreta===2}
                                    onChange={handleChangeAlternativa} 
                                    />
                          </div>

                        </div>
                        
                        <div className="form-group col-md-5 alternativa">
                          <label htmlFor="" ><b>IV:</b></label>
                          <textarea id="quest4" name="quest4"
                          className="form-control text-area"
                          onChange={handleTextoAlternativa}
                          value={questao ? questao.alternativas[3] : ""}  />

                          <div className="todo-input">
                              <input type="radio" 
                                      name='respostaCorreta' 
                                      id = "quest4"
                                      value="alt3" 
                                      checked={questao.respostaCorreta===3}
                                      onChange={handleChangeAlternativa} 
                                      />
                          </div>

                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={addTask} type="button" id="button-addon2">Salvar</Button>{' '}
              <Button color="secondary" type="button" onClick={closeModal}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default BancoQuestoesForm;