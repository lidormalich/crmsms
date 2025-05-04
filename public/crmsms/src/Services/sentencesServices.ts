import axios from "axios";


// get all Sentences 
export function getAllSentences() {
    return axios.get(`/api/sentences/all`);
}
// sentences