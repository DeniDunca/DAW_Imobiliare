import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export const SaleStatistics = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await fetch(`http://127.0.0.1:5000/appointments/getAll/${id}/false`);

            if(!response.ok){
                throw  new Error("Something went wrong");
            }

            const responseData = await response.json();
            console.log(responseData)
            setAppointments(responseData)
        }

        fetchAppointments().catch(err => {
            console.log("Error loading appointments:" + err)
        });
    },[id]);

    const goToImobil = () =>{
        navigate(`/saleDetails/${id}`)
    }

    return(
        <div>
            <button className={'button-programare'} onClick={goToImobil}>Înapoi</button>
        </div>
    )
}