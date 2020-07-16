/** 
 * Model for sprint review detail retrived from server.
 */

export class ApiDetailItemModel {
    _id: string;
    title: string;
    totalSlots: number;
    organizer: string;
    startTime: number;
    endTime: number;
    description: string;
    selfSignupAttendees?: UserModel[];
    administratorAddedAttendees?: NameEmailModel[];
    meetingLink?: string; 
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
    administratorAddedAttendees?: NameEmailModel[];
    meetingLink?: string; 

    constructor() {
        this.selfSignupAttendees = [];
        this.administratorAddedAttendees = [];
    }
}

// Model info about users who signed up to the app
class UserModel {
    _id: string;
    name: string;
    email: string;
    privilege: string;
}

// Model info about name and email added as attendee by administrator, that name email does not have to be signed up to the app
class NameEmailModel{
    _id: string;  // mongoose give this object ({name:xx email:xx }) an id when you save new obj into itemDetail.administratorAddedAttendees array
    name: string;
    email: string;
}