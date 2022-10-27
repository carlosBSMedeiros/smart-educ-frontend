import { Link } from "react-router-dom";
import { Turma } from "../../../types/turma";
declare interface Props {
  turma : Turma;
}

  function CardItem({ turma }: Props){


  return (
    <Link to={{ pathname: `/turma/${turma.id}`, }}>
      <div className="card card-item">
        <p className="card-title">{turma.codigo} - <span>{turma.serie}</span></p>
      </div>
    </Link>
  );
}

export default CardItem;