import { AtividadeAluno } from "../types/atividade";

function ordenarAtividades(atividades: any) {
  atividades.sort(compareFnRaw)
}

function compareFnRaw(a: AtividadeAluno, b: AtividadeAluno) {
  if (a.ordem < b.ordem) {
    return -1;
  }
  if (a.ordem > b.ordem) {
    return 1;
  }
  return 0;
}


export { ordenarAtividades }