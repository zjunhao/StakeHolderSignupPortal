/** Model for item shown on item list */
export class ApiListItemModel {
    _id: string;
    title: string;
    startTime: number;
    endTime: number;
    remainingSlots: number;
    description: string;
    organizer: string;
}

export class ListItemModel {
    _id: string;
    title: string;
    startTime: string;
    endTime: string;
    remainingSlots: number;
    description: string;
    organizer: string;
}