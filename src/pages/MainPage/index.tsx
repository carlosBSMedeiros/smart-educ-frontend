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
import OrquestradorMaterias from "../MateriasPage/OrquestradorMaterias"
import OrquestradorTurmas from "../TurmasPage/OrquestradorTurmas"
import AlunoTurmasPage from "../AlunoTurmaPage"

function MainPage() {
    return (
        <>
            <Navbar />
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
                <Route path="/materias" element={<MateriasPage />}/>
                <Route path="/materias/novo" element={<OrquestradorMaterias isNovo={true}/>}/>
                <Route path="/materias/:id" element={<OrquestradorMaterias isNovo={false} />}/>
                <Route path="/banco-questoes" element={<QuestoesPage />}/>
                <Route path="/banco-questoes/novo" element={<OrquestradorBancoQuestoes isNovo={true} />}/>
                <Route path="/banco-questoes/:id" element={<OrquestradorBancoQuestoes isNovo={false} />}/>


                <Route path="/alunoTurma" element={<AlunoTurmaPage/>}/>

            </Routes>
        </>
    )
}

export default MainPage
