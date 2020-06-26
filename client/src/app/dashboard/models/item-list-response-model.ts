/** Model for item shown on item list */
export class ItemListResponseModel {
    success: boolean;
    message: string;
    itemList?: ListItemModel[];
}

export class ListItemModel {
    _id: string;
    title: string;
    startTime: string;
    endTime: string;
    description: string;
}