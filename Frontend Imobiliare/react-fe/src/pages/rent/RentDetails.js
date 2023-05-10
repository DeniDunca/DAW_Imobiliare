import announce1 from "../../assets/images/announce1.png";
import announce2 from "../../assets/images/announce2.png";
import announce3 from "../../assets/images/announce3.png";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "../../components/modal/Modal";

export const RentDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [rent, setRent] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [checkMessage, setCheckMessage] = useState([]);
    const [changeDate, setChangeDate] = useState(false)

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    let img = '';

    useEffect(() => {
        const getRentById = async () => {
            const response = await fetch(`http://127.0.0.1:5000/rents/get/${id}`);
            const rentData = await response.json();

            setRent(rentData);
        }

        getRentById().then().catch(error => console.log(error));
    }, [id])

    if (rent.type === 'Apartamente') {
        img = announce1;
    } else if (rent.type === 'Case') {
        img = announce2;
    } else {
        img = announce3;
    }

    const handleSubmit = (date, time) => {
        const checkAppointment = async () =>{
            const response = await fetch(  `http://localhost:5000/appointments/check/${id}/true/${date}/${time}`)
            const responseData = await response.json();

            setCheckMessage(responseData)
            return responseData;
        }

        const addAppointment = async () => {
            const response = await fetch("http://127.0.0.1:5000/appointments/add",
                {
                    method:"POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        imobil_id: id,
                        address: rent.address,
                        description: rent.description,
                        price: rent.price,
                        area: rent.area,
                        rooms: rent.rooms,
                        phone: rent.phone,
                        type: rent.type,
                        date:date,
                        time:time,
                        is_rent:true
                    })
                });
            const data = await response.json();
            console.log(data);
        }

        checkAppointment().then(r => {
            console.log(r.message)
                if (r.message === "Appointment made for:") {
                    addAppointment().then(handleCloseModal).catch(error => console.log(error));
                } else {
                    setChangeDate(true)
                }
            }
        ).catch(error => console.log(error))
    }

    const dateIsChanged = () =>{
        setChangeDate(false)
    }

    const goToAppointmentCalendar = () => {
        navigate(`/rentCalendar/${id}`);
    }

    const goToStatistics = () => {
        navigate(`/rentStatistics/${id}`)
    }

    return (
        <div>
            <div className={"rent-main"}>
                <div className={"announcement"}>
                    <div className={"description-image"}>
                        <img src={img} width={"400px"} alt={"announcement"}/>
                    </div>
                    <div className={"description-elements"}>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Tip:</div>
                            <div className={"description-element-content"}> {rent.type}</div>
                        </div>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Descriere:</div>
                            <div className={"description-element-content"}> {rent.description}</div>
                        </div>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Adresa:</div>
                            <div className={"description-element-content"}> {rent.address}</div>
                        </div>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Pret:</div>
                            <div className={"description-element-content"}> {rent.price} euro/luna</div>
                        </div>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Suprafata:</div>
                            <div className={"description-element-content"}> {rent.area}</div>
                        </div>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Numar camere:</div>
                            <div className={"description-element-content"}> {rent.rooms}</div>
                        </div>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Telefon:</div>
                            <div className={"description-element-content"}> {rent.phone}</div>
                        </div>
                        <button className={"button-programare"} onClick={handleOpenModal}>Programere vizita</button>
                        {sessionStorage.getItem('isAgent') === 'true' && <button className={"button-programare"} onClick={goToAppointmentCalendar}>Calendar Programari</button>}
                        {sessionStorage.getItem('isAgent') === 'true' && <button className={"button-programare"} onClick={goToStatistics}>Statistici</button>}
                    </div>
                </div>
            </div>
            {showModal && <Modal handleCloseModal={handleCloseModal}
                                 handleSubmit={handleSubmit}
                                 title={"Programează o vizită"}
                                 type={rent.type}
                                 description={rent.description}
                                 address={rent.address}
                                 price={rent.price}
                                 area={rent.area}
                                 rooms={rent.rooms}
                                 phone={rent.rooms}
                                 changeDate={changeDate}
                                 checkMessage={checkMessage}
                                 dateIsChanged={dateIsChanged}
            />}

        </div>

    )
}