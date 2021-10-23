import { bannersApi, campaignsApi } from '../../api'

import React from "react";
import { Menu, Banners, Campaigns, BannerDetails, CampaignDetails } from './components';

import './main.css';

const Main = () => {
    const [loading, setLoading] = React.useState(false);
    const [loadingDetails, setLoadingDetails] = React.useState(false);
    const [showAddNewBanner, setShowAddNewBanner] = React.useState(false);
    const [showAddNewCampaign, setShowAddNewCampaign] = React.useState(false);

    const [banners, setBanners] = React.useState(null);
    const [campaigns, setCampaigns] = React.useState(null);
    const [details, setDetails] = React.useState(null);

    const [section, setSection] = React.useState("banners");

    const [newBannerName, setNewBannerName] = React.useState("New Banner");
    const [newBannerText, setNewBannerText] = React.useState(null);

    const [newCampaignName, setNewCampaignName] = React.useState("New Campaign");

    React.useEffect(() => {
        switch (section) {
            case "banners":
                _getBanners();
                break;
            case "campaigns":
                _getCampaigns();
                break;
            default: break;
        }
    }, [section]);


    const _setSection = (section) => {
        setSection(section);
        setShowAddNewBanner(false);
        setShowAddNewCampaign(false);
    }

    //Banner
    const _getBanners = async () => {
        setLoading(true);
        const response = await bannersApi.getBanners();
        setLoading(false);
        if (response.status === 200) { setBanners(response.data); setDetails(null) };
    }

    const _getBannerDetails = async (id) => {
        setShowAddNewBanner(false);
        setLoadingDetails(true);
        const response = await bannersApi.getBannerDetails(id);
        if (response.status === 200) setDetails(response.data);

        const campaignsResponse = await campaignsApi.getCampaigns();
        if (response.status === 200) setCampaigns(campaignsResponse.data);

        setLoadingDetails(false);
    }

    const _updateBannerDetails = async (id, data) => {
        const response = await bannersApi.updateDetails(id, data);
        if (response.status === 200) setBanners(banners.map(b =>
            b.id === response.data.id ? response.data : b
        ));
    }

    const _addCampaignToBanner = async (id, data) => {
        await bannersApi.addCampaignToBanner(id, data);
    }

    const _removeCampaignFromBanner = async (id, data) => {
        await campaignsApi.removeBannerFromCampaign(id, data);
    }

    const _deleteBanner = async (id) => {
        await bannersApi.deleteBanner(id);
        await _getBanners();
    }

    const _handleAddNewBanner = async () => {
        const data = { name: newBannerName, text: newBannerText };
        await bannersApi.addNewBanner(data);
        setShowAddNewBanner(false);
        await _getBanners();
    }

    //Campaign
    const _getCampaigns = async () => {
        setLoading(true);
        const response = await campaignsApi.getCampaigns();
        setLoading(false);
        if (response.status === 200) { setCampaigns(response.data); setDetails(null) };
    }

    const _getCampaignDetails = async (id) => {
        setShowAddNewCampaign(false);
        setLoadingDetails(true);
        const response = await campaignsApi.getCampaignDetails(id);
        if (response.status === 200) setDetails(response.data);

        const bannersResponse = await bannersApi.getBanners();
        if (response.status === 200) setBanners(bannersResponse.data);

        setLoadingDetails(false);
    }

    const _updateCampaignDetails = async (id, data) => {
        const response = await campaignsApi.updateDetails(id, data);
        if (response.status === 200) setCampaigns(campaigns.map(c =>
            c.id === response.data.id ? response.data : c
        ));
    }

    const _addBannerToCampaign = async (id, data) => {
        await campaignsApi.addBannerToCampaign(id, data);
    }

    const _removeBannerFromCampaign = async (id, data) => {
        await campaignsApi.removeBannerFromCampaign(id, data);
    }

    const _deleteCampaign = async (id) => {
        await campaignsApi.deleteCampaign(id);
        await _getCampaigns();
    }

    const _handleAddNewCampaign = async () => {
        const data = { name: newCampaignName };
        await campaignsApi.addNewCampaign(data);
        setShowAddNewCampaign(false);
        await _getCampaigns();
    }

    return (
        <>
            <div className="main flex">
                <div className="menu-container">
                    <div><strong>Menu</strong></div>
                    <Menu getData={_setSection} />
                </div>
                <div className="lists-container">
                    <div><strong>{section.charAt(0).toUpperCase() + section.slice(1)}</strong></div>
                    <div className="flex">
                        {section === "banners" && (
                            loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div>
                                    <div>
                                        <p className="link" onClick={() => setShowAddNewBanner(true)}>Add new</p>
                                        <hr />
                                    </div>
                                    <Banners
                                        banners={banners}
                                        getDetails={_getBannerDetails} />
                                </div>
                            )
                        )}
                        {showAddNewBanner && (
                            <div className="addNew flex column">
                                <span>Fill details</span>
                                <input type="text" value={newBannerName} onChange={(e) => setNewBannerName(e.target.value)} ></input>
                                <textarea type="text" value={newBannerText} onChange={(e) => setNewBannerText(e.target.value)} placeholder="description" />
                                <input type="button" onClick={_handleAddNewBanner} value="Add" />
                            </div>
                        )}
                    </div>
                    <div className="flex">
                        {section === "campaigns" && (
                            loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div>
                                    <div>
                                        <p className="link" onClick={() => setShowAddNewCampaign(true)}>Add new</p>
                                        <hr />
                                    </div>
                                    <Campaigns
                                        campaigns={campaigns}
                                        getDetails={_getCampaignDetails} />
                                </div>

                            )
                        )}
                        {showAddNewCampaign && (
                            <div className="addNew flex column">
                                <span>Fill details</span>
                                <input type="text" value={newCampaignName} onChange={(e) => setNewCampaignName(e.target.value)} ></input>
                                <input type="button" onClick={_handleAddNewCampaign} value="Add" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="details-container">
                    <div><strong>Details</strong></div>
                    {details && <div>
                        <div>
                            {section === "banners" && (
                                loadingDetails ? (
                                    <div>Loading Details...</div>
                                ) : (
                                    <BannerDetails
                                        details={details}
                                        allCampaigns={campaigns}
                                        deleteBanner={_deleteBanner}
                                        updateDetails={_updateBannerDetails}
                                        addCampaignToBanner={_addCampaignToBanner}
                                        removeCampaignFromBanner={_removeCampaignFromBanner} />
                                )
                            )}
                        </div>
                        <div>
                            {section === "campaigns" && (
                                loadingDetails ? (
                                    <div>Loading Details...</div>
                                ) : (
                                    <CampaignDetails
                                        details={details}
                                        allBanners={banners}
                                        deleteCampaign={_deleteCampaign}
                                        updateDetails={_updateCampaignDetails}
                                        addBannerToCampaign={_addBannerToCampaign}
                                        removeBannerFromCampaign={_removeBannerFromCampaign} />
                                )
                            )}
                        </div>
                    </div>}
                </div>
            </div>
        </>
    );
}

export default Main;