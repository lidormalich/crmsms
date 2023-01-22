import People from "./People";

export default interface EventInterface {
    id?: number,
    uuid: string,
    campaignName: string, //שם אירוע
    ownerName: string, //בעלים
    phone: string, //טלפון המזמין
    pepoleCome?: People[],
}