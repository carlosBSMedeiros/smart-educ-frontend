export type TrilhaRequest={
    id:string
    titulo:string,
    descricao:string,
    ordem:number | null,
    idMateria:string,
    idProfessor:string,
    concluida:boolean,
    nomeMateria:string,
    quantAtividades:number
}