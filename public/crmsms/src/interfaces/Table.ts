export interface Table {
    id: string;
    name: string;
    type: 'Round' | 'Square' | 'VIP' | 'Kids' | 'Default';
    capacity: number;
    eventId: string;
    guests: string[]; // מערך מזהי אורחים
    position?: { x: number; y: number }; // מיקום שולחן באולם
} 