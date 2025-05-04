import axios from "axios";



// get all Group -OKKKKKKKKKKK
export function getAllGroup(id: string) {
    return axios.get(`/api/getgroup/${id}`);
}
// Delete One Group -OKKKKKKKKKKK
export function deleteGroup(id: string, groupToDelete: string) {
    return axios.patch(`/api/deletegroup/${id}`, groupToDelete);
}
// Delete One Group -OKKKKKKKKKKK
export function addNewGroup(id: string, groupToAdd: string) {
    return axios.patch(`/api/group/${id}`, groupToAdd);
}


