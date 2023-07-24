import axios from "axios";
import smsInterface from "../interfaces/smsInterface";
import { toast } from "react-toastify";
import People from "../interfaces/People";

const api: string = `${process.env.REACT_APP_API}` || "";


// send sms
export function sendsmstoclient(sms: smsInterface, auth: string) {
    return axios.post(`${api}/sendsms`, sms, { headers: { 'Authorization': auth } });
}


let editphone = (phone: string) => {
    var newPhoneStr = phone;
    if (phone.startsWith("+972")) {
        newPhoneStr = phone.slice(4);
    } else
        if (phone.startsWith("05")) {
            newPhoneStr = phone.slice(1);
        }
    return newPhoneStr;
}

export function getDataNew(people: People, groom: string, bride: string, eventId: string) {
    const id = toast.loading("Please wait...", { position: toast.POSITION.TOP_CENTER });
    sendsmstoclient({
        message: `שלום ${people.firstName}, הוזמנתם לחתונה של  ${groom} & ${bride}
            הזמנה דיגיטלית לחתונה: https://crmsms.netlify.app/invitation/${eventId} 
            לפרטים ואישור הגעה >>  https://crmsms.netlify.app/event/${eventId}/${people.phoneNumber}
                        נשמח לראותכם בחתונתנו ${groom} & ${bride}`, phone: `+972${editphone(people.phoneNumber)}`, eventId: eventId as string
    }, sessionStorage.getItem("Authorization") as string)
        .then(() => {
            toast.update(id, {
                render: "SMS sent", type: "success", isLoading: false,
                autoClose: 5000,
            });

        }).catch(err => {
            toast.update(id, { render: "Something went wrong", type: "error", isLoading: false, autoClose: 5000, });
            console.log(err);
        });
}
