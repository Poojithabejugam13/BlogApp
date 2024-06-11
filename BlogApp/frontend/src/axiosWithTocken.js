import axios from "axios";
const tokenFromLocal=localStorage.getItem('token')
console.log(tokenFromLocal,"token in axios");
export const axiosWithToken=axios.create(
    {
        headers:{Authorization:`bearer ${tokenFromLocal}`}
    }
)

