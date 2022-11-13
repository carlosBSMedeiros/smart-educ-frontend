import { AtividadeAluno } from "../types/atividade";
import { TrilhaAlunoRequest } from "../types/trilha";

function ordenarAtividades(trilhaAluno: TrilhaAlunoRequest){
    var atividades = trilhaAluno.atividadesTrilhaDTOs
    trilhaAluno.atividadesTrilhaDTOs = atividades.sort(compareFn)
    return trilhaAluno
}

function compareFn(a:AtividadeAluno, b:AtividadeAluno) {
    if (a.ordem < b.ordem) {
      return -1;
    }
    if (a.ordem > b.ordem) {
      return 1;
    }
    return 0;
  }

export {ordenarAtividades}