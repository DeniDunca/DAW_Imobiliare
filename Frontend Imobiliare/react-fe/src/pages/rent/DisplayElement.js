import announce1 from "../../assets/images/announce1.png";
import announce2 from "../../assets/images/announce2.png";
import announce3 from "../../assets/images/announce3.png";
import {Announcement} from "../../components/announcement/Announcement";
import {useNavigate} from "react-router-dom";

export const DisplayElement = (props) => {
    const navigate = useNavigate();
    let img = '';
    if (props.type === 'Apartamente') {
        img = announce1;
    } else if (props.type === 'Case') {
        img = announce2;
    } else {
        img = announce3;
    }

    const clickAnnouncement = () => {
        if(sessionStorage.getItem('userId') != null){
            if(window.location.href === "http://localhost:3000/rent#apartamente"){
                navigate(`/rentDetails/${props.id}`);
            }else{
                navigate(`/saleDetails/${props.id}`);
            }
        }
    }

    return(
        <Announcement>
            <div onClick={clickAnnouncement}>
                <img src={img} alt={"announcement"}/>
                <div className={"price"}>
                    {props.price} €/lună
                </div>
                <div className={"details"}>
                    <div>
                        {props.area} {props.address}
                    </div>
                    <div>
                        {props.rooms}
                    </div>
                    <div>
                        {props.phone}
                    </div>
                </div>
            </div>
        </Announcement>

    )
}