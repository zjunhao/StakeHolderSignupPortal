/** 
 * Response model for log in.
 */
export class LoginResponseModel {
    success: boolean;
    message: string;
    user?: UserModel;
}

class UserModel {
    _id: string;
    email: string;
    name: string;
    privilege: string;

}