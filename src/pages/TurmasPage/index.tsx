import HeaderPagina from "../../components/HeaderPagina";
import CardItemIcon from "../../components/CardTurmas/CardItemIcon";
import CardItem from "../../components/CardTurmas/CardItem";
import {useState, useEffect} from "react"
import { recuperaTurmasIdProfessor } from "../../services/Turma.service"
import { erroGenericoBuilder,carregando } from "../../components/Alerts"
import { useAutenticacaoContext } from "../../context/AutenticacaoContext"
import { Turma } from '../../types/turma';

function QuestoesPage(){

  var autenticador = useAutenticacaoContext();

    const [turmas, setTurmas] = useState<Turma[]>([]);

    useEffect(() => {
        var carregandoObj = carregando;
        carregandoObj.fire();
        recuperaTurmasIdProfessor(autenticador.usuario.idUsuario)
            .then(response => {
              setTurmas(response.data as Turma[])
              carregandoObj.close()
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados!').fire()
            })
    }, [])


  return (
    <div>
      <HeaderPagina titulo={"Turmas"}/>
      <div className="container">
        <div className="d-flex justify-content-center m-b-5 mt-3">
            <CardItemIcon title="Novo Item" icon="plus-circle" linkTo="turma/novo"></CardItemIcon>
        </div>

        <div className="d-flex flex-wrap justify-content-around gap-3 mt-5 mb-5">
        
        {
          turmas.map(e => {
            return <CardItem key={e.id} turma={e}/>
        })
        }
        </div>

      </div>
    </div>
  );
}

export default QuestoesPage;