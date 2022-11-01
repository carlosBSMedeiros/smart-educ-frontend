import { Link } from "react-router-dom"
import { AlunoTurma } from "../../types/AlunoTurma"

declare interface Props {
    alunoTurma:  AlunoTurma
}

function CardAlunoTurma({ alunoTurma }: Props) {

    return (
        <div className="col-md-4 d-flex justify-content-center">
            <Link to={{ pathname: `/alunoTurma/ranking/${alunoTurma.idTurma}`, }}>
                <div className="card">
                    <div className="cardHeader">
                        {alunoTurma.codigoTurma}
                    </div>
                    <div className="cardBody">
                        <b>Escola:</b> {alunoTurma.escola}
                        <br/>
                        <b>Disciplina:</b> {alunoTurma.disciplina}
                        <br/>
                        <b>Professor:</b> {alunoTurma.professor}
                    </div>
                </div>
            </Link>
        </div>
    )
}


export default CardAlunoTurma;
