import { Route, Routes, Navigate } from "react-router-dom"
import Navbar from '../../components/Navbar'
import HomePage from '../HomePage'
import MateriasPage from "../MateriasPage"
import TrilhasPage from "../TrilhasPage"
import TurmasPage from "../TurmasPage"
import AlunoTurmaPage from "../AlunoTurmaPage"
import OrquestradorTrilhas from "../TrilhasPage/OrquestradorTrilhas"
import QuestoesPage from "../QuestoesPage"
import OrquestradorBancoQuestoes from "../QuestoesPage/OrquestradorBancoQuestoes"
import OrquestradorAtividade from "../AtividadePage/OrquestradorAtividade"
import OrquestradorMaterias from "../MateriasPage/OrquestradorMaterias"
import OrquestradorTurmas from "../TurmasPage/OrquestradorTurmas"
import NavbarLateralMobile, { DivMascaraMenuLateral } from "../../components/Navbar/NavbarLateralMobile"
import { MenuLateralProvider } from "../../context/MenuLateralContext"
import RankingTurmaPage from "../RankingTurmaPage"
import QuestionarioPage from "../QuestionarioPage"
import Rodape from "../../components/Rodape"
import styled from "styled-components"

const MenuPaiStyled = styled.div`
    position: relative;
    display:flex;
    align-items: stretch;
` 
const MainStyled = styled.main`
    margin-top: 2rem;
    margin-bottom: 3rem
`

function MainPage() {
    return (
        <>
            <MenuLateralProvider>
                <Navbar/>
                <MenuPaiStyled>
                    <NavbarLateralMobile/>
                </MenuPaiStyled>
                <DivMascaraMenuLateral/>
            </MenuLateralProvider>

            <MainStyled>
                <Routes>
                    <Route path="/" element={<Navigate to={"/home"}/>}/>
                    <Route path="/*" element={<><h1>Página não encontrada</h1></>}/>
                    <Route path="/home" element={<HomePage />}/>
                    <Route path="/turmas" element={<TurmasPage />}/>
                    <Route path="/turma/novo" element={<OrquestradorTurmas isNovo={true}/>}/>
                    <Route path="/turma/:id" element={<OrquestradorTurmas isNovo={false} />}/>
                    <Route path="/trilhas" element={<TrilhasPage />}/>
                    <Route path="/trilhas/novo" element={<OrquestradorTrilhas isNovo={true} />}/>
                    <Route path="/trilhas/:id" element={<OrquestradorTrilhas isNovo={false} />}/>

                    <Route path="/atividade/novo/:idTrilha" element={<OrquestradorAtividade isNovo={true} />}/>
                    <Route path="/atividade/:id" element={<OrquestradorAtividade isNovo={false} />}/>
                    

                    <Route path="/materias" element={<MateriasPage />}/>
                    <Route path="/materias/novo" element={<OrquestradorMaterias isNovo={true}/>}/>
                    <Route path="/materias/:id" element={<OrquestradorMaterias isNovo={false} />}/>
                    <Route path="/banco-questoes" element={<QuestoesPage />}/>
                    <Route path="/banco-questoes/novo" element={<OrquestradorBancoQuestoes isNovo={true} />}/>
                    <Route path="/banco-questoes/:id" element={<OrquestradorBancoQuestoes isNovo={false} />}/>

                    <Route path="/alunoTurma" element={<AlunoTurmaPage/>}/>
                    <Route path="/alunoTurma/ranking/:id" element={<RankingTurmaPage/>}/>

                </Routes>
            </MainStyled>
            {/* <Rodape/> */}
        </>
    )
}

export default MainPage