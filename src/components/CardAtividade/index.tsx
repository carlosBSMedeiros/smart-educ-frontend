import './style.css'
import { Atividade } from '../../types/atividade'
import { TipoAtividade } from '../../types/atividade'
import { getTipoAtividadeCompleto } from '../../utils/tiposAtividades'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from 'react';
import AtividadeForm from "../Atividade"
import { AtividadeAluno } from '../../types/TrilhaAlunoRequestNew'
import { Link } from "react-router-dom";
import { erroGenericoBuilder } from '../Alerts';

declare interface Props {
    atividade: Atividade
}

declare interface PropsAluno{
    atividade: AtividadeAluno,
    atualizarAtividades: Function
}

export function CardAtividade({ atividade }: Props) {
    return CardAtividadeProf(atividade,getTipoAtividadeCompleto(atividade.tipoAtividade))
}

export function CardAtividadeAluno({atividade, atualizarAtividades}:PropsAluno){

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    var tipoAtv: TipoAtividade = getTipoAtividadeCompleto(atividade.tipoAtividade)

    function ativConcluidaOuNao(concluida:boolean){
        if(concluida){
            return(
                <b className='label-ativ-conc'>Concluída!</b> 
            )
        }
        return(
            <b className='label-ativ-nao-conc'>Não Concluída</b> 
        )
    }

    function toggleModal() {
        setModalOpen(!modalOpen)
    }

    function ModalAtividadeAluno(){
        return (
            <Modal isOpen={modalOpen} toggle={toggleModal} size="xl">
                <ModalHeader toggle={toggleModal}>{tipoAtv.nome}</ModalHeader>
                <ModalBody>
                    <AtividadeForm atividade={atividade} fecharModalAtualizarListaAtividades={fecharModalAtualizarListaAtividades}></AtividadeForm>
                </ModalBody>
            </Modal>
        )
    }
    
    var fecharModalAtualizarListaAtividades = function(){
        toggleModal();
        atualizarAtividades();
    }

    function verificarPermissaoExecucaoAtividade(){
        if(atividade.getAnterior || atividade.ordem === 1){
            toggleModal();
        } else{
            erroGenericoBuilder.buildStr("Você deve concluir a atividade anterior para realizar essa atividade!").fire();
        }
    }

    return (
        <>
            <div className={`card-atividade aluno 
                ${atividade.concluida ? 'conc' : 'nao-conc'}
                ${atividade.ordem === 1 ? 'forcar-habilitada' : ''}` }   
                onClick={verificarPermissaoExecucaoAtividade}
            >
                <div className='card-atividade-desabilitada'>
                </div>
                <div className={`card-atividade-header ${atividade.tipoAtividade.toLowerCase()}`}>
                    {tipoAtv.nome}
                </div>
                <div className="card-atividade-body">
                    {atividade.titulo}
                    <br />
                    {ativConcluidaOuNao(atividade.concluida)}
                </div>
            </div>
            <ModalAtividadeAluno></ModalAtividadeAluno>
        </>
    )
}

function CardAtividadeProf(atividade:Atividade, tipoAtv:TipoAtividade){
    return (
        <Link to={{ pathname: `/atividade/${atividade.id}`, }}>
            <div className="card-atividade professor">
                <div className={`card-atividade-header ${atividade.tipoAtividade.toLowerCase()}`}>
                    {tipoAtv.nome}
                </div>
                <div className="card-atividade-body">
                    {atividade.titulo}
                    <br />
                    <b>Alunos que concluíram:</b> {atividade.quantConcluido}
                </div>
            </div>
        </Link>
    )
}

export function CardAtividadeLigacao() {
    return (
        <div className="card-atividade-ligacao"></div>
    )
}