import axios from "axios";
import EventInterface from "../interfaces/EventInterface";

const api: string = process.env.REACT_APP_API_USERS + "/campaign";

// get all Events
export function getEvent() {
    return axios.get(api);
}

// get Event by id
export function getEventByID(id: number) {
    return axios.get(`${api}/${id}`);
}

// add new Event
export function addEvent(EventToadd: EventInterface) {
    return axios.post(api, EventToadd);
}
// update Event
export function updateEvent(id: number, EventToUpdate: EventInterface) {
    return axios.put(`${api}/${id}`, EventToUpdate);
}
// delete Event
export function deleteEvent(id: number) {
    return axios.delete(`${api}/${id}`);
}