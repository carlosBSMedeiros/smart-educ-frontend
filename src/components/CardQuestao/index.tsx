
import { Questao } from '../../types/Questao';
import './style.css';


interface Props{
  quest: Questao,
  handleModal: (e: Questao) => void,
  excluir: (e: Questao) => void
}

function CardQuestao({quest, handleModal, excluir}: Props){

  const handler = () => {
    handleModal(quest);
  }

  const handlerExc = () => {
    excluir(quest);
  }

  return (
    <div className="todo-content">
      <div className="todo-body" >{quest.enunciado}</div>
      <button className="btn"  onClick={handler}><i className="bi bi-pencil"></i></button>
      <button className="btn"  onClick={handlerExc}><i className="bi bi-trash"></i></button>
    </div>
  )
}

export default CardQuestao;