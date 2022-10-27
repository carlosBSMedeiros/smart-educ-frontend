
export interface Credenciais {
    usuario: string
    senha: string
}

export const credenciasiMoch:Credenciais ={
    usuario: '',
    senha: ''
}

export interface Usuario {
    nome: string,
    email: string,
    jwttoken: Token,
    autenticado: Boolean,
    tipoUsuario: string,
    nomeEscola:string,
    idUsuario:string,
    disciplinaProfessor : string,
    idDisciplinaProfessor : number,
    idEscola : string

}

export type Token = string