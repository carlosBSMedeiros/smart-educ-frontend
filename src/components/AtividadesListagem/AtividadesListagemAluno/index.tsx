import '../style.css'
import { CardAtividadeAluno, CardAtividadeLigacao } from "../../CardAtividade";
import { AtividadeAluno } from '../../../types/TrilhaAlunoRequestNew';

declare interface Props {
    atividadesParam: AtividadeAluno[],
    atualizarAtividades: Function
}

var AtividadesListagemAluno = function ({ atividadesParam, atualizarAtividades }: Props) {

    var atividades: AtividadeAluno[] = (!atividadesParam || atividadesParam === undefined) ? [] : atividadesParam
    console.log('AtividadesListagemAluno: ', atividades)

    return (
        <>
            <div className="container-atividades aluno">
                {
                    AtividadesListagemContainerInterno(atividades,atualizarAtividades)
                }
            </div>
        </>
    )
}

function AtividadesListagemContainerInterno(atividades: AtividadeAluno[], atualizarAtividades:Function) {

    if (atividades.length > 0) {
        return (
            <>
                {
                    atividades.map((atv, i) => {
                        if (i < atividades.length - 1) {
                            return (
                                <>
                                    <CardAtividadeAluno key={atv.id} atividade={atv} atualizarAtividades={atualizarAtividades}/>
                                    <CardAtividadeLigacao key={atv.id + "ligac"} />
                                </>
                            )
                        }
                        return (
                            <CardAtividadeAluno key={atv.id} atividade={atv} atualizarAtividades={atualizarAtividades} />
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