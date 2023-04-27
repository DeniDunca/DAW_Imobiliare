import "./Login.css";
import {Card} from "../../components/cards/Card";
import {useNavigate} from 'react-router-dom';
import {useRef} from "react";

export const Login = (props) => {
    const navigate = useNavigate();
    const email = useRef('');
    const password = useRef('');

    const login = (event) => {
        event.preventDefault();

        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        const fetchLogin  = async () => {
            const response = await fetch('http://127.0.0.1:5000/users/login',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email : emailValue,
                    password : passwordValue
                })
            });

            const data = await response.json();
            console.log(data);

            if(data.userId != null){
                sessionStorage.setItem('userId',data.userId);
                sessionStorage.setItem('isAgent',data.isAgent);
                navigate("/news")
                window.location.reload()
            }
        }
        fetchLogin().then().catch(e => console.log(e));

    }

    return (
        <div className={"login-main"}>
            <Card>
                <form className={"form-login-elements"} onSubmit={login}>
                    <div>Autentifică-te pentru a folosi platforma:</div>
                    <input placeholder={"Email"} ref={email}/>
                    <input placeholder={"Parola"} ref={password} type="password"/>
                    <button>Login</button>
                </form>
                <div>
                    <div>Nu ai un cont?</div>
                    <a className={"a"} href={"/signup"}> Crează un cont aici</a>
                </div>

            </Card>
        </div>
    );
}
