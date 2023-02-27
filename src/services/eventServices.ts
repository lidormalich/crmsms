import axios from "axios";
import EventInterface from "../interfaces/EventInterface";
import People from "../interfaces/People";

const api: string = `${process.env.REACT_APP_API}` || "";


// get all Events -OKKKKKKKKKKK
export function getAllEvent() {
    return axios.get(`${api}/allEvent`);
}

// get Event by id OKKKKKKKKKKKKKKKKKKKK
export function getPeopleInEventByID(id: string) {
    return axios.get(`${api}/getPeople/${id}`);
}
// get Event by id OKKKKKKKKKKKKKKKKKKKK
export function getEventInfoByID(id: string) {
    return axios.get(`${api}/eventinfo/${id}`);
}
// get one People Info by Event id  and Phone OKKKKKKKKKKKKKKKKKKKK
export function getPeopleInfoByPhone(eventid: string, phone: string) {
    return axios.get(`${api}/getoneepepole/${eventid}/${phone}`);
}

// add new Event
export function addEvent(EventToadd: EventInterface) {
    return axios.post(`${api}/event`, EventToadd);
}
// update Event
export function updateEvent(id: number, EventToUpdate: EventInterface) {
    return axios.put(`${api}/${id}`, EventToUpdate);
}
// add people to Event OKKKKKKKKKKKKKKKKKKKKKK
export function addPeopleToEvent(id: string, peopoleToUpdate: People) {
    return axios.patch(`${api}/addpepole/${id}`, peopoleToUpdate);
}
// update People in Event
export function updatePeopleInEvent(id: string, peopoleToUpdate: People) {
    return axios.patch(`${api}/updatepepole/${id}`, peopoleToUpdate);
}
// GET Image in Event
export function getCoupleImageInEvent(id: string) {
    return axios.get(`${api}/img/${id}`);
}
// update Image in Event
export function updateCoupleImageInEvent(id: string, img: string) {
    return axios.patch(`${api}/img/${id}`, { data: { coupleImage: img } });
}
// delete Event
export function deleteEvent(id: string) {
    return axios.delete(`${api}/deleteEvent/${id}`);
}
// delete pepole by phone from event-OKKKKKKKKKKKK
export function deletePepoleFromEvent(phoneNum: string, id: string) {
    return axios.patch(`${api}/deletepepole/${id}`, { phoneNum });
}