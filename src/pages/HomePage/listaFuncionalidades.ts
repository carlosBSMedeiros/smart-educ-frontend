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
var funcRanking: funcionalidadeInfos = {
    label: "Ranking",
    rota: "ranking",
    icone: RankingIcon
}

var funcionalidadesProf: funcionalidadeInfos[] = []
var funcionalidadesAluno: funcionalidadeInfos[] = []

funcionalidadesProf.push(funcTurmas)
funcionalidadesProf.push(funcMaterias)
funcionalidadesProf.push(funcTrilhas)
funcionalidadesProf.push(funcQuestoes)
funcionalidadesProf.push(funcRanking)

funcionalidadesAluno.push(funcMaterias)
funcionalidadesAluno.push(funcTrilhas)
funcionalidadesAluno.push(funcRanking)

export function listaFuncionalidades(tipoUsuario: string) {
    if (tipoUsuario.toLowerCase() === 'aluno') {
        return funcionalidadesAluno;
    } else {
        return funcionalidadesProf;
    }
}