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

const getFilterURI = (searchFromURI, filter, skipPathName) => {
    const searchParams = new URLSearchParams(searchFromURI);
    const query = searchParams.get('q') || 'all';
    const page = searchParams.get('page') || 1;

    const filterPage = filter.page || page;
    const filterQuery = filter.query || query;

    const link = `${skipPathName ? "" : '/search?'}&q=${filterQuery}&page=${filterPage}`

    return link;
};

export { checkAuthentication, extractYouTubeVideoId, getFilterURI };