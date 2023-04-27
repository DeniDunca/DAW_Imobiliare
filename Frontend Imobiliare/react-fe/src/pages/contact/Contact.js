import "./Contact.css";
import {Card} from "../../components/cards/Card";
import map from "../../assets/images/map.png";

export const Contact = () => {
    return(
        <div className={"contact-main"}>
            <Card>
                <div className={"contact-elements"}>
                    <form className={"form-elements"}>
                        <div>Trimite-ne email:</div>
                        <input placeholder={"Adresa de email"}/>
                        <input placeholder={"Subiect"}/>
                        <textarea placeholder={"Email text"}/>
                        <button>Trimite</button>
                    </form>
                    <div className={"visit-elements"}>
                        <div> Sediul nostru:</div>
                        <img src={map} alt={"map"} />
                        <div> str. Horia, nr. 10, Cluj-Napoca, Cluj</div>
                    </div>
                </div>

            </Card>

        </div>
    );
}
