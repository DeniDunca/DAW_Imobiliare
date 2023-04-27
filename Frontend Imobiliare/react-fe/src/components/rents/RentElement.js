import './RentsTable.css';
import {useRef, useState} from "react";

export const RentElement = ({
                                address,
                                area,
                                description,
                                id,
                                phone,
                                price,
                                rooms,
                                type,
                                deleteRentForElement,
                                updateElement
                            }) => {

    const [isModify, setIsModify] = useState(false);
    const addressRef = useRef(address);
    const areaRef = useRef(area);
    const descriptionRef = useRef(description);
    const phoneRef = useRef(phone);
    const priceRef = useRef(price);
    const roomsRef = useRef(rooms);
    const typeRef = useRef(type);

    function modifyHandler() {
        setIsModify(true);
    }

    function backHandler() {
        setIsModify(false);
    }

    function deleteHandler() {
        const fetchRent = async () => {
            await fetch(`http://127.0.0.1:5000/rents/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        }
        fetchRent().then(r => deleteRentForElement(id));
    }

    function updateHandler() {
        const updateRent = async () => {
            await fetch('http://127.0.0.1:5000/rents/update', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    address: addressRef.current.value,
                    description: descriptionRef.current.value,
                    price: priceRef.current.value,
                    area: areaRef.current.value,
                    rooms: roomsRef.current.value,
                    phone: phoneRef.current.value,
                    type: typeRef.current.value
                })
            })
        }
        updateRent().then(r => updateElement());
        setIsModify(false);
    }

    return (
        <tr>
            {isModify &&
            <>
                <th>{id}</th>
                <th><input className={"input"} defaultValue={address} ref={addressRef}/></th>
                <th><input className={"input"} defaultValue={area} ref={areaRef}/></th>
                <th><input className={"input"} defaultValue={description} ref={descriptionRef}/></th>
                <th><input className={"input"} defaultValue={phone} ref={phoneRef}/></th>
                <th><input className={"input"} defaultValue={price} ref={priceRef}/></th>
                <th><input className={"input"} defaultValue={rooms} ref={roomsRef}/></th>
                <th>
                    <select className={"input"} defaultValue={type} ref={typeRef}>
                        <option value="Apartamente">Apartamente</option>
                        <option value="Case">Case</option>
                        <option value="Garsoniere">Garsoniere</option>
                    </select>
                </th>
            </>}
            {!isModify &&
            <>
                <th>{id}</th>
                <th>{address}</th>
                <th>{area}</th>
                <th>{description}</th>
                <th>{phone}</th>
                <th>{price}</th>
                <th>{rooms}</th>
                <th>{type}</th>
            </>
            }
            {isModify &&
            <th>
                <button className={"button"} onClick={updateHandler}>Confirm</button>
                <button className={"button"} onClick={backHandler}>Back</button>
            </th>
            }
            {!isModify &&
            <th>
                <button className={"button"} onClick={modifyHandler}>Update</button>
                <button className={"button"} onClick={deleteHandler}>Delete</button>
            </th>
            }
        </tr>
    )
}