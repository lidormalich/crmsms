import axios from "axios";

const api: string = `${process.env.REACT_APP_API}` || "";


// get all Group -OKKKKKKKKKKK
export function getAllGroup(id: string) {
    return axios.get(`${api}/getgroup/${id}`);
}
// Delete One Group -OKKKKKKKKKKK
export function deleteGroup(id: string, groupToDelete: string) {
    return axios.patch(`${api}/deletegroup/${id}`, groupToDelete);
}


