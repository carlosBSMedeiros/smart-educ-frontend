import HeaderPagina from "../../../components/HeaderPagina";
import './style.css';

declare interface Props {
  isNovo: boolean;
};

function QuestoesForm({ isNovo }: Props){
  return (
    <>
      <HeaderPagina titulo={isNovo ? "Nova Questão" : "Informações da Questão"} />
      <div className="container">
        <div className="row">
          <div className="col-md-6 border-right">
            <div className="form">
              <h4 className="title-form">Nome do Banco...<br /></h4>
              <div className="questoes-form">
                <form action="">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Questão Enunciado</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1"></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form">
              <h4 className="title-form">Alternativas</h4>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestoesForm;