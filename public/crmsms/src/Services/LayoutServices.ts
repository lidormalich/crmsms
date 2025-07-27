import axios from "axios";

export function getLayout(eventId: string) {
    return axios.get(`/api/layout/${eventId}`);
}

export function saveLayout(eventId: string, layout: any) {
    return axios.post(`/api/layout/${eventId}`, { layout });
} 