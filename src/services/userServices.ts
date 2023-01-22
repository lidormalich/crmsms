import axios from "axios";
import User from "../interfaces/User";

const api: string = process.env.REACT_APP_API_USERS + "/users";

// check user
export function checkUser(usertoChack: User) {
    return axios.get(`${api}?email=${usertoChack.email}&password=${usertoChack.password}`);
}
export function checkUserreturnName(usertoChack: User) {
    return axios.get(`${api}?email=${usertoChack.email}&password=${usertoChack.password}`)
}

// add user
export function addUser(userToAdd: User) {
    return axios.post(api, userToAdd);
}
