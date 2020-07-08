/** 
 * Response model for getCurrentUserInfo.
 */
export class GetCurrentUserInfoResponseModel {
    success: boolean;
    message: string;
    user?: CurrentUserModel;
}

export class CurrentUserModel {
    _id: string;
    name: string;
    email: string;
    privilege: string;
}
