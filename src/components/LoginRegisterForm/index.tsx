import { useNavigate } from 'react-router-dom'
import { succesLoginAlert, errorLoginAlert } from '../../components/Alerts/index'
import './style.css'
import { Credenciais, credenciasiMoch } from '../../types/usuario'
import { useAutenticacaoContext } from '../../context/AutenticacaoContext'
import { useState } from 'react'

function LoginRegisterForm() {
    var navegacao = useNavigate();
    var autenticador = useAutenticacaoContext();

    const [credenciais, setCredenciais] = useState<Credenciais>(credenciasiMoch);

    const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        autenticador.login(credenciais, succesLogin, failLogin);
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> ) =>{
        const {name,value} = event.target;
        setCredenciais({...credenciais, [name]:value})
    }

    var succesLogin = () => {
        succesLoginAlert.fire()
        navegacao("/home", { replace: true })
    }

    var failLogin = function (msgErro: string) {
        errorLoginAlert.fire({
            title: 'Erro no Login',
            text: msgErro
        })
    }
    return (
        <div className='div-formulario-login-reg'>
            <div className='titulo-form-login'>
                <h3>Entrar</h3>
            </div>
            <form className='formulario-login' onSubmit={handleSubmitLogin}>
                <label className="formulario-login-label">Email</label>
                <input type="email" className="form-control" id="usuario" name="usuario" onChange={handleInputChange} />
                <label className="formulario-login-label">Senha</label>
                <input type="password" className="form-control" id="senha" name="senha" onChange={handleInputChange}/>
                <button type="submit" className="btn btn-primary col-5 mt-3">login</button>
            </form>
        </div>
    )
}

export default LoginRegisterForm