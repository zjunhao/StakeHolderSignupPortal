/** Detail model for item shown when item on item list is clicked */
export class DetailItemModel {
    _id?: string;
    title: string;
    totalSlots: number;
    organizer: string;
    startTime: string;
    endTime: string;
    description?: string;
    selfSignupAttendees?: string[];
    administratorAddedAttendees?: string[];
    meetingLink?: string; 
}