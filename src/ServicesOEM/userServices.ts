import axios from "axios";
import User from "../interfaces/User";

const api: string = process.env.REACT_APP_API || "";

// check user
export function checkUser(usertoChack: User) {
    return axios.post(`${api}/login`, usertoChack);
}
// export function checkUserreturnName(usertoChack: User) {
//     return axios.post(`${api}/login`, usertoChack);
// }

// add user
export function addUser(userToAdd: User) {
    return axios.post(`${api}/register`, userToAdd);
}
