import "./Profile.css";
import {Card} from "../../components/cards/Card";
import profile from "../../assets/images/profile.png"
import { useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const Profile = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [preference, setPreference] = useState('');
    const [longitude, setLongitude] = useState(sessionStorage.getItem('longitude'));
    const [latitude, setLatitude] = useState(sessionStorage.getItem('latitude'));

    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch(`http://127.0.0.1:5000/users/get/${sessionStorage.getItem('userId')}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            console.log(data);

            setName(data.name);
            setEmail(data.email);
            setPassword(data.password);
            setPreference(data.preference);
        }
        getUserData().then().catch(error => console.log(error));

    },[]);

    const getLocation = () =>{
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            localStorage.setItem('latitude', position.coords.latitude);
            localStorage.setItem('longitude', position.coords.longitude);
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);

        });
    }

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('userId') !== null;
        if (!loggedIn) navigate('/news');
    },[navigate])

    const saveChanges = () => {
        const updateUser = async () => {
           await fetch('http://127.0.0.1:5000/users/update', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    id: sessionStorage.getItem('userId'),
                    name: name,
                    email: email,
                    password: password,
                    isAgent: false,
                    preference: preference
                })
            })
        }
        updateUser().then().catch(error=>console.log(error));
    }

    return(
        <div className={"profile-main"}>
            <Card>
                <div className={"profile-info"}>
                    <div className={"user"}>
                        <img src={profile} alt={"profile"}/>
                        <div>
                            { name }
                        </div>
                    </div>
                    <div className={"profile-elements"}>
                        <input placeholder={"Nume"} value={name} onChange={event => setName(event.target.value)}/>
                        <input placeholder={"Email"} value={email} onChange={event => setEmail(event.target.value)}/>
                        <input placeholder={"Parola"} value={password} onChange={event => setPassword(event.target.value)}/>
                        <select value={preference} onChange={event => setPreference(event.target.value)}>
                            <option value="Apartamente">Apartamente</option>
                            <option value="Case">Case</option>
                            <option value="Garsoniere">Garsoniere</option>
                        </select>
                        <div>
                            <input placeholder={"Longitudine"} value={longitude} onChange={event => setLongitude(event.target.value)}/>
                            <input placeholder={"Latitudine"} value={latitude} onChange={event => setLatitude(event.target.value)}/>
                            <button onClick={getLocation}>Locatie</button>
                        </div>

                        <button onClick={saveChanges}>Salvează modificări</button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
