import '../style.css'
import { AtividadeAluno } from '../../../types/atividade'
import { CardAtividadeAluno, CardAtividadeLigacao } from "../../CardAtividade";

declare interface Props {
    atividadesParam: AtividadeAluno[]
}

var AtividadesListagemAluno = function ({ atividadesParam }: Props) {

    var atividades: AtividadeAluno[] = (!atividadesParam || atividadesParam === undefined) ? [] : atividadesParam
    console.log('AtividadesListagemAluno: ', atividades)

    return (
        <>
            <div className="container-atividades aluno">
                {
                    AtividadesListagemContainerInterno(atividades)
                }
            </div>
        </>
    )
}

function AtividadesListagemContainerInterno(atividades: AtividadeAluno[]) {

    if (atividades.length > 0) {
        return (
            <>
                {
                    atividades.map((atv, i) => {
                        if (i < atividades.length - 1) {
                            return (
                                <>
                                    <CardAtividadeAluno key={atv.id} atividade={atv} />
                                    <CardAtividadeLigacao key={atv.id + "ligac"} />
                                </>
                            )
                        }
                        return (
                            <CardAtividadeAluno key={atv.id} atividade={atv} />
                        )
                    })
                }
            </>
        )
    } else {
        return (
            <h4>Essa trilha não tem nenhuma atividade no momento</h4>
        )
    }
}

export { AtividadesListagemAluno }