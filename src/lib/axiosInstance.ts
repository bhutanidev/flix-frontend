import axios from "axios"
const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL

const api = axios.create({
    baseURL:baseurl,
    withCredentials:true
})

export default api