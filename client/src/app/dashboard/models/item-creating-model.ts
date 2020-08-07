/**
 * Model client sent to server when creating new sprint review
 */
export class ItemCreatingModel {
    title: string;
    totalSlots: number;
    organizer: string;
    startTime: string;
    endTime: string;
    shortDescription: string;
    detailDescription?: string;
    meetingLink?: string; 
}