import HeaderPagina from "../../components/HeaderPagina";
import CardItemIcon from "../../components/CardQuestoes/CardItemIcon";
import CardItem from "../../components/CardMaterias/CardItem";
import {useState, useEffect} from "react"
import { recuperarMateriasIdProfessor } from "../../services/Materia.service"
import { erroGenericoBuilder,carregando } from "../../components/Alerts"
import { useAutenticacaoContext } from "../../context/AutenticacaoContext"
import { Materia } from "../../types/materia";

function QuestoesPage(){

  var autenticador = useAutenticacaoContext();
    const [materias, setMaterias] = useState<Materia[]>([]);




    useEffect(() => {
        var carregandoObj = carregando;
        carregandoObj.fire();
        recuperarMateriasIdProfessor(autenticador.usuario.idUsuario)
            .then(response => {
              setMaterias(response.data as Materia[])
              carregandoObj.close()
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados!').fire()
            })

            

    }, [])


  return (
    <div>
      <HeaderPagina titulo={"Matérias"}/>
      <div className="container">
        <div className="d-flex justify-content-center m-b-5 mt-3">
            <CardItemIcon title="Novo Item" icon="plus-circle" linkTo="materias/novo"></CardItemIcon>
        </div>

        <div className="d-flex flex-wrap justify-content-around gap-3 mt-5 mb-5">
        
        {
          materias.map(e => {
            return <CardItem key={e.id} materia={e}/>
        })
        }
        </div>

      </div>
    </div>
  );
}

export default QuestoesPage;