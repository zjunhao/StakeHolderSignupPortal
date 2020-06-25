import { UserModel } from 'src/app/shared/models/user-model';

/** 
 * Detail model for item shown when item on item list is clicked.
 * Client format.
 */
export class DetailItemModel {
    _id?: string;
    title: string;
    totalSlots: number;
    organizer: string;
    startTime: string;
    endTime: string;
    description: string;
    selfSignupAttendees?: UserModel[];
    administratorAddedAttendees?: string[];
    meetingLink?: string; 
}