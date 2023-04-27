import "./Footer.css";
import fb from "../../assets/images/fb.png"
import insta from "../../assets/images/insta.png"
import yt from "../../assets/images/yt.png"

export const Footer = () => {
    return (
        <div className={"footer"}>
            <div className={"text"}>
                <div>
                    Urmărește-ne:
                </div>
                <div>
                    Contactează-ne:
                </div>
            </div>
            <div className={"info"}>
                <div className={"socials"}>
                    <div>
                        <img src={fb} alt={"Facebook"}/>
                    </div>
                    <div>
                        <img src={insta} alt={"Instagram"}/>
                    </div>
                    <div>
                        <img src={yt} alt={"Youtube"}/>
                    </div>
                </div>
                <div className={"data"}>
                    <div>
                        email: www.imobiliare@gmail.com
                    </div>
                    <div>
                        tel: 0782737789
                    </div>
                    <div>
                        adresa: str. Horia, nr. 10, Cluj-Napoca, Cluj
                    </div>
                </div>
            </div>
        </div>
    );
}
