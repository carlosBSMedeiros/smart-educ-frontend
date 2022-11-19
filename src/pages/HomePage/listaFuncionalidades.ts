import TurmasIcon from '../../assets/icone-turmas.png';
import MateriasIcon from '../../assets/icone-materias.png';
import TrilhasIcon from '../../assets/icone-trilhas.png';
import QuestoesIcon from '../../assets/icone-questoes.png';
import RankingIcon from '../../assets/icone-ranking.png';

interface funcionalidadeInfos {
    label: string
    rota: string
    icone: string
}

var funcTurmas: funcionalidadeInfos = {
    label: "Turmas",
    rota: "turmas",
    icone: TurmasIcon
}

var funcMaterias: funcionalidadeInfos = {
    label: "Matérias",
    rota: "materias",
    icone: MateriasIcon
}

var funcTrilhas: funcionalidadeInfos = {
    label: "Trilhas",
    rota: "trilhas",
    icone: TrilhasIcon
}

var funcQuestoes: funcionalidadeInfos = {
    label: "Questões",
    rota: "banco-questoes",
    icone: QuestoesIcon
}

var funcAlunoTurma: funcionalidadeInfos = {
    label: "Turmas",
    rota: "alunoTurma",
    icone: TurmasIcon
}

var funcionalidadesProf: funcionalidadeInfos[] = []
var funcionalidadesAluno: funcionalidadeInfos[] = []

funcionalidadesProf.push(funcTurmas)
funcionalidadesProf.push(funcMaterias)
funcionalidadesProf.push(funcTrilhas)
funcionalidadesProf.push(funcQuestoes)

funcionalidadesAluno.push(funcAlunoTurma)
funcionalidadesAluno.push(funcTrilhas)

export function listaFuncionalidades(tipoUsuario: string) {
    if (tipoUsuario.toLowerCase() === 'aluno') {
        return funcionalidadesAluno;
    } else {
        return funcionalidadesProf;
    }
}