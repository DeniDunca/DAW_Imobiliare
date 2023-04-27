import "./Agent.css";
import { useRef, useState} from "react";

export const AddRent = (props) => {
    const [isAdded, setIsAdded] = useState(false);
    const address = useRef();
    const description = useRef();
    const price = useRef();
    const area = useRef();
    const rooms = useRef();
    const phone = useRef();
    const type = useRef();

    function addHandler() {
        setIsAdded(true);
    }

    function submitHandler(event) {
        event.preventDefault();

        const addRent = async () => {
            const rent = {
                address: address.current.value,
                description: description.current.value,
                price: price.current.value,
                area: area.current.value,
                rooms: rooms.current.value,
                phone: phone.current.value,
                type: type.current.value,
            }

            await fetch('http://127.0.0.1:5000/rents/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rent)
            });

            return rent;
        }
        addRent().then(r => {
            setIsAdded(false)
            props.add(r);
        });
    }
    function backHandler() {
        setIsAdded(false);
    }

    return(
        <div>
            <button className={"button"}  onClick={addHandler}>Add new Rent</button>
            <div>
                {isAdded && <form onSubmit={submitHandler}>
                    <h3>Enter rent details</h3>
                    <input className={"input"} placeholder={"Address"} ref={address}/>
                    <input className={"input"}placeholder={"Description"} ref={description}/>
                    <input className={"input"}placeholder={"Price"} ref={price}/>
                    <input className={"input"}placeholder={"Area"} ref={area}/>
                    <input className={"input"}placeholder={"Rooms"} ref={rooms}/>
                    <input className={"input"}placeholder={"Phone"} ref={phone}/>
                    <select className={"input"} defaultValue={type} ref={type}>
                        <option value="Apartamente">Apartamente</option>
                        <option value="Case">Case</option>
                        <option value="Garsoniere">Garsoniere</option>
                    </select>
                    <button className={"button"}onClick={backHandler}>Back</button>
                    <button className={"button"}>Confirm</button>
                </form>
                }
            </div>
        </div>
    );
}
