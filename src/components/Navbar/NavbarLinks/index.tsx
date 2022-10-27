import { Link, useLocation } from "react-router-dom";

function NavbarLinks() {
    let location = useLocation();

    function retornarItemselecinado(rota:string){
        return rota === location.pathname ? 'active' : ''
    }

    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link to={"/home"}>
                    <span className={`nav-link ${retornarItemselecinado("/home")}`} aria-current="page">Home</span>
                </Link>
            </li>
        </ul>
    )
}

export default NavbarLinks;