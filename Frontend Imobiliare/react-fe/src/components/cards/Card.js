import "./Card.css";

export const Card = (props) => {
    return (
        <div className={"light-card"}>
            <div className={"dark-card"}>
                <div className={"description-text"}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}
