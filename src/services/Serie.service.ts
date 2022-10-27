
import http from '../utils/requests';

export async function  ListAll(){
    return await http.get('/serie')
}

export async function getById(id:number){
    return await http.get(`/serie/${id}`)
}