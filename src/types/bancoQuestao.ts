import { Questao } from './Questao';
export type BancoQuestao={
    id:string
    nomeBanco:string,
    idMateria:string,
    idProfessor:string,
    questoes:Questao[],
    materia:string
}