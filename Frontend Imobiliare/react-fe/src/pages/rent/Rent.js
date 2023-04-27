import "./Rent.css";
import {useEffect, useState} from "react";
import {DisplayElement} from "./DisplayElement";

export const Rent = () => {
    const [rents, setRents] = useState([]);
    const getAllRents = async () => {
        const response = await fetch('http://127.0.0.1:5000/rents/getAll');
        const rentsData = await response.json();

        setRents(rentsData);
    }

    useEffect(() => {
        getAllRents().then().catch(error => console.log(error));
    },[])

    return (
        <div className={"rent-main"}>
            <div>
                <div id={"apartamente"} className={"rent-text"}>Apartamente</div>
                <hr/>
                <div className={"list"}>
                    {rents?.filter(r => r.type === 'Apartamente').map(rent => <DisplayElement key ={rent.id}
                                                                                              address={rent.address}
                                                                                              area={rent.area}
                                                                                              description={rent.description}
                                                                                              id={rent.id}
                                                                                              phone={rent.phone}
                                                                                              price={rent.price}
                                                                                              rooms={rent.rooms}
                                                                                              type={rent.type}
                                                                                              />)}
                </div>
            </div>
            <div>
                <div id={"case"} className={"rent-text"}>Case</div>
                <hr/>
                <div className={"list"}>
                    {rents?.filter(r => r.type === 'Case').map(rent => <DisplayElement key ={rent.id}
                                                                                              address={rent.address}
                                                                                              area={rent.area}
                                                                                              description={rent.description}
                                                                                              id={rent.id}
                                                                                              phone={rent.phone}
                                                                                              price={rent.price}
                                                                                              rooms={rent.rooms}
                                                                                              type={rent.type}
                    />)}
                </div>

            </div>
            <div>
                <div id={"garsoniere"} className={"rent-text"}>Garsoniere</div>
                <hr/>
                <div className={"list"}>
                    {rents?.filter(r => r.type === 'Garsoniere').map(rent => <DisplayElement key ={rent.id}
                                                                                              address={rent.address}
                                                                                              area={rent.area}
                                                                                              description={rent.description}
                                                                                              id={rent.id}
                                                                                              phone={rent.phone}
                                                                                              price={rent.price}
                                                                                              rooms={rent.rooms}
                                                                                              type={rent.type}
                    />)}
                </div>
            </div>
        </div>
    );
}
