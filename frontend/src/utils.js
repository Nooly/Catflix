import { axios, toast } from "./imports.js";


const CHECK_AUTH_URL = '/api/v1/users/check-auth'; // Adjust the URL to your server's endpoint

const checkAuthentication = async (userInfo) => {
    try {
        const headers = { Authorization: `Bearer ${userInfo.token}` };
        const response = await axios.get(CHECK_AUTH_URL, { headers });
        const { authenticated } = response.data;
        // console.log(authenticated);
        // If were here it means authentication worked
    } catch (error) {
        toast.error("Authentication failed");
    }
};

export { checkAuthentication };