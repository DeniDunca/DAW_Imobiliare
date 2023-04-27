import "./Sale.css";
import {useEffect, useState} from "react";
import {DisplayElement} from "../rent/DisplayElement";

export const Sale = () => {
    const [sales, setSales] = useState([]);
    const getAllSales = async () => {
        const response = await fetch('http://127.0.0.1:5000/sales/getAll');
        const salesData = await response.json();

        setSales(salesData);
    }

    useEffect(() => {
        getAllSales().then().catch(error => console.log(error));
    },[])

    return (
        <div className={"sale-main"}>
            <div>
                <div id={"apartamente"} className={"sale-text"}>Apartamente</div>
                <hr/>
                <div className={"list"}>
                    {sales?.filter(r => r.type === 'Apartamente').map(rent => <DisplayElement key ={rent.id}
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
                <div id={"case"} className={"sale-text"}>Case</div>
                <hr/>
                <div className={"list"}>
                    {sales?.filter(r => r.type === 'Case').map(rent => <DisplayElement key ={rent.id}
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
                <div id={"garsoniere"} className={"sale-text"}>Garsoniere</div>
                <hr/>
                <div className={"list"}>
                    {sales?.filter(r => r.type === 'Garsoniere').map(rent => <DisplayElement key ={rent.id}
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
