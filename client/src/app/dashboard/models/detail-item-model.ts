/** Detail model for item shown when item on item list is clicked */
export class DetailItemModel {
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