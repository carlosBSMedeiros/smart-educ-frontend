import { useState, useEffect } from "react"
import { Atividade } from '../../../../types/atividade';
import { getById, concluirJogo } from '../../../../services/Atividade.service';
import { carregando, erroGenericoBuilder, toastrSucessoBuilder } from "../../../Alerts/index";
import { useAutenticacaoContext } from "../../../../context/AutenticacaoContext";
import { ConcluirAtividadeButton, ConcluirAtividadeStyled } from "../../styledComponentes";

declare interface Props {
    idAtividade: string,
    funcaoFinalizarJogo: Function
}

function WordWall({ idAtividade, funcaoFinalizarJogo }: Props) {

    var autenticador = useAutenticacaoContext();

    const [atividade, setAtividade] = useState<Atividade>({
        id: "",
        titulo: "",
        idTrilha: "",
        idTrilhaAtividade: "",
        idBancoQuestao: "",
        enunciado:"",
        tipoAtividade: "",
        contudoTexto: "",
        iframe: "",
        concluida: "",
        ordem:0,
        quantConcluido: 0

    });

    const handleFinalizar = () => {
        carregando.fire();
        concluirJogo(idAtividade, autenticador.usuario.idUsuario)
            .then(response => {
                carregando.close();
                toastrSucessoBuilder.build('Jogo concluído com sucesso!').fire()
                funcaoFinalizarJogo();
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
            <ConcluirAtividadeStyled>
                <ConcluirAtividadeButton onClick={handleFinalizar}>
                    Concluir Atividade
                </ConcluirAtividadeButton>
            </ConcluirAtividadeStyled>
        </div>
    );

}

export default WordWall