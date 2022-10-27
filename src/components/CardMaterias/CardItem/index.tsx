import { Link } from "react-router-dom";
import { Materia } from '../../../types/materia';
declare interface Props {
  materia : Materia;
}

  function CardItem({ materia }: Props){


  return (
    <Link to={{ pathname: `/materias/${materia.id}`, }}>
      <div className="card card-item">
        <p className="card-title">{materia.nome} - <span>{materia.serie}</span></p>
        <p>{materia.descricao != null && materia.descricao !==''?materia.descricao.substring(0,40):''}...</p>
      </div>
    </Link>
  );
}

export default CardItem;