import React from "react";

const BannerDetails = (props) => {
    const { details, allCampaigns, updateDetails, deleteBanner, addCampaignToBanner, removeCampaignFromBanner } = props;
    const [detailsData, setDetailsData] = React.useState(details);

    const _selectCampaign = (e) => {
        const campaign = allCampaigns.find(c => c.id === +e.target.value);
        campaign && setDetailsData({ ...detailsData, campaigns: [...detailsData.campaigns, campaign] });
        addCampaignToBanner(details.id, campaign);
    }

    const _removeCampaign = (c) => {
        setDetailsData({ ...detailsData, campaigns: detailsData.campaigns.filter(item => item.id !== c.id) });
        removeCampaignFromBanner(details.id, c)
    };

    return (
        <>
            {details &&
                <div>
                    <input type="button" onClick={() => deleteBanner(details.id)} value="Delete" />
                    <div className="details flex between">
                        <div>
                            <span>Name</span> <input type="text" value={detailsData.name} onChange={(e) => setDetailsData({ ...detailsData, name: e.target.value })} />
                        </div>
                        <div>
                            <span>Text</span> <textarea value={detailsData.text} onChange={(e) => setDetailsData({ ...detailsData, text: e.target.value })} />
                        </div>
                        <input type="button" onClick={() => updateDetails(details.id, detailsData)} value="Save Changes" />
                    </div>
                    <b>campaigns</b>
                    <div className="campaigns">
                        <ol>
                            {detailsData.campaigns?.map(c => (
                                <li key={c.id}> {c.name} <a className="link" onClick={() => _removeCampaign(c)}>[ X remove ]</a></li>
                            ))}
                        </ol>
                        <select onChange={(e) => _selectCampaign(e)}>
                            <option value="" selected disabled hidden>Add campaign</option>
                            {allCampaigns?.filter(c => !detailsData?.campaigns?.some(dc => dc.id === c.id)).map(c => (
                                <option value={c.id} key={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            }
        </>
    );
}

export default BannerDetails;