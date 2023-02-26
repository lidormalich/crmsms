import axios from "axios";
import smsInterface from "../interfaces/smsInterface";

const api: string = `${process.env.REACT_APP_API}` || "";


// send sms
export function sendsmstoclient(sms: smsInterface) {
    return axios.post(`${api}/sendsms`, sms);
}
