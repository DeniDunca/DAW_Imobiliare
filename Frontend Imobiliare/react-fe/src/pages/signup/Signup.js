import "./Signup.css";
import {Card} from "../../components/cards/Card";
import {useNavigate} from 'react-router-dom';
import {useRef} from "react";

export const Signup = () => {
    const navigate = useNavigate();

    const name = useRef('');
    const email = useRef('');
    const password = useRef('');
    const confirmPassword = useRef('');

    const signup = (event) => {
        event.preventDefault();

        const nameValue = name.current.value;
        const emailValue = email.current.value;
        const passwordValue = password.current.value;
        const confirmPasswordValue = confirmPassword.current.value;

        if(passwordValue !== confirmPasswordValue)
            return;

        const fetchSignup = async () => {
            const response = await fetch('http://127.0.0.1:5000/users/add',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    name: nameValue,
                    email: emailValue,
                    password: passwordValue,
                    isAgent: false,
                    preference: null
                })
            });
            const data = await response.json();
            console.log(data);
        }
        fetchSignup().then(navigate('/login')).catch(error => console.log(error));
    }

    return (
        <div className={"signup-main"}>
            <Card>
                <form className={"form-signup-elements"} onSubmit={signup}>
                    <div>Introdu datele tale pentru a crea un cont:</div>
                    <input placeholder={"Name"} ref={name}/>
                    <input placeholder={"Email"} ref={email}/>
                    <input placeholder={"Parola"} ref={password} type="password"/>
                    <input placeholder={"Confirma parola"} ref={confirmPassword} type="password"/>
                    <button>Creaza cont</button>
                </form>
                <div>
                    <div>Ai deja un cont?</div>
                    <a className={"a"} href={"/login"}> Autentifica-te aici</a>
                </div>

            </Card>
        </div>
    );
}
