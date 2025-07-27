import axios from "axios";
import { Table } from "../interfaces/Table";

export function getTables(eventId: string) {
    return axios.get<Table[]>(`/api/tables/${eventId}`);
}

export function createTable(table: Partial<Table>) {
    return axios.post<Table>(`/api/tables`, table);
}

export function updateTable(id: string, table: Partial<Table>) {
    return axios.put<Table>(`/api/tables/${id}`, table);
}

export function deleteTable(id: string) {
    return axios.delete(`/api/tables/${id}`);
} 