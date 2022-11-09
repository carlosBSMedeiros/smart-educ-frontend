import React from 'react';
import { useNavigate } from 'react-router-dom';


interface MenuLateralContextType {
    alterarEstadoMenu: () => void;
    ativado:boolean
}

var MenuLateralContext = React.createContext<MenuLateralContextType>(null!);

export function MenuLateralProvider({ children }: { children: React.ReactNode }) {
    var [ativado, setAtivado] = React.useState<boolean>(false);

    function alterarEstadoMenu() {
        console.log('ATIVANDO MENU', ativado)
        setAtivado(!ativado);
    };

    var funcoes = { alterarEstadoMenu, ativado }

    return <MenuLateralContext.Provider value={funcoes}>{children}</MenuLateralContext.Provider>;
}

export function useMenuLateralContext() {
    return React.useContext(MenuLateralContext);
}


