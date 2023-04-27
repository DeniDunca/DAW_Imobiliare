import {useEffect, useState} from "react";
import {SaleE} from "../../components/sales/SaleE";
import {useNavigate} from "react-router-dom";
import {AddSale} from "./AddSale";

export const AgentSales = () => {
    const navigate = useNavigate();
    const [sales, setSales] = useState([]);

    const deleteSaleForElement = () => {
        getAllSales().then().catch(error => console.log(error));
    }

    const addSale = () => {
        getAllSales().then().catch(error => console.log(error));
    }

    const updateElement = () => {
        getAllSales().then().catch(error => console.log(error));
    }

    useEffect(() => {
        const isAgent = sessionStorage.getItem('isAgent') === 'true';

        if (!isAgent) navigate('/news');
    },[navigate])

    const getAllSales = async () => {
        const response = await fetch('http://127.0.0.1:5000/sales/getAll');
        const salesData = await response.json();

        setSales(salesData);
    }

    useEffect(() => {
        getAllSales().then().catch(error => console.log(error));
    },[]);

    return(
        <>
            <table>
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Address</th>
                    <th>Area</th>
                    <th>Description</th>
                    <th>Phone</th>
                    <th>Price</th>
                    <th>Rooms</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                {sales?.map(rent => <SaleE key ={rent.id}
                                                 address={rent.address}
                                                 area={rent.area}
                                                 description={rent.description}
                                                 id={rent.id}
                                                 phone={rent.phone}
                                                 price={rent.price}
                                                 rooms={rent.rooms}
                                                 type={rent.type}
                                                 deleteSaleForElement={deleteSaleForElement}
                                                 updateElement={updateElement}/>)}
                </tbody>
            </table>
            <AddSale add={addSale}/>
        </>
    )

}