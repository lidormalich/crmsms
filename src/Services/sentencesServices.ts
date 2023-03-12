import axios from "axios";

const api: string = `${process.env.REACT_APP_API}/sentences` || "";


// get all Sentences 
export function getAllSentences() {
    return axios.get(`${api}/all`);
}
// sentences