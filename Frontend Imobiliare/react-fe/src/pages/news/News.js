import {Card} from "../../components/cards/Card";
import background from "../../assets/images/midbackground.png";
import news1 from "../../assets/images/news1.png";
import "./News.css";

export const News = () => {

    return(
        <div>
            <div className={"description-news"}>
                <Card>
                    <div className={"image-news"}>
                        <div>
                            <img src={news1} alt={"news1"}/>
                        </div>
                        <div>
                            <h3>APARTAMENTE NOI</h3>

                            Apartamente de 2 si 3 camere mobilate si utilate complet, confort de lux.
                            Situate in zona Grigorescu, Cluj-Napoca
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className={"image-news"}>
                        <div>
                            <img src={news1} alt={"news1"}/>
                        </div>
                        <div>
                            <h3>APARTAMENTE NOI</h3>

                            Apartamente de 2 si 3 camere mobilate si utilate complet, confort de lux.
                            Situate in zona Grigorescu, Cluj-Napoca
                        </div>
                    </div>
                </Card>
                <img src={background} alt={"mid backgorund"}/>
            </div>
        </div>
    );
}