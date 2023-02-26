import People from "./People";

export default interface EventInterface {
    _id?: string,
    uuid: string,
    campaignName: string, //שם אירוע
    ownerName: string, //בעלים
    phone: string, //טלפון המזמין
    bride: string, //כלה
    groom: string, //חתן
    brideParents: string, //כלה
    groomParents: string, //חתן
    pepoleCome?: People[],
    group?: People[],
}