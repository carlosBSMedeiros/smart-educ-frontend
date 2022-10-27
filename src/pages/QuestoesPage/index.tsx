import HeaderPagina from "../../components/HeaderPagina";
import CardItemIcon from "../../components/CardQuestoes/CardItemIcon";
import CardItem from "../../components/CardQuestoes/CardItem";
import {useState, useEffect} from "react"
import { recuperarBancoQuestaosIdProfessor } from "../../services/BancoQuestao.service"
import { erroGenericoBuilder,carregando } from "../../components/Alerts"
import { useAutenticacaoContext } from "../../context/AutenticacaoContext"
import { BancoQuestao } from '../../types/bancoQuestao';

function QuestoesPage(){

  var autenticador = useAutenticacaoContext();
  const [bancoQuestaos, setBancoQuestaos] = useState<BancoQuestao[]>([]);

    useEffect(() => {
        var carregandoObj = carregando;
        carregandoObj.fire();
        recuperarBancoQuestaosIdProfessor(autenticador.usuario.idUsuario)
            .then(response => {
              setBancoQuestaos(response.data as BancoQuestao[])
              carregandoObj.close()
            }).catch(error => {
                erroGenericoBuilder.buildStr('Ocorreu um problema para recuperar os dados!').fire()
            })

    }, [])


  return (
    <div>
      <HeaderPagina titulo={"Questões"}/>
      <div className="container">
        <div className="d-flex justify-content-center m-b-5 mt-3">
            <CardItemIcon title="Novo Item" icon="plus-circle" linkTo="banco-questoes/novo"></CardItemIcon>
        </div>

        <div className="d-flex flex-wrap justify-content-around gap-3 mt-5 mb-5">
        
        {
          bancoQuestaos.map(e => {
            return <CardItem key={e.id} bancoQuestao={e}/>
        })
        }
        </div>

      </div>
    </div>
  );
}

export default QuestoesPage;