
import { Questao } from '../../types/Questao';
import './style.css';


interface Props{
  quest: Questao,
  handleModal: (e: Questao) => void
}

function CardQuestao({quest, handleModal}: Props){

  const handler = () => {
    handleModal(quest);
  }

  return (
    <div className="todo-content">
      <div className="todo-body" >{quest.enunciado}</div>
      <button className="btn"  onClick={handler}><i className="bi bi-pencil"></i></button>
    </div>
  )
}

export default CardQuestao;