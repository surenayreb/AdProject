import { get, put, post, sendDelete } from "../services/request"

const getCampaigns = async () => {
    return await get(`api/campaigns`);
}

const getCampaignDetails = async (id) => {
    return await get(`api/campaigns/${id}`);
}

const addNewCampaign = async (data) => {
    return await post(`api/campaigns`, data);
}

const updateDetails = async (id, data) => {
    return await put(`api/campaigns/${id}`, data);
}

const addBannerToCampaign = async (id, data) => {
    return await post(`api/campaigns/${id}/banner/${data.id}`);
}

const removeBannerFromCampaign = async (id, data) => {
    return await sendDelete(`api/campaigns/${id}/banner/${data.id}`);
}

const deleteCampaign = async (id) => {
    return await sendDelete(`api/campaigns/${id}`);
}

export default { getCampaigns, getCampaignDetails, addNewCampaign, updateDetails, addBannerToCampaign, removeBannerFromCampaign, deleteCampaign };