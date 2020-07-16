import { ApiListItemModel } from '../../app/dashboard/models/item-list-response-model';

export const LISTITEMS: ApiListItemModel[] = [
  { _id: '1', title: 'Sprint Review 4.6', startTime: 1234567, endTime: 1234567, description: 'annotations and note list', remainingSlots: 5, organizer: 'A B' },
  { _id: '2', title: 'Sprint Review 5.1', startTime: 1234567, endTime: 1234567, description: 'notes/annotation refactor', remainingSlots: 5, organizer: 'A B' },
  { _id: '3', title: 'Sprint Review 5.2', startTime: 1234567, endTime: 1234567, description: 'document display app', remainingSlots: 5, organizer: 'A B' }
];