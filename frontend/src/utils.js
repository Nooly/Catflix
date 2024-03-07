import { axios, toast } from "./imports.js";


const CHECK_AUTH_URL = '/api/v1/users/check-auth'; // Adjust the URL to your server's endpoint

const checkAuthentication = async (userInfo) => {
    try {
        const headers = { Authorization: `Bearer ${userInfo.token}` };
        const response = await axios.get(CHECK_AUTH_URL, { headers }); // check if this is needed if we have backend Auth, does 2 calls to backend
        const { authenticated } = response.data;
        return authenticated;
    } catch (error) {
        toast.error("User is not authenticated");
    }
};

const extractYouTubeVideoId = (url) => {
    return url.includes("youtu.be/")
        ? url.slice(url.lastIndexOf("/") + 1)
        : url.slice(url.indexOf("v=") + 2).split("&")[0];
}

export { checkAuthentication, extractYouTubeVideoId };