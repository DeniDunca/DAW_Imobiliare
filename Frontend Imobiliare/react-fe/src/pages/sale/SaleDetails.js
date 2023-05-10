import announce1 from "../../assets/images/announce1.png";
import announce2 from "../../assets/images/announce2.png";
import announce3 from "../../assets/images/announce3.png";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "../../components/modal/Modal";

export const SaleDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [sale, setSale] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [checkMessage, setCheckMessage] = useState([]);
    const [changeDate, setChangeDate] = useState(false)

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    let img = '';

    useEffect(() => {
        const getSaleById = async () => {
            const response = await fetch(`http://127.0.0.1:5000/sales/get/${id}`);
            const saleData = await response.json();

            setSale(saleData);
        }

        getSaleById().then().catch(error => console.log(error));
    }, [id])

    if (sale.type === 'Apartamente') {
        img = announce1;
    } else if (sale.type === 'Case') {
        img = announce2;
    } else {
        img = announce3;
    }

    const handleSubmit = (date, time) => {
        const checkAppointment = async () => {
            const response = await fetch(`http://localhost:5000/appointments/check/${id}/false/${date}/${time}`)
            const responseData = await response.json();

            setCheckMessage(responseData)
            return responseData;
        }

        const addAppointment = async () => {
            const response = await fetch("http://127.0.0.1:5000/appointments/add",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        imobil_id: id,
                        address: sale.address,
                        description: sale.description,
                        price: sale.price,
                        area: sale.area,
                        rooms: sale.rooms,
                        phone: sale.phone,
                        type: sale.type,
                        date: date,
                        time: time,
                        is_rent: false
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

    const dateIsChanged = () => {
        setChangeDate(false)
    }

    const goToAppointmentCalendar = () => {
        navigate(`/saleCalendar/${id}`);
    }

    const goToStatistics = () => {
        navigate(`/saleStatistics/${id}`)
    }

    return (
        <div>
            <div className={"sale-main"}>
                <div className={"announcement"}>
                    <div className={"description-image"}>
                        <img src={img} width={"400px"} alt={"announcement"}/>
                    </div>
                    <div className={"description-elements"}>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Tip:</div>
                            <div className={"description-element-content"}> {sale.type}</div>
                        </div>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Descriere:</div>
                            <div className={"description-element-content"}> {sale.description}</div>
                        </div>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Adresa:</div>
                            <div className={"description-element-content"}> {sale.address}</div>
                        </div>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Pret:</div>
                            <div className={"description-element-content"}> {sale.price} euro/luna</div>
                        </div>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Suprafata:</div>
                            <div className={"description-element-content"}> {sale.area}</div>
                        </div>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Numar camere:</div>
                            <div className={"description-element-content"}> {sale.rooms}</div>
                        </div>
                        <div className={"description-element"}>
                            <div className={"description-element-label"}>Telefon:</div>
                            <div className={"description-element-content"}> {sale.phone}</div>
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
                                 type={sale.type}
                                 description={sale.description}
                                 address={sale.address}
                                 price={sale.price}
                                 area={sale.area}
                                 rooms={sale.rooms}
                                 phone={sale.rooms}
                                 changeDate={changeDate}
                                 checkMessage={checkMessage}
                                 dateIsChanged={dateIsChanged}
            />}
        </div>
    )
}