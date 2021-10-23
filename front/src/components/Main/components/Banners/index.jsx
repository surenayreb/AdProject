import React from "react";
import "../../main.css"

const Banners = (props) => {
    const { banners, getDetails } = props;

    return (
        <>
            <div className="list">
                {banners?.length > 0 ?
                    (
                        <ol>
                            {
                                banners.map(b => (
                                    <li key={b.id}><p className="link" onClick={() => getDetails(b.id)}>{b.name}</p></li>
                                ))
                            }
                        </ol>
                    ) : (
                        "No banners"
                    )
                }
            </div>
            <div>

            </div>
        </>
    );
}

export default Banners;