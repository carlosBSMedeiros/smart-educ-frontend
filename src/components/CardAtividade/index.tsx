import './style.css'
import { Atividade } from '../../types/atividade'
import { TipoAtividade } from '../../types/atividade'
import { getTipoAtividadeCompleto } from '../../utils/tiposAtividades'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from 'react';
import AtividadeForm from "../Atividade"
import { AtividadeAluno } from '../../types/TrilhaAlunoRequestNew'
import { toastrErroBuilder, toastrSucessoBuilder } from '../Alerts';
import png from '../../assets/medalha.png'
import Ranking from '../Ranking';
import styled from 'styled-components';

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

    const [modalAtividadeOpen, setModalAtividadeOpen] = useState<boolean>(false)
    const [modalRankingOpen, setModalRankingOpen] = useState<boolean>(false)

    var tipoAtv: TipoAtividade = getTipoAtividadeCompleto(atividade.tipoAtividade)

    function ativConcluidaOuNao(concluida:boolean){
        if(concluida){
            return(
                <div>
                    <b className='label-ativ-conc'>Concluída!</b> 
                </div>
            )
        }
        return(
            <b className='label-ativ-nao-conc'>Não Concluída</b> 
        )
    }

    function toggleModalAtividade() {
        setModalAtividadeOpen(!modalAtividadeOpen)
    }

    function toggleModalRanking() {
        setModalRankingOpen(!modalRankingOpen)
    }

    function ModalAtividadeAluno(){
        return (
            <Modal isOpen={modalAtividadeOpen} toggle={toggleModalAtividade} size="xl">
                <ModalHeader toggle={toggleModalAtividade}>{tipoAtv.nome}</ModalHeader>
                <ModalBody>
                    <AtividadeForm atividade={atividade} fecharModalAtualizarListaAtividades={fecharModalAtualizarListaAtividades}></AtividadeForm>
                </ModalBody>
            </Modal>
        )
    }

    function ModalRankingAtividade(){

        const RankingPaiStyled = styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 1rem;
        `
 
        return (
            <Modal isOpen={modalRankingOpen} toggle={toggleModalRanking} size="md">
                <ModalHeader toggle={toggleModalRanking}>
                    Ranking                  
                </ModalHeader>
                <ModalBody>
                    <RankingPaiStyled>
                        <Ranking id={atividade.id} tipo='atividade'/>
                    </RankingPaiStyled>
                </ModalBody>
            </Modal>
        )
    }
    
    var fecharModalAtualizarListaAtividades = function(){
        toggleModalAtividade();
        atualizarAtividades();
    }

    function verificarPermissaoExecucaoAtividade(){
        if(atividade.concluida){
            toggleModalRanking();
            return;
        }

        if(atividade.getAnterior || atividade.ordem === 1){
            toggleModalAtividade();
        } else{
            toastrErroBuilder.build("Você deve concluir a atividade anterior para realizar essa atividade!").fire();
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
                    {atividade.concluida ? (
                        <img src={png} alt="Voltar" onClick={toggleModalRanking} id="TooltipRanking" />
                    ) : (<></>)}
                </div>
            </div>
            <ModalAtividadeAluno></ModalAtividadeAluno>
            <ModalRankingAtividade></ModalRankingAtividade>
        </>
    )
}

function CardAtividadeProf(atividade:Atividade, tipoAtv:TipoAtividade){
    return (
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
    )
}

export function CardAtividadeLigacao() {
    return (
        <div className="card-atividade-ligacao"></div>
    )
}