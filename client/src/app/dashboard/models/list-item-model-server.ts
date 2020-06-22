/** 
 * Model for item shown on item list.
 * Format server return back.
*/
export class ServerListItemModel {
    _id?: string;
    title: string;
    start_time: string;
    end_time: string;
    short_description: string;
}