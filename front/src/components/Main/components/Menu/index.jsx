import React from "react";
import "../../main.css"

const Menu = (props) => {
    const { getData } = props;
    return (
        <>
            <div className="menu">
                <p onClick={() => getData("banners")} className="link">Banners</p>
                <p onClick={() => getData("campaigns")} className="link">Campaigns</p>
            </div>
        </>
    );
}

export default Menu;