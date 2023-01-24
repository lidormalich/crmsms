import axios from "axios";
import User from "../interfaces/User";
import { API } from "../setting/conction";

const api: string = API + "/users";

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
