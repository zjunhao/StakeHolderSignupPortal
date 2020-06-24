/** 
 * Model storing information about a user, retrieved from server
 */
export class ServerUserModel {
    success: boolean;
    message: string;
    userInfo: UserInfo;
}

class UserInfo{
    _id: string;
    email: string;
    name: string;
}