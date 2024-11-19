import axios from "axios";

async function userInfo(token) {
    // it get all user's information 
    try {
        const response = await axios.get('http://localhost:4000/users/userInfo', {
            headers: {
                'Authorization':`Bearer ${token}`
            }
        })
        if (response.status===200) {
            return response.data.user;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

export default userInfo;