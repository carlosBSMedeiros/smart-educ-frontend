import HeaderPagina from "../../../components/HeaderPagina";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import CardItemIcon from "../../../components/CardQuestoes/CardItemIcon";
import { useAutenticacaoContext } from "../../../context/AutenticacaoContext";
import MateriaSeletor from "../../../public/components/MateriaSeletor";
import { incluirBancoQuestao, recuperarPorId, validarBancoQuestao, alterarBancoQuestao } from "../../../services/BancoQuestao.service";
import './style.css';
import { carregando, erroGenericoBuilder, toastrSucessoBuilder } from "../../../components/Alerts";
import { BancoQuestao } from "../../../types/bancoQuestao";

declare interface Props {
  isNovo: boolean;
}

function BancoQuestoesForm({ isNovo }: Props) {

  useEffect(() => {

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
  }, [])

  var autenticador = useAutenticacaoContext();
  var navegacao = useNavigate();
  let { id } = useParams();

  const [bancoQuestao, setBancoQuestao] = useState<BancoQuestao>({
      id: id ? id : "",
      idMateria: "",
      idProfessor: autenticador.usuario.idUsuario,
      nomeBanco:"",
      questoes:[],
      materia:""
  })

  isNovo = (!bancoQuestao.id || bancoQuestao.id.trim() === "")

  const incluir = async (bancoQuestao : BancoQuestao) => {
    carregando.fire() 
    await incluirBancoQuestao(bancoQuestao).then(response => {
      carregando.close()
        toastrSucessoBuilder.build('operação realizada com sucesso!').fire()
        return true;
    }).catch(error => {
      carregando.close()
        erroGenericoBuilder.buildStr('Ocorreu um problema ao incluir !').fire()
        return false;
    })
  }

  const alterar = (bancoQuestao : BancoQuestao) => {
      carregando.fire() 

      alterarBancoQuestao(bancoQuestao).then(response => {
      carregando.close()
      toastrSucessoBuilder.build('operação realizada com sucesso!').fire()
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

    if(isNovo){ 
      incluir(bancoQuestao);
      navegacao("/banco-questoes");
    } else {
      alterar(bancoQuestao);
      navegacao("/banco-questoes");
    }
    
  }

  var handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {

    const { name, value } = e.target
    setBancoQuestao({...bancoQuestao, [name]: value})
    
  }


  return (
    <>
      <HeaderPagina titulo={isNovo ? "Novo Banco de Questões" : "Informações do Banco de Questões"} />
      <div className="container">
        <div className="row">
          <div className="col-md-6 border-right">
            <div className="form">
              <h4 className="title-form">Novo Banco de Questões</h4>
              <div className="banco-questoes-form">
                <form>
                <div className="form-group col-md-12">
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

                  <div className="form-group col-md-6">
                    <label htmlFor="tituloTrilha">Matéria</label>
                        <MateriaSeletor name="idMateria" handlePesquisaSelector={handleInputChange} idSelecionar={bancoQuestao && bancoQuestao.idMateria ? bancoQuestao.idMateria : "99"} />
                  </div>
                  <div className="botoes-form-div inc">
                    <button className="btn btn-cor-5" onClick={handleSubmit}>Salvar</button>
                    <button type="submit" className="btn btn-primary" onClick={handleCalcel}>Cancelar <i className="bi bi-x"></i></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form">
              <h4 className="title-form">Questões</h4>
              <div className="content-cards">
                <CardItemIcon title="Nova Questão" icon="plus-circle" inline linkTo="questoes/novo"></CardItemIcon>

                <CardItemIcon title="Questão 1" icon="three-dots" inline></CardItemIcon>
                <CardItemIcon title="Questão 2" icon="three-dots" inline></CardItemIcon>
                <CardItemIcon title="Questão 3" icon="three-dots" inline></CardItemIcon>
                <CardItemIcon title="Questão 4" icon="three-dots" inline></CardItemIcon>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BancoQuestoesForm;