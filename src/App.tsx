import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import { AutenticacaoProvider, useAutenticacaoContext } from './context/AutenticacaoContext'

function App() {
  return (
    <BrowserRouter>
      <AutenticacaoProvider>
        <Routes>
          <Route path="/login" element={
          <VerificarUsuarioJaLogado>
            <LoginPage />
          </VerificarUsuarioJaLogado>
          } />
          <Route path="*" element={
            <RequerAutenticacao>
              <MainPage />
            </RequerAutenticacao>
          }>
          </Route>
        </Routes>
      </AutenticacaoProvider>
    </BrowserRouter>
  );
}

function VerificarUsuarioJaLogado({ children }: { children: JSX.Element }) {
  var autenticador = useAutenticacaoContext();
  let location = useLocation();
  if (autenticador.usuario.autenticado) {
    console.log("Usuario autenticado! Redirecionando...")
    return <Navigate to="/home" state={{ from: location }} replace />;
  }
  return children;
}

function RequerAutenticacao({ children }: { children: JSX.Element }) {
  var autenticador = useAutenticacaoContext();
  let location = useLocation();
  if (!autenticador.usuario.autenticado) {
    console.log("Usuario não autenticado! Redirecionando para pagina de login")
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default App;
