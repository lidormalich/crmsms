import axios from "axios";



export function sendExcel(excelArr: Array<any>, id: string) {
    return axios.post(`/api/excel/add/${id}`, { data: excelArr });
}