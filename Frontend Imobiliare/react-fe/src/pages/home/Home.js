import {Card} from "../../components/cards/Card";
import "./Home.css";
import background from "../../assets/images/midbackground.png";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import YouTube from "react-youtube";

export const Home = () => {
    return (
        <div>
            <div className={"description"}>
                <Card>
                    <div>
                        Bun venit pe platforma noastră online pentru închirierea și achiziționarea caselor și apartamentelor!
                    </div>
                    <div>
                        Indiferent dacă doriți un apartament cochet sau o casă spațioasă pentru familie, suntem aici pentru a vă ajuta.
                    </div>
                    <div>
                        Site-ul nostru oferă o gamă largă de proprietăți de închiriat sau de vânzare în diferite locații,
                        astfel încât să puteți găsi cu ușurință casa de vis.
                    </div>
                </Card>
                <img src={background} alt={"mid-backgorund"}/>
                <h1 id="about" className={"about"}>Despre noi</h1>
                <Card>
                    <div className={"image-text"}>
                        <div>
                            Suntem o echipă de experți în domeniul imobiliar, pasionați de găsirea celor mai bune soluții
                            pentru clienții noștri. În calitate de furnizor de servicii imobiliare de top, ne străduim să
                            oferim o experiență excelentă pentru toți clienții noștri, indiferent de nevoile lor.
                        </div>
                        <div>
                            <img src={img1} alt={"img1"}/>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className={"image-text"}>
                        <div>
                            <img src={img2} alt={"img2"}/>
                        </div>
                        <div>
                            Cu o vastă experiență în domeniul imobiliar și o pasiune pentru excelență, suntem gata să vă
                            ajutăm să găsiți proprietatea perfectă. Fie că sunteți în căutarea unei case de vis sau a unei
                            proprietăți comerciale, suntem aici pentru a vă oferi cele mai bune soluții, adaptate nevoilor
                            dumneavoastră.
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className={"image-text"}>
                        <div>
                            <YouTube videoId="zRrDU-AT9v8"/>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}