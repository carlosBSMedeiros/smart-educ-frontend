import LoginRegisterForm from '../../components/LoginRegisterForm'
import styled from 'styled-components'
import background from '../../assets/background_login.jpg'
import IconeChepeu from '../../assets/icone-chapeu.png'

const ContainerForm = styled.main`
    height: 100vh;
    display: grid;
    grid-template-columns:  3fr 1fr;
    background-color: var(--color-1);

    @media (max-width: 600px){
        grid-template-columns: 1fr;
    }
`

const DivEsquerda = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;

    div {
        color: #ffffff
    }

    @media (max-width: 600px){
        display: none;
    }
`

const DivInfosDireita = styled.div`
    display: flex;
    margin-right: 3rem;
    box-sizing: border-box;
    

    div{
        margin-right: 1rem;
    }

    img{
        width: 70px;
        height: 85px;
    }
`

const DivDireita = styled.div`
    height: 100vh;
    background-color: var(--color-5);
    display: flex;
    align-items: center;
    justify-content: center;
`

function LoginPage() {

    return (
        <ContainerForm>
            <DivEsquerda>
                <DivInfosDireita>
                    <div>
                        <h2>Smart Educ</h2>
                        <p>Jogue e conquiste conhecimento!</p>
                    </div>
                    <img src={IconeChepeu} />
                </DivInfosDireita>
            </DivEsquerda>
            <DivDireita>
                <LoginRegisterForm />
            </DivDireita>
        </ContainerForm>
    )

}

export default LoginPage