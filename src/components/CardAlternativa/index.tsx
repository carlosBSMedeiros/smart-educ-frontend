

import './style.css';


interface Props {
  check:string,
  idQuestao:number,
  numero:number,
  alternativa: string,
  handler: (questao:number,resp:number) => void,
}

function CardAlternativa({ alternativa, numero, check, idQuestao, handler }: Props) {
  const handlerChange = () => {
    handler(idQuestao, numero);
  }

  return (
    <div className="row col-md-12 todo-block field">
      <div className="todo-input todo-inline">
        <input  className=''  
        type="radio" 
        name={`${idQuestao}`}  
        checked={check===`resposta${numero}-${idQuestao}`}
        onChange={handlerChange}/>
      </div>
      <label className='todo-inline' htmlFor="">{alternativa}</label>

    </div>
  )
}

export default CardAlternativa;