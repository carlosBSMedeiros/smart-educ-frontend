
import './style.css'
import Questionario from "../../components/Questionario";
import Wordwall from "../../components/Wordwall";


function QuestionarioPage() {

   

    return (
        <div className="App">
            {/* <Questionario idBancoQuestao='5f117704-4d3e-4fe1-9ddf-973676bef8cf' idAtividade='38cfbf78-4391-425b-a326-5e75edc3bf6b'></Questionario> */}
           
            <Wordwall idAtividade={"66f36196-42e9-4c24-bc08-0edd374ea6d6"}></Wordwall>
        </div>
    );
}

export default QuestionarioPage