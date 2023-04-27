import "./Announcement.css";

export const Announcement = (props) => {
    return(
        <div>
           <div className={"simple-card"}>
               <div className={"announcement-description-text"}>
                   {props.children}
               </div>
           </div>
        </div>
    );
}
