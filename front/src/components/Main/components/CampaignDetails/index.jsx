import React from "react";

const CampaignDetails = (props) => {
    const { details, allBanners, updateDetails, deleteCampaign, addBannerToCampaign, removeBannerFromCampaign } = props;
    const [detailsData, setDetailsData] = React.useState(details);

    const _selectBanner = (e) => {
        const banner = allBanners.find(c => c.id === +e.target.value);
        banner && setDetailsData({ ...detailsData, banners: [...detailsData.banners, banner] });
        addBannerToCampaign(details.id, banner);
    }

    const _removeBanner = (c) => {
        setDetailsData({ ...detailsData, banners: detailsData.banners.filter(item => item.id !== c.id) });
        removeBannerFromCampaign(details.id, c)
    };

    const _selectHour = (hour, e) => {
        console.log(detailsData.activeHours);
        if (detailsData.activeHours.filter(h => +h === hour).length)
            setDetailsData({ ...detailsData, activeHours: detailsData.activeHours.filter(h => +h !== hour) });
        else
            setDetailsData({ ...detailsData, activeHours: [...detailsData.activeHours, hour.toString()] });
    }

    const hoursInDay = [...Array(24).keys()];

    return (
        <>
            {details &&
                <div>
                    <input type="button" onClick={() => deleteCampaign(details.id)} value="Delete" />
                    <div className="details flex between">
                        <div>
                            <span>Name</span> <input type="text" value={detailsData.name} onChange={(e) => setDetailsData({ ...detailsData, name: e.target.value })} />
                        </div>
                        <input type="button" onClick={() => updateDetails(details.id, detailsData)} value="Save Changes" />
                    </div>
                    <div>
                        <b> ActiveHours</b>
                        <br />
                        <div>
                            {hoursInDay.map(h => (
                                <div>
                                    <input type="checkbox" name={"cb" + h} checked={detailsData.activeHours?.includes(h+"")} onChange={(e) => _selectHour(h, e)} />
                                    <label for={"cb" + h}> {h}:00</label>
                                </div>
                            ))
                            }
                        </div>

                    </div>
                    <br />
                    <b>Banners</b>
                    <div className="campaigns">
                        <ol>
                            {detailsData.banners?.map(b => (
                                <li> {b.name} <a className="link" onClick={() => _removeBanner(b)}>[ X remove ]</a></li>
                            ))}
                        </ol>
                        <select onChange={(e) => _selectBanner(e)}>
                            <option value="" selected disabled hidden>Add banner</option>
                            {allBanners?.filter(c => !detailsData?.banners?.some(dc => dc.id === c.id)).map(c => (
                                <option value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            }
        </>
    );
}

export default CampaignDetails;