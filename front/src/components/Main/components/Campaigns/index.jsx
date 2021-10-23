import React from "react";
import "../../main.css"
import moment from "moment";

const Campaigns = (props) => {
    const { campaigns, getDetails } = props;

    const [nowHour, setNowHour] = React.useState(moment().format("HH"));

    const _getActivityBadge = (campaign) => {
        const status = campaign.activeHours.filter(h => +h === +nowHour).length > 0 ? "active-campaign" : "inactive-campaign";
        return status;
    }

    return (
        <>
            <div className="list">
                {campaigns?.length > 0 ?
                    (
                        <ol>
                            {campaigns.map(c => (
                                <li key={c.id}><p className="link" onClick={() => getDetails(c.id)}><p className={_getActivityBadge(c)}></p>{c.name}</p></li>
                            ))
                            }
                        </ol>
                    ) : (
                        "No campaigns"
                    )
                }
            </div>
            <div>

            </div>
        </>
    );
}

export default Campaigns;