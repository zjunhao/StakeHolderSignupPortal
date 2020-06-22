/** 
 * Detail model for item shown when item on item list is clicked.
 * Format server return back.
*/
export class ServerDetailItemModel {
    _id?: string;
    title: string;
    total_slots: number;
    event_organizer: string;
    start_time: string;
    end_time: string;
    short_description: string;
    self_signup_attendees?: string[];
    administrator_added_attendees?: string[];
    meeting_link?: string; 
}