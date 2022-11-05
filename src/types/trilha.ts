import {AtividadeAluno} from './atividade'

export type TrilhaRequest={
    id:string
    titulo:string,
    descricao:string,
    ordem:number | null,
    idMateria:string,
    idProfessor:string,
    concluida:boolean,
    nomeMateria:string,
    quantAtividades:number,
    quantConcluido:number
}

export type TrilhaAlunoRequest={
    id:string,
    titulo:string,
    descricao:string,
    nomeMateria:string,
    quantAtividade:number,
    quantConcluido:number,
    concluida:boolean,
    atividadesTrilhaDTOs:AtividadeAluno[]
}