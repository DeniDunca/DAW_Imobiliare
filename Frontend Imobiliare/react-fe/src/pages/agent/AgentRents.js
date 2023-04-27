import "./Agent.css";
import {useEffect, useState} from "react";
import {RentsTable} from "../../components/rents/RentsTable";
import {AddRent} from "./AddRent";
import {useNavigate} from "react-router-dom";


export const AgentRents = () => {
    const navigate = useNavigate();
    const [rents, setRents] = useState([]);

    useEffect(() => {
        const isAgent = sessionStorage.getItem('isAgent') === 'true';

        if (!isAgent) navigate('/news');
    },[navigate])


    const getAllRents = async () => {
        const response = await fetch('http://127.0.0.1:5000/rents/getAll');
        const rentsData = await response.json();

        setRents(rentsData);
    }

    useEffect(() => {
        getAllRents().then().catch(error => console.log(error));
    },[]);

    const addRent = (rent) => {
        setRents([...rents, rent]);
    }

    const deleteRent = (id) => {
        setRents(rents.filter(r => r.id !== id));
    }

    const updateRent = (id) => {
        console.log("here");
        getAllRents().then().catch(error => console.log(error));
    }

    return(
        <div>
            <RentsTable rents={rents} deleteRent={deleteRent} updateRent={updateRent}/>
            <AddRent add={addRent}/>
        </div>
    );
}
