import './RentsTable.css';
import {RentElement} from "./RentElement";

export const RentsTable = ({rents, deleteRent,updateRent}) => {

    const deleteRentForElement = (id) => {
        deleteRent(id);
    }

    const updateElement = () => {
       updateRent();
    }

    return(
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
            {rents?.map(rent => <RentElement key ={rent.id}
                                            address={rent.address}
                                            area={rent.area}
                                            description={rent.description}
                                            id={rent.id}
                                            phone={rent.phone}
                                            price={rent.price}
                                            rooms={rent.rooms}
                                            type={rent.type}
                                            deleteRentForElement={deleteRentForElement}
                                            updateElement={updateElement}/>)}
            </tbody>
        </table>
    )
}