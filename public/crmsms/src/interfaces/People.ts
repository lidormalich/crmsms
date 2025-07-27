export default interface People {
    id?: number,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    NumberOfGuests: number, //מספר אורחים מוזמנים
    NumberOfGuestsAccept: number, //מספר אורחים שמגיעים
    eventGroupName: string,
    tableId?: string; // מזהה שולחן
}