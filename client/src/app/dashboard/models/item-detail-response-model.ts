/** 
 * Model for sprint review detail retrived from server.
 */
export class ItemDetailResponseModel {
    success: boolean;
    message: string;
    itemDetail?: DetailItemModel;
}

export class DetailItemModel {
    _id: string;
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

class UserModel {
    _id: string;
    name: string;
    email: string;
    privilege: string;
}