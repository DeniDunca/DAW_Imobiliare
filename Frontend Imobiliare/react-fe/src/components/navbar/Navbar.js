import "./Navbar.css";
import {useNavigate} from "react-router-dom";
import { useState} from "react";


export const Navbar = () => {
    const navigate = useNavigate();

    const [user,setUser] = useState(sessionStorage.getItem('userId'));
    const [isAgent, setIsAgent] = useState(sessionStorage.getItem('isAgent'));

    const logout = () => {
        sessionStorage.clear();
        navigate("/login");
        setUser(null);
    }

    return (
        <div className={"nav"}>
            <div className={"nav-items"}>
                <a href={"/"}>Acasă</a>
                <a href={"/#about"}>Despre noi</a>
                <a href={"/news"}>Noutăți</a>
                <div className={"dropdown"}>
                    <div className={"nav-item"}>
                        Închirieri
                    </div>
                    <div className="dropdown-content">
                        <a href="/rent#apartamente">Apartamente</a>
                        <a href="/rent#case">Case</a>
                        <a href="/rent#garsoniere">Garsoniere</a>
                    </div>
                </div>

                <div className={"dropdown"}>
                    <div className={"nav-item"}>
                        Vânzări
                    </div>
                    <div className="dropdown-content">
                        <a href="/sale#apartamente">Apartamente</a>
                        <a href="/sale#case">Case</a>
                        <a href="/sale#garsoniere">Garsoniere</a>
                    </div>
                </div>

                <a href={"/contact"}>Contact</a>

                { isAgent === 'true' && <a href={"/agentRent"}>Agent Închirieri</a> }
                { isAgent === 'true' && <a href={"/agentSale"}>Agent Vânzări</a> }
                { user != null &&
                <>
                    <a href={"/myProfile"}>Contul meu</a>
                    <button onClick={logout}>Log out</button>
                </>}

                {sessionStorage.getItem('userId') == null && <a href={"/login"}>Login</a>}

            </div>
        </div>
    );
}