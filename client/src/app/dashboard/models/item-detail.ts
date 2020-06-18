export class ItemDetail {
    _id?: string;
    title: string;
    totalSlots: number;
    organizer: string;
    time: string;
    description?: string;
    selfSignupAttendeesId?: number[];
    administratorAddedAttendeesId?: number[];
    meetingLink?: string; 
}