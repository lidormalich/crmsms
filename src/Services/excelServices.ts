import axios from "axios";


const api: string = `${process.env.REACT_APP_API}/excel` || "";


export function sendExcel(excelArr: Array<any>, id: string) {
    return axios.post(`${api}/add/${id}`, { data: excelArr });
}