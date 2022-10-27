import { Link } from "react-router-dom";
import cardItemImage from "../../../assets/icone-livro.svg";
import { BancoQuestao } from '../../../types/bancoQuestao';

declare interface Props {
  bancoQuestao : BancoQuestao;
}

function CardItem({ bancoQuestao }: Props){
  return (
    <Link to={{ pathname: `/banco-questoes/${bancoQuestao.id}`, }}>
      <div className="card card-item">
        <p className="card-title">{bancoQuestao.nomeBanco}</p>
        <div className="card-item-img">
          <img src={cardItemImage} alt="Icone de Banco de Questões" />
        </div>
        <span className="card-subtitle">{bancoQuestao.materia}</span>
      </div>
    </Link>
  );
}

export default CardItem;