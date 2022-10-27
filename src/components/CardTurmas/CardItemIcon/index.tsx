import { Link } from "react-router-dom";
import './style.css';

declare interface CardProps {
  title: string;
  icon: string;
  inline?: boolean;
  linkTo?: string;
}

function CardItemIcon(props: CardProps) {
  return (
    <Link to={"/" + props.linkTo}>
      <div className={`card card-plus ${(props.inline ? 'card-inline' : '')}`}>
        <p className='card-title'>{props.title}</p>
        <i className={`bi bi-${props.icon}`}></i>
      </div>
    </Link>
  );
}

export default CardItemIcon;