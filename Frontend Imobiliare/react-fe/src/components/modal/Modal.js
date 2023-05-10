import React, {useRef} from "react";
import "./Modal.css";

const Modal = ({ handleCloseModal, title, handleSubmit, type, description, address, price, area, rooms, phone,changeDate,checkMessage,dateIsChanged  }) => {
    const date = useRef('');
    const time = useRef('');

    const submit = (event) => {
        event.preventDefault();

        handleSubmit(date.current.value, time.current.value);
    }


    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-title">{title}</div>
                <form className="modal-form" onSubmit={submit}>
                    <br />
                    <label className="modal-label" htmlFor="date">Data:</label>
                    <input className="modal-input" onClick={dateIsChanged} type="date" id="date" name="date" ref={date} />
                    <br />
                    <label className="modal-label" htmlFor="time">Ora:</label>
                    <input className="modal-input" onClick={dateIsChanged} type="time" id="time" name="time" ref={time} />
                    <br />
                    <label className="modal-label" htmlFor="tip">Tipul imobilului:</label>
                    <input className="modal-input" type="text" id="tip" name="tip" value={type} readOnly/>
                    <br />
                    <label className="modal-label" htmlFor="descriere">Descriere:</label>
                    <input className="modal-input" type="text" id="descriere" name="descriere" value={description} readOnly/>
                    <br />
                    <label className="modal-label" htmlFor="address">Adresa:</label>
                    <input className="modal-input" type="text" id="address" name="address" value={address} readOnly/>
                    <br />
                    <label className="modal-label" htmlFor="pret">Pret:</label>
                    <input className="modal-input" type="text" id="pret" name="pret" value={price} readOnly />
                    <br />
                    <label className="modal-label" htmlFor="suprafata">Suprafata:</label>
                    <input className="modal-input" type="text" id="suprafata" name="suprafata" value={area} readOnly/>
                    <br />
                    <label className="modal-label" htmlFor="camere">Numar camere:</label>
                    <input className="modal-input" type="text" id="camere" name="camere" value={rooms} readOnly/>
                    <br />
                    <label className="modal-label" htmlFor="telefon">Telefon:</label>
                    <input className="modal-input" type="text" id="telefon" name="telefon" value={phone} readOnly/>
                    <br />
                    <div className={"modal-alert"}>
                        {changeDate &&
                        <div>
                            <div>{checkMessage.message} {checkMessage.closest_date}, {checkMessage.closest_time} </div>
                        </div>
                        }
                    </div>
                    <div className={"modal-footer"}>
                        <button className="modal-submit-button" >Programare</button>
                        <button className="modal-close-button" onClick={handleCloseModal}>Înapoi</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
