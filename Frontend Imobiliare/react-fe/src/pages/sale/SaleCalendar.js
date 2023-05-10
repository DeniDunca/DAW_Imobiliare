import {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {useNavigate, useParams} from "react-router-dom";

export const SaleCalendar = () => {
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
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={appointments.map(appointment => ({
                    title: appointment.description,
                    start: appointment.date + 'T' + appointment.time,
                    end: appointment.date + 'T' + appointment.time,
                    backgroundColor: '#213456'
                }))}
            />
        </div>
    )
}