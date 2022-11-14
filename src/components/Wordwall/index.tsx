import { useState, useEffect } from "react"
import { Atividade } from '../../types/atividade';
import { getById, concluirJogo } from '../../services/Atividade.service';
import { carregando, erroGenericoBuilder, toastrSucessoBuilder } from "../Alerts/index";
import { useAutenticacaoContext } from "../../context/AutenticacaoContext";
import { useNavigate, useParams } from "react-router-dom";

declare interface Props {
    idAtividade: string
}


function WordWall({ idAtividade }: Props) {

    var autenticador = useAutenticacaoContext();
    var navegacao = useNavigate();

    const [atividade, setAtividade] = useState<Atividade>({
        id: "",
        titulo: "",
        idTrilha: "",
        idTrilhaAtividade: "",
        idBancoQuestao: "",
        tipoAtividade: "",
        contudoTexto: "",
        iframe: "",
        concluida: "",
        quantConcluido: 0

    });

    const handleFinalizar = () => {
        carregando.fire();
        concluirJogo(idAtividade, autenticador.usuario.idUsuario)
            .then(response => {
                carregando.close();
                navegacao("/trilhas")
                toastrSucessoBuilder.build('sucesso!').fire()

            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema ao concluir a atividade!').fire()
            })
        
    }

    useEffect(() => {
        getById(idAtividade).then((response) => {
            setAtividade(response.data as Atividade)

        }).catch((erro) => {
            console.log(erro)
            erroGenericoBuilder.buildStr('Ocorreu um erro ao recuperar os dados!')
        })

    }, []);

    return (
        <div className="wordwall">
            <div  dangerouslySetInnerHTML={{ __html: atividade.iframe }} />
            <div>
                <button className="button btn submit btn-danger" type="button" onClick={handleFinalizar}> 
                    Finalizar
                </button>
            </div>
        </div>
    );

}

export default WordWall