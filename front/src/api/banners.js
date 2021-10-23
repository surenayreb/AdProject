import { get, put, post, sendDelete } from "../services/request"

const getBanners = async () => {
    return await get("api/banners");
}

const getBannerDetails = async (id) => {
    return await get(`api/banners/${id}`);
}

const addNewBanner = async (data) => {
    return await post(`api/banners`, data);
}

const updateDetails = async (id, data) => {
    return await put(`api/banners/${id}`, data);
}

const addCampaignToBanner = async (id, data) => {
    return await post(`api/banners/${id}/campaign/${data.id}`);
}

const removeCampaignFromBanner = async (id, data) => {
    return await sendDelete(`api/banners/${id}/campaign/${data.id}`);
}

const deleteBanner = async (id) => {
    return await sendDelete(`api/banners/${id}`);
}

export default { getBanners, getBannerDetails, updateDetails, addCampaignToBanner, addNewBanner, removeCampaignFromBanner, deleteBanner };